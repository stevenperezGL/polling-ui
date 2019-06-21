import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollLayoutComponent } from './poll-layout.component';

describe('PollLayoutComponent', () => {
  let component: PollLayoutComponent;
  let fixture: ComponentFixture<PollLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
