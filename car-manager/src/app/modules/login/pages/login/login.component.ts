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
    this.authService.login(username, password).subscribe(
      (resp) => {
        const data: any = resp;
        localStorage.setItem('gestCar', `Bearer ${data.token}`);
        localStorage.setItem('getCarU', `${data.user.username}`);
        this.router.navigate(['/home']);
      },
      (err) => { console.log(err); }
    );
  }

}
