import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Product } from '../products.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        console.log(this.editMode);
      });
  }

  onSubmit() {
    console.log(this.productForm);
    const newProduct = new Product({
      'prodId': 0,
      'prodName' : this.productForm.value['prodName'],
      'imgPath' : this.productForm.value['imgPath'],
      'prodCode' : this.productForm.value['prodCode'],
      'prodCatId' : this.productForm.value['prodCatId'],
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
