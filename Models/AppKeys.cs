using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UnversityApp.Model
{
    
    [NotMapped]
    public class AppKeys
    {

        public string iVBase64 { get; set; }

        public string Key { get; set; }

    }

}