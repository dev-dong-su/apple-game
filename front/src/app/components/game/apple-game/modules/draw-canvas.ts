import { Drag } from '@components/game/apple-game/modules/drag';
import { Apple } from './apple';

export class DrawCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private lastTime: number;
  private drag: Drag;
  private units: Apple[];
  private rect: any;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.units = [];
    this.lastTime = new Date().getTime();
    this.drag = new Drag(canvas);
    this.rect = this.canvas.parentElement!.getBoundingClientRect();
    this.generateApples();

    console.log(this.units);
    console.log(this.rect);
  }

  init(): void {
    window.onresize = () => {
      const width = this.rect.width;
      const height = this.rect.height;
      const devicePixelRatio = window.devicePixelRatio || 1;

      this.canvas.width = width * devicePixelRatio;
      this.canvas.height = height * devicePixelRatio;

      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;

      this.ctx.scale(devicePixelRatio, devicePixelRatio);
      console.log((width * devicePixelRatio) / 15);
    };

    window.onresize(new UIEvent('resize'));

    this.canvas.onmousedown = (event) => this.drag.onMouseDown(event);

    this.canvas.onmouseup = () => this.drag.onMouseUp();

    this.canvas.onmousemove = (event) => this.drag.onMouseMove(event);
  }

  private generateApples(): void {
    const rows = 10;
    const columns = 17;

    const availableWidth = this.rect.width / columns;
    const availableHeight = this.rect.height / rows;

    const appleRadius = Math.min(availableWidth, availableHeight) * 0.4;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const x = j * availableWidth + availableWidth / 2 - appleRadius;
        const y = i * availableHeight + availableHeight / 2 - appleRadius;
        const apple = new Apple(x, y, appleRadius);
        this.units.push(apple);
      }
    }
  }

  update(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.drag.isDrawing) {
      const width = this.drag.currentX - this.drag.startX;
      const height = this.drag.currentY - this.drag.startY;
      this.drag.drawRectangle(
        this.drag.startX,
        this.drag.startY,
        width,
        height
      );
      this.ctx.stroke();
    }

    this.units.forEach((apple) => {
      this.ctx.drawImage(
        apple.image,
        apple.position.x,
        apple.position.y,
        apple.radius * 2,
        apple.radius * 2
      );

      this.ctx.font = `${apple.radius}px Poor Story`;
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(
        apple.number.toString(),
        apple.position.x + apple.radius,
        apple.position.y + apple.radius
      );
    });

    this.ctx.font = `12px Poor Story`;
    this.ctx.fillStyle = '#000000';
    this.ctx.fillText(
      parseInt(String(1000 / (new Date().getTime() - Number(this.lastTime)))) +
        ' fps',
      this.canvas.width / window.devicePixelRatio - 20,
      10
    );

    this.lastTime = new Date().getTime();

    window.requestAnimationFrame(() => {
      this.update.call(this);
    });
  }
}
