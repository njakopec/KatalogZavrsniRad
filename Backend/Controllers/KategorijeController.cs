using System.Text;
using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KategorijeController : EdunovaController<Kategorija, KategorijaDTORead, KategorijaDTOInsertUpdate>
    {
        public KategorijeController(EdunovaContext context) : base(context)
        {
            DbSet = _context.Kategorije;
        }
        protected override void KontrolaBrisanje(Kategorija entitet)
        {
            var lista = _context.Proizvodi
                .Include(x => x.Kategorija)
                .Where(x => x.Kategorija.Sifra == entitet.Sifra)
                .ToList();
            if (lista != null && lista.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Kategorija se ne može obrisati jer se na njoj nalaze proizvodi: ");
                foreach (var e in lista)
                {
                    sb.Append(e.Naziv).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]); // umjesto sb.ToString().Substring(0, sb.ToString().Length - 2)
            }
        }
    }
}