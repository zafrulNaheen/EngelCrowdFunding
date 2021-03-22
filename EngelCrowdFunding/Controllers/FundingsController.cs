using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EngelCrowdFunding.Persistence;
using Funding.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EngelCrowdFunding.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FundingsController : ControllerBase
    {
        private readonly ILogger<FundingsController> _logger;
        private readonly FundingsDbContext fundingsDb;

        public FundingsController(ILogger<FundingsController> logger, FundingsDbContext context)
        {
            _logger = logger;
            fundingsDb = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<EngelFunding> fundings = fundingsDb.GetFundings();
            return Ok(fundings);
        }

        [HttpPost]
        public IActionResult Post(FundingAmount fundingAmount)
        {
            fundingsDb.AddFunding(fundingAmount);
            return Ok();
        }
    }
}
