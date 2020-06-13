import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeurrequestComponent } from './vendeurrequest.component';

describe('VendeurrequestComponent', () => {
  let component: VendeurrequestComponent;
  let fixture: ComponentFixture<VendeurrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendeurrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendeurrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
