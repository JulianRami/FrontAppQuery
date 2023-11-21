import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicCountryTermRankComponent } from './graphic-country-term-rank.component';

describe('GraphicCountryTermRankComponent', () => {
  let component: GraphicCountryTermRankComponent;
  let fixture: ComponentFixture<GraphicCountryTermRankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicCountryTermRankComponent]
    });
    fixture = TestBed.createComponent(GraphicCountryTermRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
