import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
usuario:UsuarioModel=new UsuarioModel();
recordar=false;
  constructor(private auth: AuthService,private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.usuario.email=localStorage.getItem('email');
      
      if(this.usuario.email="undefined"){
            this.usuario.email=""
      }
      this.recordar=true;
    }
  }
  login(form:NgForm){
    if(form.invalid){return;
    }
Swal.fire({
  allowOutsideClick:false,
  type:'info',
  text:'Autenticando...'
});
Swal.showLoading();
    this.auth.logIn(this.usuario).subscribe(resp=>{
      console.log(resp)
      Swal.close()
      if(this.recordar){
        localStorage.setItem('email',this.usuario.email);
        localStorage.setItem('nombre',this.usuario.nombre);

      }
      this.router.navigateByUrl('/home')

    },(err)=>{
      // console.log(err.error.error.message)
      Swal.fire({
        type:'error',
        title:"Error al autenticar",
        text:err.error.error.message
      })
    })

console.log("login",form)
  }

}