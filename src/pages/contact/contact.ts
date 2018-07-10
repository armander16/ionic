import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import {FavoritoProvider} from '../../providers/favorito/favorito';
import {HomePage} from '../home/home';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  selectedProduct: any;
  products: any;
  total : number;
  itemsCarrito: any;
  precio: number ; 
  cartTotal: number = 0
  favorites: any[] = [];
    produ: any[] = []
  constructor(
  public navCtrl: NavController, 
  public service: FavoritoProvider) {
        this.getFavorites();
    }

  	itemTapped(favorite) {
        this.navCtrl.push(HomePage, favorite.property);
    }

    deleteItem(favorite) {
        this.service.unfavorite(favorite)
            .then(() => {
                this.getFavorites();
            })
            .catch(error => alert(JSON.stringify(error)));
    }
    getFavorites() {
        this.service.getFavorites()
            .then(data => this.favorites = data);
            const mypro = JSON.stringify(this.service.getFavorites());
            console.log("muestra favoritos:"+mypro);       
    }


  //refrescar
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    // peticion rest
this.ionViewDidLoad();
// termina peticion rest
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

   //////////////// agregado nuevo 

  ionViewDidLoad() {
 console.log("Muestra favoritos");
  } 


/*
getTotal() {

//this.selectedProduct = this.favorites.reduce((a,b)=> b = +a.price );


this.selectedProduct  = this.service.getFavorites().then(data => this.favorites = data);
            const mypro = JSON.stringify(this.selectedProduct );


//console.log("suma ---------:"+ parsedPrice );

//const numbers = this.selectedProduct.map(i => i.price);
//const sum = numbers.reduce((a,b) => a +b,0);
console.log("suma ---------:"+ this.selectedProduct );

this.cambio = this.selectedProduct.property.price;
console.log("cambio:"+ this.cambio);


this.precio = +this.cambio + this.total;

console.log("precio:"+ this.cambio);

//this.adds = this.precio + this.total;
//console.log("---------:"+ this.selectedProduct);
//console.log("--precio:"+ this.selectedProduct.property.price);

 return this.precio;
  }

*/


}
