import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AppleDrop } from '@app/components/main/apple-drop/modules/apple-drop';
import { ThemeService } from '@app/share/service/theme.service';

@Component({
  selector: 'app-apple-drop',
  templateUrl: './apple-drop.component.html',
})
export class AppleDropComponent implements AfterViewInit, OnInit {
  theme: any;

  @ViewChild('dropApple', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  drawCanvas!: AppleDrop;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.theme = this.themeService.getTheme();
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.drawCanvas = new AppleDrop(canvas, this.theme.image);

    this.drawCanvas.init();
    this.drawCanvas.update();
  }
}
