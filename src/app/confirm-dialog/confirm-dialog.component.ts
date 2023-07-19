import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
  template: `
  <h2 mat-dialog-title>Xác nhận xoá sản phẩm</h2>
  <mat-dialog-content>
    Bạn có chắc chắn muốn xoá sản phẩm có id là {{ data.id }} không?
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button [mat-dialog-close]="false">Không</button>
    <button mat-button [mat-dialog-close]="true">Có</button>
  </mat-dialog-actions>
`,
})
export class ConfirmDialogComponent {
  constructor(private dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.dialog.open(ConfirmDialogComponent);

  }
}
