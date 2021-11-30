using System.Linq;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/categoria")]
    public class CategoriaController : ControllerBase
    {
        private readonly DataContext _context;
        public CategoriaController(DataContext context)
        {
            _context = context;
        }

        //POST: api/categoria/create
        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody] Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            _context.SaveChanges();
            return Created("", categoria);
        }

        //GET: api/categoria/list
        [HttpGet]
        [Route("list")]
        public IActionResult List() => Ok(_context.Categorias.ToList());

    }
}