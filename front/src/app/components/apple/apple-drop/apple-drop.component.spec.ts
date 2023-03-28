import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleDropComponent } from './apple-drop.component';

describe('AppleDropComponent', () => {
  let component: AppleDropComponent;
  let fixture: ComponentFixture<AppleDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppleDropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppleDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
