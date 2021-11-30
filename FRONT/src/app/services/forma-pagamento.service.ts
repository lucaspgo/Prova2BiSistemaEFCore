import { FormaPagamento } from './../models/forma-pagamento';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class FormaPagamentoService {
    private baseUrl = "http://localhost:5000/api/formapagamento";

    constructor(private http: HttpClient) {}

    list(): Observable<FormaPagamento[]> {
        return this.http.get<FormaPagamento[]>(`${this.baseUrl}/list`);
    }
    create(formapagamento: FormaPagamento): Observable<FormaPagamento> {
        return this.http.post<FormaPagamento>(`${this.baseUrl}/create`, formapagamento);
    }
}    