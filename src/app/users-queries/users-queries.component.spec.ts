import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersQueriesComponent } from './users-queries.component';

describe('UsersQueriesComponent', () => {
  let component: UsersQueriesComponent;
  let fixture: ComponentFixture<UsersQueriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersQueriesComponent]
    });
    fixture = TestBed.createComponent(UsersQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
