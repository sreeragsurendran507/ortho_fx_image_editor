import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
  standalone: true
})
/** This directive is to make the element draggable */
export class DraggableDirective {
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private startTransformX = 0;
  private startTransformY = 0;
  private scale = 1;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;

    const transform = this.el.nativeElement.style.transform;
    const translateMatch = transform.match(/translate\(([^)]+)\)/);
    const scaleMatch = transform.match(/scale\(([^)]+)\)/);

    if (translateMatch) {
      const [translateX, translateY] = translateMatch[1].split(',').map((val: string) => parseFloat(val));
      this.startTransformX = translateX;
      this.startTransformY = translateY;
    } else {
      this.startTransformX = 0;
      this.startTransformY = 0;
    }

    if (scaleMatch) {
      this.scale = parseFloat(scaleMatch[1]);
    } else {
      this.scale = 1;
    }

    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const offsetX = (event.clientX - this.startX) / this.scale;
      const offsetY = (event.clientY - this.startY) / this.scale;
      this.renderer.setStyle(this.el.nativeElement, 'transform', `translate(${this.startTransformX + offsetX}px, ${this.startTransformY + offsetY}px) scale(${this.scale})`);
    }
  }

  @HostListener('document:mouseup', ['$event']) onMouseUp() {
    this.isDragging = false;
  }
}
