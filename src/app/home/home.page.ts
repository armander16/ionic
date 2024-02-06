import { Component } from '@angular/core';
//import { UserService } from '../api/user.service.ts';

import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  datos = <any>{}
  datosPage = <any>{}


   page_number = 0;

   mostrar = false;

  constructor(

    private apiService: UserService

    
  ) {

    this.apiService.getDatos().then(
      ( datos : any) => {


        this.datos = datos
        console.log("dos")
        this.mostrar = true
      }
    );


  }


   izquierda( items_per_page : any ){
    const elementos =  this.datos
    this.page_number--;
    const total_no_of_items = elementos.length;
    let no_of_pages = total_no_of_items / items_per_page;
     
    let items_to_skip = (this.page_number - 1) * items_per_page;
     this.datosPage = elementos.slice(items_to_skip, items_per_page + items_to_skip);
    console.log( this.datos) 
  
   }

   derecha(  items_per_page : any ){
    const elementos =  this.datos;
    this.page_number++;
    const total_no_of_items = elementos.length;
    let no_of_pages = total_no_of_items / items_per_page;
     
    let items_to_skip = (this.page_number - 1) * items_per_page;
     this.datosPage = elementos.slice(items_to_skip, items_per_page + items_to_skip);
  
   }

}


