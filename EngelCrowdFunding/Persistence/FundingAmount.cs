using System;
namespace EngelCrowdFunding.Persistence
{
    public class FundingAmount
    { 
        public Guid Id { get; set; }

        public Guid FundingId { get; set; }

        public Guid InvestorId { get; set; }

        public double Amount { get; set; }

    }
}
