import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   /* AQUI DEFINIMOS LA TEMATICA DE NUESTRA IMAGEN*/
   styleImage = 'rain';

   form!: FormGroup;
   constructor(private formBuilder: FormBuilder){
   }
   ngOnInit(): void {
     this.buildForm();
   }
   private buildForm(): any {
     this.form = this.formBuilder.group({
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(6)]],
         });
   }
   /* ESTA FUNCION ES ACTIVADA POR EL NGSTYLE */
   unsplashClass(): any {
     return {
       'min-height': '100%',
       /* LLAMADA RANDOMICA AL SERVICIO DE IMAGENES DE UNSPLASH - CON IMAGENES DE TAMAÑO 1200X900 */
       /*SE LE AÑADE LA VARIABLE DE styleUrls PARA ESTABLECER LA TEMATICA*/
       background: `url("https://source.unsplash.com/random/1200x900?"${this.styleImage}) no-repeat center center`,
       'background-size': 'cover',
       position: 'relative',
     };
   }
   login(event: Event): any {
     event.preventDefault();
     if (this.form.valid) {
       const value = this.form.value;
       console.log(`'%c'USER: ${value.email} - PASSWORD: ${value.password}`, 'background: #222; color: #bada55');
     }
   }
 }
//  errorMessage = '';
//  constructor(private afAuth: AngularFireAuth,
//    private router: Router,
//    private fb: FormBuilder,
//    private ngZone: NgZone) { }

//  loginForm = this.fb.group({
//    email: ['', Validators.required],
//    password: ['', Validators.required]
//  })

//  ngOnInit() {
//    this.afAuth.user.subscribe(user => {
//      if (user) {
//        this.ngZone.run(() => {
//          this.router.navigate(['/todos']);
//        })
//  }})}

//  createUser() {
//   this.afAuth.auth.createUserWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(() => {
//      this.router.navigate(['/todos']);
//    }).catch((response: { message: string; }) => {
//      this.errorMessage = response.message;
//    });
//   }
//  signIn() { 
//   this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(() => {
//      this.router.navigate(['/todos']);
//    }).catch((response: { message: string; }) => {
//      this.errorMessage = response.message;
//    });}
// }