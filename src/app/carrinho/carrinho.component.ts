import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})

export class CarrinhoComponent implements OnInit {

  itensDoCarrinho: IProdutoCarrinho[] = [];
  total = 0;

  constructor(
    public carrinho: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itensDoCarrinho = this.carrinho.obtemCarrinho();
    this.calcularTotal();
  }


  calcularTotal() {
    this.total = this.itensDoCarrinho.reduce((prev, curr) => prev + (curr.preco * curr.quantidade), 0);
  }

  removerProduto(produtoId: number) {
    this.itensDoCarrinho = this.itensDoCarrinho.filter(item => item.id !== produtoId);
    this.carrinho.removerProduto(produtoId);
    this.calcularTotal();
  }

  comprar() {
    alert("Parabéns, você finalizau a sua compra");
    this.carrinho.limparCarrinho();
    this.router.navigate(["produtos"]);
  }
}
