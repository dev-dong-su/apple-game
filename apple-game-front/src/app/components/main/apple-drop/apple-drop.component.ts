import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AppleDrop } from '@app/components/main/apple-drop/modules/apple-drop';

@Component({
  selector: 'app-apple-drop',
  templateUrl: './apple-drop.component.html',
})
export class AppleDropComponent implements AfterViewInit {
  @ViewChild('dropApple', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  drawCanvas!: AppleDrop;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.drawCanvas = new AppleDrop(canvas);

    this.drawCanvas.init();
    this.drawCanvas.update();
  }
}
