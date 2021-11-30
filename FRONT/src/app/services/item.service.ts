import { ItemVenda } from "src/app/models/item-venda";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ItemService {
    private baseUrl = "http://localhost:5000/api/item";

    constructor(private http: HttpClient) {}

    create(item: ItemVenda): Observable<ItemVenda> {
        return this.http.post<ItemVenda>(`${this.baseUrl}/create`, item);
    }

    getByCartId(carrinhoId: string): Observable<ItemVenda[]> {
        return this.http.get<ItemVenda[]>(
            `${this.baseUrl}/getbycartid/${carrinhoId}`
        );
    }
}
