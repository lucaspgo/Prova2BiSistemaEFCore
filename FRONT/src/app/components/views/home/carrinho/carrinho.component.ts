import { VendaService } from "./../../../../services/venda.service";
import { Venda } from "src/app/models/venda";
import { Component, OnInit } from "@angular/core";
import { ItemVenda } from "src/app/models/item-venda";
import { Router } from "@angular/router";
import { ItemService } from "src/app/services/item.service";
import { FormaPagamentoService } from "src/app/services/forma-pagamento.service";
import { FormaPagamento } from "src/app/models/forma-pagamento";

@Component({
    selector: "app-carrinho",
    templateUrl: "./carrinho.component.html",
    styleUrls: ["./carrinho.component.css"],
})
export class CarrinhoComponent implements OnInit {
    itens: ItemVenda[] = [];
    colunasExibidas: String[] = ["nome", "preco", "quantidade", "imagem"];
    valorTotal!: number;
    cliente!: string;
    formaPagamentoId!: number;
    formasPagamento!: FormaPagamento[];

    constructor(
        private itemService: ItemService,
        private vendaService: VendaService,
        private router: Router,
        private formaPagamentoService: FormaPagamentoService
    ) {}

    ngOnInit(): void {
        let carrinhoId = localStorage.getItem("carrinhoId")! || "";
        this.itemService.getByCartId(carrinhoId).subscribe((itens) => {
            this.itens = itens;
            this.valorTotal = this.itens.reduce((total, item) => {
                return total + item.preco * item.quantidade;
            }, 0);
        });

        this.formaPagamentoService.list().subscribe((formasPagamento)=>{
            this.formasPagamento = formasPagamento;
          });
    }
    cadastrar(): void {
        let venda: Venda = {
            itens: this.itens,
            cliente: this.cliente,
            formaPagamentoId: this.formaPagamentoId
        };
        console.log(venda);
        this.vendaService.create(venda).subscribe((venda) => {
            console.log(venda);
            this.router.navigate(["venda/listar"]);
        });
    }
}
