import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
usuario:UsuarioModel=new UsuarioModel();
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  login(form:NgForm){
    if(form.invalid){return;
    }

    this.auth.logIn(this.usuario).subscribe(resp=>{
      console.log(resp)
    },(err)=>{
      console.log(err.error.error.message)
    })

console.log("login",form)
  }

}
