import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ItemVenda } from "src/app/models/item-venda";
import { Produto } from "src/app/models/produto";
import { ItemService } from "src/app/services/item.service";
import { ProdutoService } from "src/app/services/produto.service";

@Component({
    selector: "app-index",
    templateUrl: "./index.component.html",
    styleUrls: ["./index.component.css"],
})
export class IndexComponent implements OnInit {
    produtos: Produto[] = [];

    constructor(
        private produtoService: ProdutoService,
        private itemService: ItemService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.produtoService.list().subscribe((produtos) => {
            this.produtos = produtos;
        });
    }

    adicionar(produto: Produto): void {
        let item: ItemVenda = {
            produto: produto,
            produtoId: produto.produtoId!,
            quantidade: 1,
            preco: produto.preco,
            carrinhoId: localStorage.getItem("carrinhoId")! || "",
        };
        this.itemService.create(item).subscribe((item) => {
            localStorage.setItem("carrinhoId", item.carrinhoId);
            this.router.navigate(["home/carrinho"]);
        });
    }
}
