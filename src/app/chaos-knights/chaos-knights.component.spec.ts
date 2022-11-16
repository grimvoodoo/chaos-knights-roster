import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChaosKnightsComponent } from './chaos-knights.component';

describe('ChaosKnightsComponent', () => {
  let component: ChaosKnightsComponent;
  let fixture: ComponentFixture<ChaosKnightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChaosKnightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChaosKnightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
