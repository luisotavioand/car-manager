import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('formLogin', { static: false }) formLogin: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onClickLogin() {
    const { username, password } = this.formLogin.form.value;
    console.log(username);
    console.log(password);
    this.authService.login(username, password).subscribe(
      (resp) => {
        const data: any = resp;
        localStorage.setItem('gestCar', `Bearer ${data.token}`);
        this.router.navigate(['/marcas']);
      },
      (err) => { console.log(err); }
    );
  }

}
