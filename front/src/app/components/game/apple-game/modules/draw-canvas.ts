import { Drag } from '@components/game/apple-game/modules/drag';

export class DrawCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private lastTime: number;
  private drag: Drag;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.lastTime = new Date().getTime();
    this.drag = new Drag(canvas);
  }

  init(): void {
    window.onresize = () => {
      const rect = this.canvas.parentElement!.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const devicePixelRatio = window.devicePixelRatio || 1;

      this.canvas.width = width * devicePixelRatio;
      this.canvas.height = height * devicePixelRatio;

      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;

      this.ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    window.onresize(new UIEvent('resize'));

    this.canvas.onmousedown = (event) => this.drag.onMouseDown(event);

    this.canvas.onmouseup = () => this.drag.onMouseUp();

    this.canvas.onmousemove = (event) => this.drag.onMouseMove(event);
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

    this.ctx.fillStyle = '#000000';
    this.ctx.fillText(
      parseInt(String(1000 / (new Date().getTime() - Number(this.lastTime)))) +
        ' fps',
      this.canvas.width / window.devicePixelRatio - 50,
      20
    );

    this.lastTime = new Date().getTime();

    window.requestAnimationFrame(() => {
      this.update.call(this);
    });
  }
}
