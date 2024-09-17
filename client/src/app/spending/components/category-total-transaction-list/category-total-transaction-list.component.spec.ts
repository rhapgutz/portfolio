import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTotalTransactionListComponent } from './category-total-transaction-list.component';

describe('CategoryTotalTransactionListComponent', () => {
  let component: CategoryTotalTransactionListComponent;
  let fixture: ComponentFixture<CategoryTotalTransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryTotalTransactionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryTotalTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
