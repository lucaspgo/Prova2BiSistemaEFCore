using System;
using System.Linq;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/item")]
    public class ItemVendaController : ControllerBase
    {
        private readonly DataContext _context;
        public ItemVendaController(DataContext context)
        {
            _context = context;
        }

        //POST: api/item/create
        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody] ItemVenda item)
        {
            if (String.IsNullOrEmpty(item.CarrinhoId))
            {
                item.CarrinhoId = Guid.NewGuid().ToString();
            }
            item.Produto = _context.Produtos.Find(item.ProdutoId);
            _context.ItensVenda.Add(item);
            _context.SaveChanges();
            return Created("", item);
        }

        // GET: api/item/getbycartid/XXXXX-XXXX-XXXXXXXXXXX
        [HttpGet]
        [Route("getbycartid/{cartid}")]
        public IActionResult GetByCartId([FromRoute] string cartId)
        {
            return Ok(_context.ItensVenda.
                Include(i => i.Produto.Categoria).
                Where(i => i.CarrinhoId == cartId).
                ToList());
        }
    }
}