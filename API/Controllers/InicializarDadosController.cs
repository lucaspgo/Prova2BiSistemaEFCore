using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/inicializar")]
    public class InicializarDadosController : ControllerBase
    {
        private readonly DataContext _context;
        public InicializarDadosController(DataContext context)
        {
            _context = context;
        }

        //POST: api/inicializar/create
        [HttpPost]
        [Route("create")]
        public IActionResult Create()
        {
            _context.FormasPagamento.AddRange(new FormaPagamento[]
                {
                    new FormaPagamento { FormaPagamentoId = 1, Nome = "Cartão", NumParcelas = 1},
                    new FormaPagamento { FormaPagamentoId = 2, Nome = "Cartão", NumParcelas = 2},
                    new FormaPagamento { FormaPagamentoId = 3, Nome = "Cartão", NumParcelas = 3},
                    new FormaPagamento { FormaPagamentoId = 4, Nome = "Cartão", NumParcelas = 4},
                    new FormaPagamento { FormaPagamentoId = 5, Nome = "Cartão", NumParcelas = 5},
                    new FormaPagamento { FormaPagamentoId = 6, Nome = "Cartão", NumParcelas = 6},
                }
            );

            _context.Categorias.AddRange(new Categoria[]
                {
                    new Categoria { CategoriaId = 1, Nome = "Banheiro" },
                }
            );

            _context.Produtos.AddRange(new Produto[]
                {
                    new Produto { ProdutoId = 1, Nome = "Pato de Borracha", Preco = 10, Quantidade = 10, CategoriaId = 1 },
                    new Produto { ProdutoId = 2, Nome = "Sabão", Preco = 4, Quantidade = 30, CategoriaId = 1 },
                    new Produto { ProdutoId = 3, Nome = "Esponja", Preco = 5, Quantidade = 20, CategoriaId = 1 },
                }
            );
            _context.SaveChanges();
            return Ok(new { message = "Dados inicializados com sucesso!" });
        }
    }
}