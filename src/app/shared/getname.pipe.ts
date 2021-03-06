import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'getname'
})
export class GetNamePipe implements PipeTransform {
  transform(value: number, array: any[], keyExpr: string, displayExpr: string) {
    console.log(value, array, keyExpr, displayExpr);
    let name: string = "";
    array.forEach(el => {
      if (el[keyExpr] == value) {
        name = el[displayExpr] || "";
      }
    });

    return name;
  }
}
