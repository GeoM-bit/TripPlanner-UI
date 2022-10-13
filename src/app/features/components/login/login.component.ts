import { Component, OnInit } from '@angular/core';
import { SnackBarRegisterComponent } from '../snack-bar-register/snack-bar-register.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registered: boolean;

  constructor(private route: ActivatedRoute, private snackBar: SnackBarRegisterComponent) { }

  ngOnInit(): void {
  }
}
