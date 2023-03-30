import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Apple } from '@app/components/main/apple-drop/modules/apple-drop';

@Component({
  selector: 'app-apple-drop',
  templateUrl: './apple-drop.component.html',
})
export class AppleDropComponent implements AfterViewInit {
  @ViewChild('dropApple', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  drawCanvas!: Apple;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.drawCanvas = new Apple(canvas);

    this.drawCanvas.init();
    this.drawCanvas.update();
  }
}
