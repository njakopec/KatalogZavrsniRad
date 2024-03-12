using EdunovaAPP.Data;
using EdunovaAPP.Models;
using Microsoft.AspNetCore.Mvc;

namespace EdunovaAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KategorijeController
    {
        // Dependency injection
        // Definiraš privatno svojstvo
        private readonly EdunovaContext _context;

        // Dependency injection
        // U konstruktoru primir instancu i dodjeliš privatnom svojstvu
        public KategorijeController(EdunovaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Kategorije.ToList());
        }

        [HttpPost]
        public IActionResult Post(Kategorija kategorija)
        {
            _context.Kategorije.Add(kategorija);
            _context.SaveChanges();
            return new JsonResult(kategorija);
        }

        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Kategorija kategorija)
        {
            var kategorijaIzBaze = _context.Kategorije.Find(sifra);
            // za sada ručno, kasnije će doći Mapper
            kategorijaIzBaze.Naziv = kategorija.Naziv;
            kategorijaIzBaze.VrijediOd= kategorija.VrijediOd;

            _context.Kategorije.Update(kategorijaIzBaze);
            _context.SaveChanges();

            return new JsonResult(kategorijaIzBaze);
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var smjerIzBaze = _context.Kategorije.Find(sifra);
            _context.Kategorije.Remove(smjerIzBaze);
            _context.SaveChanges();
            return new JsonResult(new { poruka="Obrisano"});
        }

    }
}
