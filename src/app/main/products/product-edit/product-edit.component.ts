import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';
import { Product } from '../products.model';
import { map, take } from 'rxjs/operators';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ProductUnits, ProductCategories } from 'src/app/shared/shared.model';


import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as ProductsActions from '../store/product.actions';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit,OnDestroy {
  id: number;
  editMode: boolean = false;
  productForm: FormGroup;

  productUnits: ProductUnits[] = [];
  productCategories: ProductCategories[] = [];

  products: Product[] = [];

  storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) {
    this.productUnits = this.dataStorageService.productUnits;
    this.productCategories = this.dataStorageService.productCategories;
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        console.log(this.editMode);
      });

      this.store.select('products').pipe(take(1)).subscribe(productsState => {
        this.products = productsState.products;
      })

  }

  onSubmit() {
    console.log(this.productForm);
    let prodId = 0;
    prodId = this.products.length + 1;
    const newProduct = new Product({
      'productId': this.editMode ? this.id : prodId,
      'productName': this.productForm.value['prodName'],
      'imgPath': this.productForm.value['imgPath'],
      'productCode': this.productForm.value['prodCode'],
      'productCatId': this.productForm.value['prodCatId'],
      'unitInStock': this.productForm.value['unitInStock'],
      'uom': this.productForm.value['uom'],
      'price': this.productForm.value['price'],
    });
    console.log("newProduct", newProduct);
    if (this.editMode) {
      this.store.dispatch(new ProductsActions.ProductUpdated({productId: this.id, newProduct}));
    } else {
      this.store.dispatch(new ProductsActions.ProductAdded(newProduct));
    }

    this.onCancel();
  }

  private initForm() {
    let prodName = '';
    let imgPath = '';
    let prodCode = '';
    let prodCatId = null;
    let price = null;
    let uom = null;
    let unitInStock = null;

    if (this.editMode) {
      this.storeSub = this.store.select('products').pipe(
        map(productsState => {
          return productsState.products.find((product) => {
            return product.productId === this.id;
          })
        })
      ).subscribe(product => {
        prodName = product.productName;
        imgPath = product.imgPath;
        prodCode = product.productCode;
        prodCatId = product.productCatId;
        price = product.price;
        uom = product.uom;
        unitInStock = product.unitInStock;
      });
    }

    this.productForm = new FormGroup({
      'prodName': new FormControl(prodName, Validators.required),
      'imgPath': new FormControl(imgPath, Validators.required),
      'prodCode': new FormControl(prodCode, Validators.required),
      'prodCatId': new FormControl(prodCatId, Validators.required),
      'price': new FormControl(price, [Validators.required, Validators.pattern('^(?:[1-9]\\d*|0)?(?:\\.\\d+)?$')]),
      'uom': new FormControl(uom, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
      'unitInStock': new FormControl(unitInStock, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }

}
