import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicScoreTermComponent } from './graphic-score-term.component';

describe('GraphicScoreTermComponent', () => {
  let component: GraphicScoreTermComponent;
  let fixture: ComponentFixture<GraphicScoreTermComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicScoreTermComponent]
    });
    fixture = TestBed.createComponent(GraphicScoreTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
