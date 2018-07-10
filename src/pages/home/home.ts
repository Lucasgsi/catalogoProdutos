import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Produto } from '../../model/produto';
import { ProdutoS } from '../../model/produtoS';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import { Storage } from '@ionic/storage'
import { Database } from '../../data/database';

import { ToastController } from 'ionic-angular';
import { ServidorPage } from '../servidor/servidor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  produto : Produto = new Produto();
  produtoS : ProdutoS = new ProdutoS();

  constructor(public navCtrl: NavController,
              public http: Http,
              public storage: Storage,
              public database: Database,
              public toastCtrl: ToastController) {

  }

  converterNumber(numero): number {
    return parseFloat(numero);
  }

  cadastrarProduto(){
    this.database.adicionarProduto(this.produto);
      const toast = this.toastCtrl.create({
        message: 'Salvo com Sucesso.',
        duration: 3000
      }).present();
    this.produto = new Produto();
  }

  cadastrarProdutoServidor(){
    this.produtoS.nome = this.produto.nome;
    this.produtoS.estoque = this.produto.estoque;
    this.produtoS.estoqueMin = this.produto.estoqueminimo;
    this.produtoS.precoVenda = this.produto.precovenda;
    this.produtoS.precoCompra = this.produto.precocompra;
    this.http.post("http://192.168.0.105:8084/sistema/rest/servico/cadastrar",this.produtoS).retry(2).map(res => res.json()).subscribe(
      data => {
        console.log(data);
        const toast = this.toastCtrl.create({
          message: 'Salvo com Sucesso.',
          duration: 3000
        }).present();
        this.produtoS = new ProdutoS();
      }, error => {
        console.log(error);
      });
  }

  viewProdutosServidor(){
    this.navCtrl.push(ServidorPage, { 'tipo': 'servidor' });
  }

  viewProdutosLocal() {
    this.navCtrl.push(ServidorPage, { 'tipo': 'local' });
  }

}
