import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageTransformationConfigurations } from '../../../interfaces/image-viewer-common-interfaces';

@Component({
  selector: 'app-image-Transform-controls',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule,],
  templateUrl: './image-transformation-controls.component.html',
  styleUrl: './image-transformation-controls.component.scss'
})
export class ImageTransformationControlsComponent implements OnInit {
  /** Conguration for transformation controls*/
  public transformationControlConfigs = [
    { icon: 'zoom_in', action: 'zoomIn', toolTipContent: 'Zoom In (Zoom +)' },
    { icon: 'zoom_out', action: 'zoomOut', toolTipContent: 'Zoom Out (Zoom -)' },
    { icon: 'grid_on', action: 'toggleGrid', toolTipContent: 'Show/Hide Grid-lines' },
    { icon: 'rotate_90_degrees_ccw', action: 'rotateLeft90', toolTipContent: 'Rotate 90 Degrees Anti-clockwise' },
    { icon: 'rotate_left', action: 'rotateLeft1', toolTipContent: 'Rotate 1 Degree Anti-clockwise' },
    { icon: 'rotate_right', action: 'rotateRight1', toolTipContent: 'Rotate 1 Degree Clockwise' },
    { icon: 'rotate_90_degrees_cw', action: 'rotateRight90', toolTipContent: 'Rotate 90 Degrees Clockwise' },
    { icon: 'flip', action: 'flipHorizontal', toolTipContent: 'Flip Horizontal' },
    { icon: 'flip_to_front', action: 'flipVertical', toolTipContent: 'Flip Vertical' },
    { icon: 'cancel', action: 'resetImage', toolTipContent: 'Reset Image' }
  ];
  /** Flag to determine if the grid lines need to be shown */
  public showGrid = false;
  @Output() public imageTransformConfig = new EventEmitter<ImageTransformationConfigurations>();

  private scale: number = 1;
  private rotate: number = 0;
  private flipHorizontal: boolean = false;
  private flipVertical: boolean = false;


  public ngOnInit(): void {
  }
  /** 
   * Method is to perform transformation actns based on the action passed
   */
  public performImageTransform(action: { icon: string, action: string }) {
    switch (action.action) {
      case 'zoomIn':
        this.scale = Math.min(3, this.scale + 0.1);
        break;
      case 'zoomOut':
        this.scale = Math.max(0.1, this.scale - 0.1);
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
        this.flipHorizontal = !this.flipHorizontal;
        break;
      case 'flipVertical':
        this.flipVertical = !this.flipVertical;
        break;
      case 'toggleGrid':
        this.showGrid = !this.showGrid;
        break;
      case 'resetImage':
        this.resetTransformations();
        break;
      default:
        console.log(`Unknown action: ${action.action}`);
    }
    this.setTransformStyle();
  }
  /** Method is to reset all the transformations */
  private resetTransformations() {
    this.scale = 1;
    this.rotate = 0;
    this.flipHorizontal = false;
    this.flipVertical = false;
  }
  /** Method is to set trasnforations styles */
  private setTransformStyle() {
    let transform = `scale(${this.scale}) rotate(${this.rotate}deg)`;
    if (this.flipHorizontal) transform += ' scaleX(-1)';
    if (this.flipVertical) transform += ' scaleY(-1)';
    
    const imageTransformConfig = { showGridLines: this.showGrid, transformationStyle: transform }
    this.imageTransformConfig.emit(imageTransformConfig);
  }
}
