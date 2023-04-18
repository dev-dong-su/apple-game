import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GameService } from '@app/share/service/game.service';
import { ThemeService } from '@app/share/service/theme.service';
import { DrawCanvas } from './modules/draw-canvas';

@Component({
  selector: 'app-apple-game',
  templateUrl: './apple-game.component.html',
})
export class AppleGameComponent implements OnDestroy, OnInit {
  theme: any;
  @ViewChild('appleGame', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  drawCanvas!: DrawCanvas;

  constructor(
    private gameService: GameService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.theme = this.themeService.getTheme();
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.drawCanvas = new DrawCanvas(
      canvas,
      this.gameService,
      this.theme.image
    );

    this.drawCanvas.init();
    this.drawCanvas.update();
  }

  refreshCanvas(): void {
    this.drawCanvas.generateApples();
  }

  ngOnDestroy(): void {
    this.drawCanvas.destroy();
  }
}
