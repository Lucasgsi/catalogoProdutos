import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Produto } from '../../model/produto';
import { ProdutoS } from '../../model/produtoS';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import { Storage } from '@ionic/storage';

import { Database } from '../../data/database';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ServidorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servidor',
  templateUrl: 'servidor.html',
})
export class ServidorPage {
  produtos:Produto[];
  produtoServ:ProdutoS[];
  tipoConsulta:string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public storage: Storage,
              public database: Database,
              public toastCtrl: ToastController) {
                this.tipoConsulta = this.navParams.get('tipo');
                this.consultar();
  }

  converterNumber(numero): number {
    return parseFloat(numero);
  }

  consultar(){
    console.log(this.tipoConsulta);
    if(this.tipoConsulta == 'servidor'){
      this.consultarProdutoServidor();
    }else{
      this.consultarProduto();
    }
  }

  consultarProdutoServidor(){
    this.http.get("http://192.168.0.105:8084/sistema/rest/servico/consultar")
    .map(res => res.json())
    .subscribe(
      data => {
          console.log("Consultou");
          console.log(data);
          this.produtoServ = data;
      },
      error =>{
        console.log("Deu merda");
        console.log(error);
      });
  }

  consultarProduto(){
    this.database.buscarProduto().subscribe(data => {
      this.produtos = data;

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServidorPage');
  }

  voltarParaHome(){
    this.navCtrl.pop();
  }

}
