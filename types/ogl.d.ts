declare module "ogl" {
  export class Camera {
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext)
    fov: number
    position: { z: number }
    perspective(opts: { aspect: number }): void
  }
  export interface PlaneOptions {
    heightSegments?: number
    widthSegments?: number
  }
  export class Plane {
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, opts?: PlaneOptions)
    scale: { x: number; y: number; set(x: number, y: number, z: number): void }
    rotation: { z: number }
    position: { x: number; y: number; z: number }
    setParent(parent: Transform): void
  }
  export interface ProgramUniform {
    value: any
  }
  export interface ProgramOptions {
    vertex: string
    fragment: string
    uniforms?: Record<string, ProgramUniform>
    transparent?: boolean
    depthTest?: boolean
    depthWrite?: boolean
  }
  export class Program {
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, opts: ProgramOptions)
    uniforms: Record<string, ProgramUniform>
  }
  export class Renderer {
    constructor(opts?: { alpha?: boolean })
    readonly gl: WebGLRenderingContext | WebGL2RenderingContext
    setSize(width: number, height: number): void
    render(opts: { scene: Transform; camera: Camera }): void
  }
  export class Texture {
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, opts?: { generateMipmaps?: boolean })
    image: any
  }
  export class Mesh {
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, opts: { geometry: Plane; program: Program })
    scale: { x: number; y: number; set(x: number, y: number, z: number): void }
    rotation: { z: number }
    position: { x: number; y: number; z: number }
    setParent(parent: Transform): void
  }
  export class Transform {
    constructor()
    setParent(parent: Transform): void
  }
} 