import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Produto } from "../models/produto";

@Injectable({
    providedIn: "root",
})
export class ProdutoService {
    private baseUrl = "http://localhost:5000/api/produto";

    constructor(private http: HttpClient) {}

    list(): Observable<Produto[]> {
        return this.http.get<Produto[]>(`${this.baseUrl}/list`);
    }
    create(produto: Produto): Observable<Produto> {
        return this.http.post<Produto>(`${this.baseUrl}/create`, produto);
    }
}
