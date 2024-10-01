import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerficationComponent } from './verfication.component';

describe('VerficationComponent', () => {
  let component: VerficationComponent;
  let fixture: ComponentFixture<VerficationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerficationComponent]
    });
    fixture = TestBed.createComponent(VerficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
