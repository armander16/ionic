import { Injectable } from '@angular/core';
//import properties from './mock-properties';
import { RestProvider } from '../rest/rest';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';



/*
  Generated class for the FavoritoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoritoProvider {


  favoriteCounter: number = 0;
  favorites: any[] = [];
  products: any;
    p: any;
  elemento: any;
  cartTotal: number = 0
  errorMessage: string;
   private productAddedSource = new Subject<any>();


  productAdded$ = this.productAddedSource.asObservable();


findAll() {

    return Promise.resolve(this.favorites);
  }

  findById(id) {
  //  return Promise.resolve(properties[id - 1]);
  this.elemento = this.getFavorites();
  return Promise.resolve(this.favorites [id - 1]);
  }

  findByName(searchKey: string) {
    let key: string = searchKey.toUpperCase();
    return Promise.resolve(this.favorites.filter((property: any) =>
        (property.title +  ' ' +property.address +  ' ' + property.city + ' ' + property.description).toUpperCase().indexOf(key) > -1));
  }


  getFavorites() {
    return Promise.resolve(this.favorites);
// return Promise.all([this.favorites]).then(function(arr){
//  return arr[0]; 
 // });

  }



/*  getFav(): Observable<{}> {

var str = this.favorites;
var obj = JSON.parse(str);
  return obj; 
}*/

  favorite(property) {

    this.favoriteCounter = this.favoriteCounter + 1;
    this.favorites.push({id: this.favoriteCounter, property: property});
    return Promise.resolve();
  }

  unfavorite(favorite) {
    let index = this.favorites.indexOf(favorite);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
    return Promise.resolve();
  }

 addProductToCart(property){
    let exists = false
    let parsedPrice = parseFloat(property.price.replace(/\./g, '').replace(',', '.'))
    this.cartTotal += parsedPrice
    //Search this property on the cart and increment the quantity
    this.products = this.products.map(_product => {
      if(_product.property.id == property.id){
        _product.quantity++
        exists = true
      }
      return _product
    })
    //Add a new property to the cart if it's a new property
    if(!exists){
      property.parsedPrice = parsedPrice
      this.products.push({
        property:property,
        quantity:1
      })
    }

    this.productAddedSource.next({ products: this.products, cartTotal: this.cartTotal })
  }


}
