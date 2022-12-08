import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RequestStatus} from "../../../core/enums/requestStatus";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: {newStatus: String}) { }

  ngOnInit(): void {
  }

  onAction() {
    this.dialogRef.close({ status: this.data.newStatus });
  }

  closeDialog() {
    this.dialogRef.close({ status: 'closed' });
  }
}
