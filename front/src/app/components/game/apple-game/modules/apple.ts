export class Apple {
  public position: { x: number; y: number };
  public image: HTMLImageElement;
  public number: number;
  public radius: number;
  public velocity: { x: number; y: number };
  public mass: number;
  public bounceCount: number;
  public static gravity: number = 0.4;
  public static corFactor: number = 0.5;

  constructor(x: number, y: number, radius: number) {
    this.position = { x, y };
    this.number = Math.floor(Math.random() * 9) + 1;
    this.image = new Image();
    this.image.src = 'assets/images/apple.png';
    this.radius = radius;
    this.mass = 1;
    this.bounceCount = 0;
    this.velocity = {
      x: Math.random() * 4 - 2,
      y: 0,
    };
  }
}
