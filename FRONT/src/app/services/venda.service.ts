import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Produto } from "../models/produto";
import { Venda } from "../models/venda";
@Injectable({
    providedIn: "root",
})
export class VendaService {
    private baseUrl = "http://localhost:5000/api/venda";

    constructor(private http: HttpClient) {}

    list(): Observable<Venda[]> {
        return this.http.get<Venda[]>(`${this.baseUrl}/list`);
    }
    create(venda: Venda): Observable<Venda> {
        return this.http.post<Venda>(`${this.baseUrl}/create`, venda);
    }
}