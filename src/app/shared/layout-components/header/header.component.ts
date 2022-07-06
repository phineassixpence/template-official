import { Component, OnInit, Inject } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { AuthService } from '../../services/firebase/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwitcherService } from '../../services/switcher.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public elem: any;
  public isCollapsed = true;

  constructor(public layout: SwitcherService,
    public authService:AuthService,
    public navServices: NavService, 
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    this.elem = document.documentElement;
    
  }
  open(content:any) {
    this.modalService.open(content, {backdrop : 'static' , windowClass : 'modalCusSty' })
  }

  signout(){
    this.authService.SignOut()
  }
  toggleSidebarNotification() {
    this.layout.emitSidebarNotifyChange(true);
  }
  toggleSwitcher() {
    this.layout.emitSwitcherChange(true);
  }

}
