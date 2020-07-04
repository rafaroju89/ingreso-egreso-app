import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loggingForm: FormGroup

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loggingForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required]
    });
  }

  ingresarUsuario(){
    if(this.loggingForm.invalid){return; }
    const {email, password} = this.loggingForm.value;
    swal.fire({
      title: 'Espere por favor!',
      onBeforeOpen: () => {
        swal.showLoading()

      }});


    this.auth.loginUsuario(email, password).then(credenciales=>{
      console.log(credenciales);
      swal.close();
      this.router.navigate(['/'])
    }).catch(err=>{
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
        footer: '<a href>Why do I have this issue?</a>'
      })
    })
  }

}
