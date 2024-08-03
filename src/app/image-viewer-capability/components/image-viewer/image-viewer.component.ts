import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DraggableDirective } from '../../directives/draggable.directive';


@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, DraggableDirective],
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent {

  actions = [
    { icon: 'zoom_in', action: 'zoomIn' },
    { icon: 'zoom_out', action: 'zoomOut' },
    { icon: 'grid_on', action: 'toggleGrid' },
    { icon: 'rotate_left', action: 'rotateLeft90' },
    { icon: 'rotate_left', action: 'rotateLeft1' },
    { icon: 'rotate_right', action: 'rotateRight1' },
    { icon: 'rotate_right', action: 'rotateRight90' },
    { icon: 'flip', action: 'flipHorizontal' },
    { icon: 'flip_to_front', action: 'flipVertical' },
    { icon: 'restore', action: 'resetImage' }
  ];
  currentIndex: number = 0;
  scale: number = 1;
  rotate: number = 0;
  flipH: boolean = false;
  flipV: boolean = false;
  currentImageIndex: number = 0;
  showGrid: boolean = false;
  imagePreviews: (string | ArrayBuffer | null)[] = [];
  @ViewChild('uploadImageInput') uploadImageInput!: ElementRef<HTMLInputElement>;
  triggerUploadImage(): void {
    this.uploadImageInput.nativeElement.click();
  }
  previousImage() {
    this.currentImageIndex = (this.currentImageIndex > 0) ? this.currentImageIndex - 1 : this.imagePreviews.length - 1;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex < this.imagePreviews.length - 1) ? this.currentImageIndex + 1 : 0;
  }

  setImage(index: number) {
    this.currentImageIndex = index;
  }

  performAction(action: { icon: string, action: string }) {
    switch (action.action) {
      case 'zoomIn':
        this.scale = Math.min(3, this.scale + 0.1); // Limit zoom in
        break;
      case 'zoomOut':
        this.scale = Math.max(0.1, this.scale - 0.1); // Limit zoom out
        break;
      case 'rotateLeft90':
        this.rotate -= 90;
        break;
      case 'rotateLeft1':
        this.rotate -= 1;
        break;
      case 'rotateRight1':
        this.rotate += 1;
        break;
      case 'rotateRight90':
        this.rotate += 90;
        break;
      case 'flipHorizontal':
        this.flipH = !this.flipH;
        break;
      case 'flipVertical':
        this.flipV = !this.flipV;
        break;
        case 'toggleGrid':
          this.showGrid = !this.showGrid; // Toggle grid visibility
          break;
      case 'resetImage':
        this.resetTransformations();
        break;
      default:
        console.log(`Unknown action: ${action.action}`);
    }
  }

  private resetTransformations() {
    this.scale = 1;
    this.rotate = 0;
    this.flipH = false;
    this.flipV = false;
  }

  get transformStyle() {
    let transform = `scale(${this.scale}) rotate(${this.rotate}deg)`;
    if (this.flipH) transform += ' scaleX(-1)';
    if (this.flipV) transform += ' scaleY(-1)';
    return transform;
  }
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
}