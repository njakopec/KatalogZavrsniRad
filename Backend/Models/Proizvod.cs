using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Proizvod: Entitet
    {
        public string? Naziv { get; set; }
        public decimal? Tezina { get; set; }
        public decimal? Cijena { get; set; }
        [ForeignKey("kategorija")]
        public required Kategorija Kategorija { get; set; }

    }
}
