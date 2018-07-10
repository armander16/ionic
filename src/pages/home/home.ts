import { Toast } from '@ionic-native/toast';
import { Component } from '@angular/core';
import {ActionSheetController, ActionSheet, NavParams, ToastController} from 'ionic-angular';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {FavoritoProvider} from '../../providers/favorito/favorito';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: any;
  selectedProduct: any[] =[];
  productFound:boolean = false;
  errorMessage: string;
  valores: any = [];
  scannedCode: any; 
  constructor(public navCtrl: NavController, 
  private barcodeScanner: BarcodeScanner,
  public favoritoProvider: FavoritoProvider,
  private toast: Toast,
  public toastCtrl: ToastController,
  public rest: RestProvider,
  public alertCtrl: AlertController) {


  }





// termina constructor
//  public items: string[] = [];


 scan() {
   // this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {

this.scannedCode = barcodeData.text;
//this.scannedCode.push(barcodeData.text);

      console.log("inicio programa:"+this.products);
        
      
      this.selectedProduct = this.products.filter(product =>product.plu === this.scannedCode ); //funcion find es string  

   //   this.selectedProduct= this.products.filter(product); //funcion find es string  

//var arr = ["a", "ab", "c", "ad"], arr2;
//(arr2 = arr.filter(function(elmnt) { return elmnt.indexOf("a") > -1; })).push("aaa");


        console.log("push inicio:"+this.selectedProduct);
        console.log("valores antes:" +this.valores);

      //barcodeData.tex el valor q lee
          const mypro = JSON.stringify(this.selectedProduct);
        console.log("convertidors: " + mypro);

        console.log("valores despues:"+this.valores);
        console.log("texto del products:"+ this.products);
        console.log("texto del barcode:"+ this.scannedCode);

      if(mypro !== '[]') {
        this.productFound = true;
       // this.valores.push(this.selectedProduct);
        console.log("Seleciona productos:"+this.selectedProduct);
     //   console.log("areglo hola:"+ mypro);

      } else {
     //   this.selectedProduct = {};
        this.productFound = false;
        //this.valores.push(this.selectedProduct);
        this.toast.show('Producto no encontrado', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
        // this.selectedProduct.push( this.products.filter(product =>product.plu === this.scannedCode ));

    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });

  // this.selectedProduct.push();
  //  this.selectedProduct.push( this.products.filter(product =>product.plu === this.scannedCode ));




  }


///////////////////////////////////////77 favoritos incicial

  favorite(P) {
  console.log("conoslo favporitos:"+P)
        this.favoritoProvider.favorite(P)
            .then(property => {
                let toast = this.toastCtrl.create({
                    message: 'Producto agregado a carrito',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
            });
    }


///////////////////////////////////////////////////  favoritos final


  ionViewDidLoad() {
    this.getProducts();
  }
  

  deleteNote(P){
  console.log("valores de P:"+P);


   let index = this.selectedProduct.indexOf(P);
 
        if(index > -1){
            this.selectedProduct.splice(index, 1);
        }

    }
 


    editNote(P){
 
        let prompt = this.alertCtrl.create({
            title: 'Editar Precio',
            inputs: [{
                name: 'price'
            }],
            buttons: [
                {
                    text: 'Cancelar'
                },
                {
                    text: 'Guardar',
                    handler: product => {
                        let index = this.selectedProduct.indexOf(P);
 
                        if(index > -1){
                          this.selectedProduct[index] = product;
                        }
                    }
                }
            ]
        });
 
        prompt.present();      
 
    }




  getProducts() {
    this.rest.getProducts()
       .subscribe(
         products => this.products = products,
         error =>  this.errorMessage = <any>error);
  }

  //refrescar
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    // peticion rest
this.rest.getProducts()
       .subscribe(
         products => this.products = products,
         error =>  this.errorMessage = <any>error);
// termina peticion rest
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}

