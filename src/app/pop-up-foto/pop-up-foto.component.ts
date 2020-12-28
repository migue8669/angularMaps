import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-pop-up-foto',
  templateUrl: './pop-up-foto.component.html',
  styleUrls: ['./pop-up-foto.component.css']
})
export class PopUpFotoComponent  {

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content:any) {
    this.modalService.open(content);
  }

}
