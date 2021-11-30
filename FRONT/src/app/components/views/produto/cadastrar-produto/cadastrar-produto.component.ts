import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Categoria } from "src/app/models/categoria";
import { Produto } from "src/app/models/produto";
import { CategoriaService } from "src/app/services/categoria.service";
import { ProdutoService } from "src/app/services/produto.service";

@Component({
    selector: "app-cadastrar-produto",
    templateUrl: "./cadastrar-produto.component.html",
    styleUrls: ["./cadastrar-produto.component.css"],
})
export class CadastrarProdutoComponent implements OnInit {
    nome!: string;
    descricao!: string;
    quantidade!: number;
    preco!: number;
    categorias!: Categoria[];
    categoriaId!: number;

    constructor(
        private router: Router,
        private produtoService: ProdutoService,
        private categoriaService: CategoriaService
    ) {}

    ngOnInit(): void {
        this.categoriaService.list().subscribe((categorias) => {
            this.categorias = categorias;
        });
    }

    cadastrar(): void {
        let produto: Produto = {
            nome: this.nome,
            descricao: this.descricao,
            preco: this.preco,
            quantidade: this.quantidade,
            categoriaId: this.categoriaId,
        };
        this.produtoService.create(produto).subscribe((produto) => {
            console.log(produto);
            this.router.navigate(["produto/listar"]);
        });
    }
}
