﻿
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public record KategorijaDTORead(int Sifra, string Naziv, DateTime? VrijediOd);
    public record KategorijaDTOInsertUpdate([Required(ErrorMessage = "Naziv obavezno")] string Naziv, DateTime? VrijediOd);
    public record ProizvodDTORead( int Sifra, string? Naziv, string? KategorijaNaziv, int? Tezina, decimal? Cijena);
    public record ProizvodDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
        string? Naziv,
        [Required(ErrorMessage = "Kategorija obavezno")]
        int KategorijaSifra,
         int? Tezina, decimal? Cijena);
}