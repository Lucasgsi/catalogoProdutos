import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Produto } from '../model/produto';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Database {

  theConsole: string = "Console Messages";

  options: any = {
    name: 'trabalho.db',
    location: 'default',
    createFromLocation: 1
  }

  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.connectDb();
  }

  private connectDb(): void {
    this.sqlite.create(this.options)
      .then((db: SQLiteObject) => {
        this.db = db;
        var sql = 'create table IF NOT EXISTS produto (id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(255), estoque real, estoqueminimo real, precovenda real, precocompra real)';
        this.db.executeSql(sql, {})
          .then(() => console.log("SQL " + sql))
          .catch(e => console.log("Erro " + e));
      }).catch(e => console.log("Erro " + e));

  }

  adicionarProduto(produto: Produto): void {

    var sql = "INSERT INTO produto (nome, estoque, estoqueminimo, precovenda, precocompra) VALUES ('" + produto.nome + "', " + produto.estoque + " , " + produto.estoqueminimo + " , " + produto.precovenda + ", " + produto.precocompra + ")";

    this.db.executeSql(sql, {})
      .then(() => console.log("SQL " + sql))
      .catch(e => console.log("Erro " + e));
  }

  buscarProduto() {
    var sql = "SELECT * FROM produto";
    return Observable.create((observer) => {
      this.db.executeSql(sql, {})
        .then((result) => {
          let items: Produto[] = [];
          if (result.rows.length > 0) {
            for (var x = 0; x < result.rows.length; x++) {
              let produto: Produto = new Produto();
              produto.id = result.rows.item(x).id;
              produto.nome = result.rows.item(x).nome;
              produto.estoque = result.rows.item(x).estoque;
              produto.estoqueminimo = result.rows.item(x).estoqueminimo;
              produto.precovenda = result.rows.item(x).precovenda;
              produto.precocompra = result.rows.item(x).precocompra;
              items.push(produto);
            }
          }
          observer.next(items);
          observer.complete();
        })
        .catch(e => {
          console.log("Erro " + e);
          console.log("Errorr " + e);
        });
    }, error => {
      alert("Errorr " + error);
    });

  }

}
