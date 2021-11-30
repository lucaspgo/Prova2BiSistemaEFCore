import { Categoria } from "./categoria";

export interface Produto {
    produtoId?: number;
    nome: string;
    descricao: string;
    quantidade: number;
    preco: number;
    criadoem?: string;
    categoriaId: number;
    categoria?: Categoria;
}
