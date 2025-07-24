import { Texture } from "ogl";

/**
 * Debounce utility with typed generics.
 */
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

/**
 * Linear interpolation between two numbers.
 */
export function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

/**
 * Automatically bind all class methods to the instance.
 */
export function autoBind(instance: object): void {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    const val = (instance as any)[key];
    if (key !== "constructor" && typeof val === "function") {
      (instance as any)[key] = val.bind(instance);
    }
  });
}

/**
 * Create a text texture for OGL planes.
 */
export function createTextTexture(
  gl: WebGLRenderingContext,
  text: string,
  font = "bold 30px monospace",
  color = "black",
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
} 