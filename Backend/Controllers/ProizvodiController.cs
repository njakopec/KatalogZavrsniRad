using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Backend.Mappers;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProizvodiController : EdunovaController<Proizvod, ProizvodDTORead, ProizvodDTOInsertUpdate>
    {
        public ProizvodiController(EdunovaContext context) : base(context)
        {
            DbSet = _context.Proizvodi;
            _mapper = new MappingProizvod();
        }

        protected override List<ProizvodDTORead> UcitajSve()
        {
            var lista = DbSet?.Include(p=>p.Kategorija).ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }
        protected override Proizvod NadiEntitet(int sifra)
        {
            var entitetIzbaze = DbSet?.Include(p => p.Kategorija).FirstOrDefault(p=>p.Sifra==sifra);
            if (entitetIzbaze == null)
            {
                throw new Exception("Ne postoji proizvod s šifrom " + sifra + " u bazi");
            }

            return entitetIzbaze;
        }
        protected override Proizvod KreirajEntitet(ProizvodDTOInsertUpdate dto)
        {
            var kategorija = _context.Kategorije.Find(dto.KategorijaSifra) ?? throw new Exception("Ne postoji kategorija s šifrom " + dto.KategorijaSifra + " u bazi");
            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Kategorija = kategorija;
            return entitet;
        }

        protected override Proizvod PromjeniEntitet(ProizvodDTOInsertUpdate dto, Proizvod entitet)
        {
            var kategorija = _context.Kategorije.Find(dto.KategorijaSifra) ?? throw new Exception("Ne postoji kategorija s šifrom " + dto.KategorijaSifra + " u bazi");
            entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Kategorija = kategorija;
            return entitet;
        }
        protected override void KontrolaBrisanje(Proizvod entitet)
        {
        }
    }
}