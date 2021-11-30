using System;
using System.Linq;
using API.Data;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/usuario")]
    public class UsuarioController : ControllerBase
    {
        private readonly DataContext _context;
        //Construtor
        public UsuarioController(DataContext context) => _context = context;

        //POST: api/usuario/create
        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody] Usuario usuario)
        {
            Usuario usuarioExistente = _context.Usuarios.FirstOrDefault(u => u.Email == usuario.Email);
            if (usuarioExistente != null)
            {
                return BadRequest(new { message = "Este e-mail já está em uso" });
            }
            _context.Usuarios.Add(usuario);
            _context.SaveChanges();
            usuario.Senha = "";
            return Created("", usuario);
        }

        // GET: api/usuario/login
        [HttpGet]
        [Route("login")]
        public IActionResult Login([FromBody] Usuario usuario)
        {
            usuario = _context.Usuarios.FirstOrDefault
                (u => u.Email == usuario.Email && u.Senha == usuario.Senha);
            if (usuario == null)
            {
                return NotFound(new { message = "Usuário ou senha inválidos" });
            }

            usuario.Token = TokenService.CriarToken(usuario);
            usuario.Senha = "";
            return Ok(usuario);
        }

        // GET: api/usuario/sem
        [HttpGet]
        [Route("sem")]
        [AllowAnonymous]
        public IActionResult Sem()
        {
            return Ok(new { message = "Sem autenticação" });
        }

        // GET: api/usuario/com
        [HttpGet]
        [Route("com")]
        [Authorize]
        public IActionResult Com()
        {
            Usuario usuario = _context.Usuarios.FirstOrDefault(u => u.Email == User.Identity.Name);
            return Ok(new { identity = User.Identity.Name, user = usuario });
        }

        // GET: api/usuario/permissao
        [HttpGet]
        [Route("permissao")]
        [Authorize(Roles = "adm")]
        public IActionResult Permissao()
        {
            return Ok(new { message = "Administrador" });
        }
    }
}