import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  selectedImage: any = null;
  imgSrc: string="";
  // formTemplate = new FormGroup({
    
  //   imageUrl: new FormControl('', Validators.required)
  // })
  open(content:any) {
    this.modalService.open(content);
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '../assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

}
