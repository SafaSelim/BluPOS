

export class ProductUnits {
  unitId: number;
  unitName: string;

  constructor(productUnits) {
    console.log("ProductUnitsModel:constructor-->", productUnits);
    this.unitId = productUnits.unitId;
    this.unitName = productUnits.unitName || "";
  }
}


export class ProductCategories {
  productCatId: number;
  productCatName: string;
  desc: string;

  constructor(productCategories) {
    console.log("ProductCategoriesModel:constructor-->", productCategories);
    this.productCatId = productCategories.productCatId;
    this.productCatName = productCategories.productCatName || "";
    this.desc = productCategories.desc || "";
  }
}


export class Users {
  userId: number;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string;

  constructor(users) {
    console.log("usersModel:constructor-->", users);
    this.userId = users.userId;
    this.userName = users.userName || "";
    this.password = users.password || "";
    this.firstName = users.firstName || "";
    this.lastName = users.lastName || "";
    this.email = users.email || "";
    this.roles = users.roles || "";
  }
}
