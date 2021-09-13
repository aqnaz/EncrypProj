using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using UnversityApp.Encrypt;
using UnversityApp.Model;

namespace UnversityApp.Controllers
{



    [ApiController]
    [Route("[controller]/[action]")]
    [Authorize]
    public class FlowController : ControllerBase
    {

        private readonly ILogger<FlowController> _logger;
        private readonly UniversityAppDbContext _context;

        public FlowController(ILogger<FlowController> logger
            , UniversityAppDbContext context)
        {
            _logger = logger;
            _context = context;
        }


        [HttpPost]
        public async Task<CustomerSecretInfo> Get([FromBody] AppKeys keys)
        {

            try
            {
                var symmetricDecrypt = new SymmetricDecrypt();

                var model = await _context.CustomerSecretInfos
                                           .FirstOrDefaultAsync();

                model.CrediCardNumber = symmetricDecrypt.Decryptor(model.CrediCardNumber, keys.iVBase64, keys.Key);
                model.Cvv = symmetricDecrypt.Decryptor(model.Cvv, keys.iVBase64, keys.Key);


                return model;
            }
            catch (System.Exception)
            {

                throw;
            }

           

        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CustomerSecretInfo info)
        {
            try
            {
                var symmetricEncrypt = new SymmetricEncrypt();
                var (Key, IVBase64) = symmetricEncrypt.InitSymmetricEncryptionKeyIV();


                var model = await _context.CustomerSecretInfos
                                            .FirstOrDefaultAsync();


                var items = new CustomerSecretInfo()
                {

                    CustomerName = this.User.Identity.Name,
                    CarModel = info.CarModel,
                    Quantity = info.Quantity,
                    TotalPrice = info.TotalPrice,
                    CrediCardNumber = symmetricEncrypt.Encrypt(info.CrediCardNumber, IVBase64, Key),
                    Cvv = symmetricEncrypt.Encrypt(info.Cvv, IVBase64, Key),
                    iVBase64 = IVBase64,
                    Key = Key
                };



                if (model == null)
                    _context.CustomerSecretInfos.Add(items);
                else
                {
                    model.CustomerName = this.User.Identity.Name;
                    model.CarModel = items.CarModel;
                    model.CrediCardNumber = items.CrediCardNumber;
                    model.Quantity = items.Quantity;
                    model.TotalPrice = items.TotalPrice;
                    model.Cvv = items.Cvv;


                    _context.CustomerSecretInfos.Update(model);
                }


                await _context.SaveChangesAsync();


                return Ok(items);

            }
            catch (System.Exception)
            {

                throw;
            }


          

        }


    }
}
