import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DraggableDirective } from '../../directives/draggable.directive';
import { ImageTransformationControlsComponent } from "../image-transition-controls/image-transition-controls/image-transformation-controls.component";
import { ImageTransformationConfigurations } from '../../interfaces/image-viewer-common-interfaces';


@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, DraggableDirective, ImageTransformationControlsComponent],
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent {
  /** Active image index */
  public currentImageIndex: number = 0;
  /** Flag to determine if grid lines need to be shown*/
  public showGrid: boolean = false;
  /** Uploaded images */
  public imagePreviews: (string | ArrayBuffer | null)[] = [];
  /** Image transformation configurations */
  public tansformConfig: ImageTransformationConfigurations = {
    showGridLines: false,
    transformationStyle:
      `scale(1) rotate(0}deg)`
  }


  @ViewChild('uploadImageInput') uploadImageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('imageContainer') imageContainer!: ElementRef<HTMLDivElement>;

  /** 
   * This method is trigger upload image input on click of Upload image thumbnail
   */
  public triggerUploadImage(): void {
    this.uploadImageInput.nativeElement.click();
  }
  
  /** 
 * Navigates to the previous image in the list.
 */
  public previousImage() {
    this.currentImageIndex = (this.currentImageIndex > 0) ? this.currentImageIndex - 1 : this.imagePreviews.length - 1;
  }

  /** 
   * Navigates to the next image in the list.
   */
  public nextImage() {
    this.currentImageIndex = (this.currentImageIndex < this.imagePreviews.length - 1) ? this.currentImageIndex + 1 : 0;
  }

  /**
   * Set index of current image upon clicking thumbnail
   * @param index 
   */
  public setImage(index: number): void {
    this.currentImageIndex = index;
  }

  /**
   * Method is invoked on file change
   * @param event 
   */
  public onFileSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  /**
   * Method is to set transformation style according to the event send from children
   * @param event 
   */
  public setTransformStyle(event: any) {
    this.tansformConfig = event;
  }

  /**
   * Method is to scroll to left
   */
  public scrollLeft(): void {
    this.imageContainer.nativeElement.scrollBy({ left: -100, behavior: 'smooth' });
  }

  /**
   * Method is to scroll to right
   */
  public scrollRight(): void {
    this.imageContainer.nativeElement.scrollBy({ left: 100, behavior: 'smooth' });
  }
}
