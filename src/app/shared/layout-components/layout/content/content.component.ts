import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SwitcherService } from 'src/app/shared/services/switcher.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  layoutSub!: Subscription;
  sidenavtoggled1: any;

  constructor(private layoutService: SwitcherService) {
    this.layoutSub = layoutService.SwitcherChangeEmitted.subscribe(
      (value) => {}
    );
  }
  ngOnInit() {}
  toggleSwitcher() {
    this.layoutService.emitSwitcherChange(false);
  }

  scrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 70;
  }
  
  ngOnDestroy(){
    document.body.classList.remove('sidenav-toggled');
    document.body.classList.remove('sidenav-toggled1');
  }
}
