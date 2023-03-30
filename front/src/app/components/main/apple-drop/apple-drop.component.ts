import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Apple } from '@app/components/main/apple-drop/modules/apple-drop';

@Component({
  selector: 'app-apple-drop',
  templateUrl: './apple-drop.component.html',
})
export class AppleDropComponent implements AfterViewInit {
  @ViewChild('dropApple', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const unit = new Apple(canvas);

    unit.update();
  }
}
