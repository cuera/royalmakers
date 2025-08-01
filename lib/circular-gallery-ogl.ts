/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

// OGL-powered Circular Gallery core implementation.
// This file intentionally bypasses TS strict checks for math-heavy shader code,
// while exposing a typed-friendly wrapper for React components.

import {
  Camera,
  Mesh,
  Plane,
  Program,
  Renderer,
  Texture,
  Transform,
} from "ogl"
import {
  debounce,
  lerp,
  autoBind,
  createTextTexture,
} from "./gallery-utils"

export interface GalleryItem {
  image: string
  text: string
}

export interface CircularGalleryOptions {
  items?: GalleryItem[]
  bend?: number
  textColor?: string
  borderRadius?: number
  font?: string
  scrollSpeed?: number
  scrollEase?: number
}

// ------- Internal Helper Classes ------- //
class Title {
  constructor({ gl, plane, renderer, text, textColor = "#545050", font = "30px sans-serif" }) {
    autoBind(this)
    this.gl = gl
    this.plane = plane
    this.renderer = renderer
    this.text = text
    this.textColor = textColor
    this.font = font
    this.createMesh()
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor,
    )
    const geometry = new Plane(this.gl)
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }`,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    })
    this.mesh = new Mesh(this.gl, { geometry, program })
    const aspect = width / height
    const textHeight = this.plane.scale.y * 0.15
    const textWidth = textHeight * aspect
    this.mesh.scale.set(textWidth, textHeight, 1)
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05
    this.mesh.setParent(this.plane)
  }
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
  }) {
    this.extra = 0
    this.geometry = geometry
    this.gl = gl
    this.image = image
    this.index = index
    this.length = length
    this.renderer = renderer
    this.scene = scene
    this.screen = screen
    this.text = text
    this.viewport = viewport
    this.bend = bend
    this.textColor = textColor
    this.borderRadius = borderRadius
    this.font = font
    this.createShader()
    this.createMesh()
    this.createTitle()
    this.onResize()
  }
  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false })
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 0.5 + cos(p.y * 2.0 + uTime) * 0.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          if (d > 0.0) { discard; }
          float borderWidth = 0.004;
          if (d > -borderWidth) {
            gl_FragColor = vec4(0.145, 0.64, 0.376, 1.0);
          } else {
            gl_FragColor = vec4(color.rgb, 1.0);
          }
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    })
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = this.image
    img.onload = () => {
      texture.image = img
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]
    }
  }
  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program })
    this.plane.setParent(this.scene)
  }
  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      fontFamily: this.font,
    })
  }
  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra
    const x = this.plane.position.x
    const H = this.viewport.width / 2
    if (this.bend === 0) {
      this.plane.position.y = 0
      this.plane.rotation.z = 0
    } else {
      const B_abs = Math.abs(this.bend)
      const R = (H * H + B_abs * B_abs) / (2 * B_abs)
      const effectiveX = Math.min(Math.abs(x), H)
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX)
      if (this.bend > 0) {
        this.plane.position.y = -arc
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R)
      } else {
        this.plane.position.y = arc
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R)
      }
    }
    this.speed = scroll.current - scroll.last
    this.program.uniforms.uTime.value += 0.04
    this.program.uniforms.uSpeed.value = this.speed
    const planeOffset = this.plane.scale.x / 2
    const viewportOffset = this.viewport.width / 2
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal
      this.isBefore = this.isAfter = false
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal
      this.isBefore = this.isAfter = false
    }
  }
  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen
    if (viewport) {
      this.viewport = viewport
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height]
      }
    }
    this.scale = this.screen.height / 1500
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y]
    this.padding = 2
    this.width = this.plane.scale.x + this.padding
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index
  }
}

// ------- Public App Controller Class ------- //
export class App {
  constructor(container: HTMLElement, options: CircularGalleryOptions = {}) {
    const {
      items,
      bend = 1,
      textColor = "#ffffff",
      borderRadius = 0,
      font = "bold 30px Satoshi",
      scrollSpeed = 2,
      scrollEase = 0.05,
    } = options

    document.documentElement.classList.remove("no-js")
    this.container = container
    this.scrollSpeed = scrollSpeed
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 }
    this.onCheckDebounce = debounce(this.onCheck, 200)
    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.onResize()
    this.createGeometry()
    this.createMedias(items, bend, textColor, borderRadius, font)
    this.update()
    this.addEventListeners()
  }
  createRenderer() {
    this.renderer = new Renderer({ alpha: true })
    this.gl = this.renderer.gl
    this.gl.clearColor(0, 0, 0, 0)
    this.container.appendChild(this.gl.canvas)
  }
  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 20
  }
  createScene() {
    this.scene = new Transform()
  }
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 })
  }
  createMedias(items, bend, textColor, borderRadius, font) {
    const defaultItems: GalleryItem[] = Array.from({ length: 12 }).map((_, i) => ({
      image: `https://picsum.photos/seed/${i + 1}/800/600?grayscale`,
      text: `Image ${i + 1}`,
    }))
    const galleryItems = items && items.length ? items : defaultItems
    this.mediasImages = galleryItems.concat(galleryItems)
    this.medias = this.mediasImages.map((data, index) =>
      new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
      }),
    )
  }
  onTouchDown = (e) => {
    this.isDown = true
    this.scroll.position = this.scroll.current
    this.start = e.touches ? e.touches[0].clientX : e.clientX
  }
  onTouchMove = (e) => {
    if (!this.isDown) return
    const x = e.touches ? e.touches[0].clientX : e.clientX
    const distance = (this.start - x) * (this.scrollSpeed * 0.025)
    this.scroll.target = this.scroll.position + distance
  }
  onTouchUp = () => {
    this.isDown = false
    this.onCheck()
  }
  onWheel = (e) => {
    const delta = e.deltaY || e.wheelDelta || e.detail
    this.scroll.target += delta > 0 ? this.scrollSpeed : -this.scrollSpeed
    this.onCheckDebounce()
  }
  onCheck = () => {
    if (!this.medias || !this.medias[0]) return
    const width = this.medias[0].width
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width)
    const item = width * itemIndex
    this.scroll.target = this.scroll.target < 0 ? -item : item
  }
  onResize = () => {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight }
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({ aspect: this.screen.width / this.screen.height })
    const fov = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect
    this.viewport = { width, height }
    if (this.medias) this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }))
  }
  update = () => {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease)
    const direction = this.scroll.current > this.scroll.last ? "right" : "left"
    if (this.medias) this.medias.forEach((media) => media.update(this.scroll, direction))
    this.renderer.render({ scene: this.scene, camera: this.camera })
    this.scroll.last = this.scroll.current
    this.raf = window.requestAnimationFrame(this.update)
  }
  addEventListeners() {
    this.boundOnResize = this.onResize
    this.boundOnWheel = this.onWheel
    this.boundOnTouchDown = this.onTouchDown
    this.boundOnTouchMove = this.onTouchMove
    this.boundOnTouchUp = this.onTouchUp
    window.addEventListener("resize", this.boundOnResize)
    window.addEventListener("mousewheel", this.boundOnWheel)
    window.addEventListener("wheel", this.boundOnWheel)
    window.addEventListener("mousedown", this.boundOnTouchDown)
    window.addEventListener("mousemove", this.boundOnTouchMove)
    window.addEventListener("mouseup", this.boundOnTouchUp)
    window.addEventListener("touchstart", this.boundOnTouchDown)
    window.addEventListener("touchmove", this.boundOnTouchMove)
    window.addEventListener("touchend", this.boundOnTouchUp)
  }
  destroy() {
    window.cancelAnimationFrame(this.raf)
    window.removeEventListener("resize", this.boundOnResize)
    window.removeEventListener("mousewheel", this.boundOnWheel)
    window.removeEventListener("wheel", this.boundOnWheel)
    window.removeEventListener("mousedown", this.boundOnTouchDown)
    window.removeEventListener("mousemove", this.boundOnTouchMove)
    window.removeEventListener("mouseup", this.boundOnTouchUp)
    window.removeEventListener("touchstart", this.boundOnTouchDown)
    window.removeEventListener("touchmove", this.boundOnTouchMove)
    window.removeEventListener("touchend", this.boundOnTouchUp)
    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas)
    }
  }
} 