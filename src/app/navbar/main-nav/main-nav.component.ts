import { Component, OnInit, TemplateRef  } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  mainNavData: any = [];
  isLoading = true;
  modalRef: BsModalRef;
  constructor(private _nav: NavbarService,private modalService: BsModalService) { }
  
  ngOnInit(): void {
    window.scroll(0, 0);

    this._nav.getMainNav().then((res: any) => {
      res.subscribe((response: any) => {
        
        this.mainNavData = response.data;
        console.log(this.mainNavData)
        this.isLoading = false;
      })

    }).catch(error => {
      console.log(error)
    })
  }

  openModal(template: TemplateRef<any>, el) {
    this.modalRef = this.modalService.show(template,{ backdrop: 'static', keyboard: false });
    let messageId = el.getAttribute('id');

    console.log(messageId)
}
  
  
}
