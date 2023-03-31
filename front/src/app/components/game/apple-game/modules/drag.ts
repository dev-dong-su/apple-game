import { DrawCanvas } from '@components/game/apple-game/modules/draw-canvas';

export class Drag {
  public startX: number;
  public startY: number;
  public currentX: number;
  public currentY: number;
  public isDrawing: boolean;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(
    canvas: HTMLCanvasElement,
    private drawCanvasInstance: DrawCanvas
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.isDrawing = false;
  }

  onMouseDown(event: MouseEvent): void {
    this.isDrawing = true;
    const rect = this.canvas.getBoundingClientRect();
    this.startX = event.clientX - rect.left;
    this.startY = event.clientY - rect.top;
  }

  onMouseMove(event: MouseEvent): void {
    this.currentX = event.clientX - this.canvas.getBoundingClientRect().left;
    this.currentY = event.clientY - this.canvas.getBoundingClientRect().top;
  }

  onMouseUp(): void {
    this.isDrawing = false;

    this.drawCanvasInstance.clearHighlightApplesInDragArea();

    const x = Math.min(this.startX, this.currentX);
    const y = Math.min(this.startY, this.currentY);
    const width = Math.abs(this.startX - this.currentX);
    const height = Math.abs(this.startY - this.currentY);

    this.drawCanvasInstance.checkApplesInDragArea(x, y, width, height);
  }

  drawRectangle(x: number, y: number, width: number, height: number): void {
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);

    this.ctx.fillStyle = 'rgba(248, 114, 114, 0.3)';
    this.ctx.fill();

    this.ctx.strokeStyle = 'rgba(248, 114, 114, 1)';
    this.ctx.stroke();
  }
}
