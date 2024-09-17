import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTotalTransactionChartComponent } from './category-total-transaction-chart.component';

describe('CategoryTotalTransactionChartComponent', () => {
  let component: CategoryTotalTransactionChartComponent;
  let fixture: ComponentFixture<CategoryTotalTransactionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryTotalTransactionChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryTotalTransactionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
