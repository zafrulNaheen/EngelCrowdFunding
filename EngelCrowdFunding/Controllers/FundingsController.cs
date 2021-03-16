using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EngelCrowdFunding.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FundingsController : ControllerBase
    {
        private readonly ILogger<FundingsController> _logger;

        public FundingsController(ILogger<FundingsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<EngelFunding> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new EngelFunding
            {
                Date = DateTime.Now.AddDays(index),
                ProjectName = "New Project" + DateTime.Now.AddDays(index),
                Area = index * 9,
                Description = "Description of " + index,
                PurchasePrice = index * 499.5
            }) 
            .ToArray();
        }
    }
}
