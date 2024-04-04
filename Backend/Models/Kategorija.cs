using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Kategorija: Entitet
    {
        public string? Naziv { get; set; }
        public DateTime? VrijediOd { get; set; }

    }
}
