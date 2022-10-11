import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-register',
  templateUrl: './snack-bar-register.component.html',
  styleUrls: ['./snack-bar-register.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class SnackBarRegisterComponent {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      duration:5000,
      panelClass: ['registerSnackBar']
    });
  }
}
