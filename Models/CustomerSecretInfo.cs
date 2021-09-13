using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UnversityApp.Model
{
    public class CustomerSecretInfo
    {
        [Key]
        public int Id { get; set; }

        public string CustomerName { get; set; }

        public string CarModel { get; set; }

        public int Quantity { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal TotalPrice { get; set; }


        public string CrediCardNumber { get; set; }

        public string Cvv { get; set; }

        [NotMapped]
        public string iVBase64 { get; set; }
        [NotMapped]
        public string Key { get; set; }
    }

}