import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarLeftComponent } from './side-bar-left.component';

describe('SideBarLeftComponent', () => {
  let component: SideBarLeftComponent;
  let fixture: ComponentFixture<SideBarLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
