import { Customer } from "src/customer/entity/customer.entity";

export function mergeSort(arr:Customer[]):Customer[]{
  if(arr.length <= 1){
      return arr;
  }

  const half:number = Math.floor(arr.length/2);
  const first:Customer[] = mergeSort(arr.slice(0,half));
  const second:Customer[] = mergeSort(arr.slice(half));

  return merge(first, second);
}

function merge(a:Customer[], b:Customer[]):Customer[]{
  const c:Customer[] = [];
  while(a.length && b.length){
      const temp1=((a[0].purchaseAmount)-(a[0].purchaseAmount*a[0].discount/100.0));
      const temp2=((b[0].purchaseAmount)-(b[0].purchaseAmount*b[0].discount/100.0));
      if(temp1>temp2){
          c.push(a.shift()!);
      }else{
          c.push(b.shift()!);
      }
  }

  while(a.length){
      c.push(a.shift()!);
  }

  while(b.length){
      c.push(b.shift()!);
  }

  return c;
}