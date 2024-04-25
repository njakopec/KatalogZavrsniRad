using AutoMapper;
using Backend.Models;

namespace Backend.Mappers
{
    public class MappingProizvod : Mapping<Proizvod, ProizvodDTORead, ProizvodDTOInsertUpdate>
    {

        public MappingProizvod()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c =>{
                c.CreateMap<Proizvod, ProizvodDTORead>()
                .ConstructUsing(entitet =>
                 new ProizvodDTORead(
                    entitet.Sifra,
                    entitet.Naziv,
                    entitet.Kategorija.Naziv,
                    entitet.Tezina,
                    entitet.Cijena,
                     PutanjaDatoteke(entitet)));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c =>{
                    c.CreateMap<ProizvodDTOInsertUpdate, Proizvod>();
                }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c =>{
                 c.CreateMap<Proizvod, ProizvodDTOInsertUpdate>()
                 .ConstructUsing(entitet =>
                  new ProizvodDTOInsertUpdate(
                     entitet.Naziv,
                     entitet.Kategorija.Sifra,
                     entitet.Tezina,
                     entitet.Cijena));
             }));
        }

        private static string PutanjaDatoteke(Proizvod e)
        {
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string slika = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds + "proizvodi" + ds + e.Sifra + ".png");
                return File.Exists(slika) ? "/slike/proizvodi/" + e.Sifra + ".png" : null;
            }
            catch
            {
                return null;
            }

        }



    }
}
