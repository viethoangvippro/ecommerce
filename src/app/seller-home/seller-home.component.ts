import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  p:any;
  pageSize: string | number | undefined ;
  productList: any | product[];
  productMessage: undefined | string;
  icon = faTrash;
  iconEdit=faEdit;
  products: product[] |any;
  dialogRef: MatDialogRef<ConfirmDialogComponent> | any;

  constructor(private product: ProductService,public dialog: MatDialog,private viewContainerRef: ViewContainerRef) {
    this.products = product.getProducts();
  }

  ngOnInit(): void {
    this.list();

  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.viewContainerRef = this.viewContainerRef;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
  }
  onDelete(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.viewContainerRef = this.viewContainerRef;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Xoá sản phẩm
        this.product.deleteProduct(id).subscribe((result) => {
          if (result) {
            this.productMessage = 'Product is deleted';

            this.list();

          }
        });
        setTimeout(() => {
          this.productMessage = undefined;
        }, 2000);
      }
    });
  }


  deleteProduct1(product: product) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Are you sure you want to delete ${product.name}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.product.deleteProduct1(product);
        this.products = this.product.getProducts();
      }
    });
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';

        this.list();

      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 2000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;

      }
    });
  }
}
