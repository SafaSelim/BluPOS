import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'getname'
})
export class GetNamePipe implements PipeTransform {
  transform(value: number, array: any[], keyExpr: string, displayExpr: string) {
    let name: string = "";
    array = array.filter(el => {
      return el[keyExpr] == value;
    });
    name = array[0][displayExpr] || "";
    return name;
  }
}
