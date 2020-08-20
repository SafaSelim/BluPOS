import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Product } from '../products.model';
import { take } from 'rxjs/operators';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ProductUnits, ProductCategories } from 'src/app/shared/shared.model';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  productForm: FormGroup;

  productUnits: ProductUnits[] = [];
  productCategories: ProductCategories[] = [];

  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private dataStorageService: DataStorageService,
    private router: Router,
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

      this.products = this.productsService.getProducts();

  }

  onSubmit() {
    console.log(this.productForm);
    let prodId = 0;
    prodId = this.products.length + 1;
    const newProduct = new Product({
      'productId': prodId,
      'productName' : this.productForm.value['prodName'],
      'imgPath' : this.productForm.value['imgPath'],
      'productCode' : this.productForm.value['prodCode'],
      'productCatId' : this.productForm.value['prodCatId'],
      'unitInStock' : this.productForm.value['unitInStock'],
      'uom' : this.productForm.value['uom'],
      'price' : this.productForm.value['price'],
    });
    console.log("newProduct",newProduct);
    if (this.editMode) {
      this.productsService.updateProduct(this.id, newProduct);
    }else {
      this.productsService.addProduct(newProduct);
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
      const product = this.productsService.getProduct(this.id);
      prodName = product.productName;
      imgPath = product.imgPath;
      prodCode = product.productCode;
      prodCatId = product.productCatId;
      price = product.price;
      uom = product.uom;
      unitInStock = product.unitInStock;
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

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
