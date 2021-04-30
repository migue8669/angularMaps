import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentService } from 'src/app/services/component.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  recordar = true;
  usuario!: UsuarioModel;


  constructor(private auth: AuthService, private router: Router, private componentService: ComponentService) {}
  submit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      text: 'Espere',
    });
    this.auth.nuevoUsuario(this.usuario).subscribe(
      (resp) => {
        Swal.close();
        if (this.recordar) {
          localStorage.setItem('email', this.usuario.email);
          localStorage.setItem('nombre',this.usuario.nombre);

         }
        this.router.navigateByUrl('/login');
        this.componentService.sendMessage(resp);

      },
      (err) => {
        Swal.fire({
          title: 'Error al autenticar',
          text: err.error.error.message,
        });
      }
    );

  }

  submitAnonimo() {
    // if(form.invalid){return;}
    Swal.fire({

      text: 'Espere',
    });
    this.auth.usuarioAnonimo(this.usuario).subscribe(
      (resp) => {
        Swal.close();
        if (this.recordar) {
          localStorage.setItem('email', this.usuario.email);
          localStorage.setItem('nombre',this.usuario.nombre);
        }
        this.router.navigateByUrl('/home');
this.componentService.sendMessage(resp);
      },
      (err) => {
        Swal.fire({
          title: 'Error al autenticar',
          text: err.error.error.message,
        });
      }
    );
  }
  ngOnInit() {
    this.usuario = new UsuarioModel();
  }
}
