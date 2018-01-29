import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidebarMenuComponent } from './slidebar-menu.component';

describe('SlidebarMenuComponent', () => {
  let component: SlidebarMenuComponent;
  let fixture: ComponentFixture<SlidebarMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidebarMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
