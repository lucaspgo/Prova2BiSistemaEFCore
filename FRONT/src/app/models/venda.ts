import { FormaPagamento } from './forma-pagamento';
import { ItemVenda } from './item-venda';

export interface Venda {
    vendaId?: number;
    criadoEm?: string;
    itens?: ItemVenda[];
    cliente?: string;
    formaPagamento?: FormaPagamento;
    formaPagamentoId?: number;
}
