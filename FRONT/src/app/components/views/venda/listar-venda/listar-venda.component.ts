import { VendaService } from './../../../../services/venda.service';
import { Venda } from 'src/app/models/venda';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-venda',
  templateUrl: './listar-venda.component.html',
  styleUrls: ['./listar-venda.component.css']
})
export class ListarVendaComponent implements OnInit {
  vendas: Venda[] = [];
  colunasExibidas: String[] = [
      "id",
      "cliente",
      "itens",
      "categoria",
      "formaPagamento",
  ];

  constructor(private service: VendaService) {}

  ngOnInit(): void {
      this.service.list().subscribe((vendas) => {
          this.vendas = vendas;
      });
  }
}
