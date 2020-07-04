import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForm : FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['',Validators.required],
      correo: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required],
    });
  }

  crearUsuario(){
    if(this.registroForm.invalid){return;}

    swal.fire({
      title: 'Espere por favor!',
      onBeforeOpen: () => {
        swal.showLoading()

      }});

      console.log("crearUsuario");
    const {nombre, correo, password} = this.registroForm.value
    this.authService.crearUsuario(nombre, correo, password).then(credenciales =>{
      console.log("credenciales");
      console.log(credenciales);
      swal.close();
      this.router.navigate(['/']);
    }).catch(err=>{
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
        footer: '<a href>Why do I have this issue?</a>'
      })
    })

    // console.log(this.registroForm);
    // console.log(this.registroForm.valid);
    // console.log(this.registroForm.value);

  }



}
