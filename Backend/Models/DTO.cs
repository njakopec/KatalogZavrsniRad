﻿
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public record KategorijaDTORead(int Sifra, string Naziv, DateTime? VrijediOd);
    public record KategorijaDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")] string Naziv, 
        
        DateTime? VrijediOd);
    public record ProizvodDTORead( int Sifra, string? Naziv, string? KategorijaNaziv, int? Tezina, decimal? Cijena, string? slika);
    public record ProizvodDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
        string? Naziv,
        [Required(ErrorMessage = "Kategorija obavezno")]
        int KategorijaSifra,
        [Required(ErrorMessage = "Težina obavezno")]
        [Range(0, 500, ErrorMessage = "Vrijednost {0} mora biti između {1} i {2}")]
        int? Tezina,
        [Required(ErrorMessage = "Cijena obavezno")]
        [Range(0, 20, ErrorMessage = "Vrijednost {0} mora biti između {1} i {2}")]
        decimal? Cijena);

     public record SlikaDTO([Required(ErrorMessage = "Base64 zapis slike obavezno")] string Base64);
}
