import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageTransformationControlsComponent } from './image-transformation-controls.component';


describe('ImageTransformationControlsComponent', () => {
  let component: ImageTransformationControlsComponent;
  let fixture: ComponentFixture<ImageTransformationControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageTransformationControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageTransformationControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
