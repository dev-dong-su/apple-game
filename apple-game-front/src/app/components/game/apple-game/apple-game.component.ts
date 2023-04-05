import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { GameService } from '@app/share/service/game.service';
import { DrawCanvas } from '@components/game/apple-game/modules/draw-canvas';
@Component({
  selector: 'app-apple-game',
  templateUrl: './apple-game.component.html',
})
export class AppleGameComponent implements OnDestroy {
  @ViewChild('appleGame', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  drawCanvas!: DrawCanvas;

  constructor(private gameService: GameService) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.drawCanvas = new DrawCanvas(canvas, this.gameService);

    this.drawCanvas.init();
    this.drawCanvas.update();
  }

  ngOnDestroy(): void {
    this.drawCanvas.destroy();
  }
}
