import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { IProdutoCarrinho } from './produtos';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  itens: IProdutoCarrinho[] = [];
  constructor() { }

  obtemCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    return carrinho;
  }

  adicionarAoCarrinho(produto: IProdutoCarrinho) {
    this.itens.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(this.itens));
  }
  
  limparCarrinho() {
    this.itens = [];
    localStorage.clear();
  }
  
  removerProduto(produtoId: number) {
    this.itens = this.itens.filter(item => item.id !== produtoId);
    localStorage.setItem("carrinho", JSON.stringify(this.itens));
  }

}
