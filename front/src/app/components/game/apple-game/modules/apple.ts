export class Apple {
  public position: { x: number; y: number };
  public image: HTMLImageElement;
  public number: number;
  public radius: number;
  public gravity: number;
  public mass: number;

  constructor(x: number, y: number, radius: number) {
    this.position = { x, y };
    this.number = Math.floor(Math.random() * 10) + 1;
    this.image = new Image();
    this.image.src = 'assets/images/apple.png';
    this.radius = radius;
    this.mass = 1;
    this.gravity = 0.1;
  }
}
