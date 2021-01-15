import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
recordar=true;
usuario!: UsuarioModel;
  constructor(private auth:AuthService, private router:Router) { }
submit(form:NgForm){
  if(form.invalid){return;}
  Swal.fire({
    allowOutsideClick:false,
    type:'info',
    text:'Espere'
  });
  this.auth.nuevoUsuario(this.usuario).subscribe(resp=>{
    Swal.close();
    if(this.recordar){
      localStorage.setItem('email',this.usuario.email);
    }
    this.router.navigateByUrl('/login')
    console.log(resp)
  }, (err)=>{
    console.log(err.error.error.message);
    Swal.fire({
      type:'error',
      title:"Error al autenticar",
      text:err.error.error.message
    })
  })
  
  console.log("formulario")
  console.log(this.usuario)
}
  ngOnInit() { 
    this.usuario=new UsuarioModel();
  }


}
