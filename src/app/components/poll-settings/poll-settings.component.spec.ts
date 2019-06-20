import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollSettingsComponent } from './poll-settings.component';

describe('PollSettingsComponent', () => {
  let component: PollSettingsComponent;
  let fixture: ComponentFixture<PollSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
