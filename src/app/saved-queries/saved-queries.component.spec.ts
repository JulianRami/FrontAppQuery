import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedQueriesComponent } from './saved-queries.component';

describe('SavedQueriesComponent', () => {
  let component: SavedQueriesComponent;
  let fixture: ComponentFixture<SavedQueriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedQueriesComponent]
    });
    fixture = TestBed.createComponent(SavedQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
