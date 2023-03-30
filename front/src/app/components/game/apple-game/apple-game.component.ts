import { Component, ElementRef, ViewChild } from '@angular/core';
import { DrawCanvas } from '@components/game/apple-game/modules/draw-canvas';
@Component({
  selector: 'app-apple-game',
  templateUrl: './apple-game.component.html',
})
export class AppleGameComponent {
  @ViewChild('appleGame', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  drawCanvas!: DrawCanvas;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.drawCanvas = new DrawCanvas(canvas);

    this.drawCanvas.init();
    this.drawCanvas.update();
  }
}
