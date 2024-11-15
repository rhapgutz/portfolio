import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStoryCardComponent } from './user-story-card.component';

describe('UserStoryCardComponent', () => {
  let component: UserStoryCardComponent;
  let fixture: ComponentFixture<UserStoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserStoryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserStoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
