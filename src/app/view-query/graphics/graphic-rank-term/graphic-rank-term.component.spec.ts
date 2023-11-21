import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicRankTermComponent } from './graphic-rank-term.component';

describe('GraphicRankTermComponent', () => {
  let component: GraphicRankTermComponent;
  let fixture: ComponentFixture<GraphicRankTermComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicRankTermComponent]
    });
    fixture = TestBed.createComponent(GraphicRankTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
