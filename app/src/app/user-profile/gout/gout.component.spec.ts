import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoutComponent } from './gout.component';

describe('GoutComponent', () => {
  let component: GoutComponent;
  let fixture: ComponentFixture<GoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
