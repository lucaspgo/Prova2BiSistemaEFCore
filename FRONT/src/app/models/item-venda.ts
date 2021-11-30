import { Produto } from "./produto";

export interface ItemVenda {
    itemVendaId?: number;
    produto: Produto;
    produtoId: number;
    quantidade: number;
    preco: number;
    carrinhoId: string;
    criadoEm?: Date;
}
