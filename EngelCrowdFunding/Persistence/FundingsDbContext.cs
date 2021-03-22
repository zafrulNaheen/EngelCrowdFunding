using EngelCrowdFunding;
using EngelCrowdFunding.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
namespace Funding.Persistence
{
    public class FundingsDbContext : DbContext
    {
        public DbSet<EngelFunding> Fundings { get; set; }
        public DbSet<FundingAmount> Amounts { get; set; }
        public DbSet<Investor> Users { get; set; }

        public FundingsDbContext(DbContextOptions options) : base(options)
        {
            FundingsList();
            InvestorList();
        }




        public void FundingsList()
        {
            EngelFunding funding = new EngelFunding() {

                 Id = Guid.NewGuid(),

                 Date = DateTime.Now.Date,

                 ProjectName = "Project at Treptower Park",

                 Area =70,

                 Description = "Deucthland, Berlin Spandau",

                 PurchasePrice = 250000
            };

            Fundings.Add(funding);

            EngelFunding funding1 = new EngelFunding()
            {
                Id = Guid.NewGuid(),

                Date = DateTime.Now.Date.AddDays(-5),

                ProjectName = "Project at Am Gemainde Park",

                Area = 80,

                Description = "Deucthland, Berlin Steglitz",

                PurchasePrice = 250000
            };

            Fundings.Add(funding1);

            EngelFunding funding2 = new EngelFunding()
            {
                Id = Guid.NewGuid(),

                Date = DateTime.Now.Date.AddDays(-7),

                ProjectName = "Project at Volks Park",

                Area = 65,

                Description = "Deucthland, Berlin, Wedding",

                PurchasePrice = 250000
            };

            Fundings.Add(funding2);

            EngelFunding funding3 = new EngelFunding()
            {
                Id = Guid.NewGuid(),

                Date = DateTime.Now.Date.AddDays(-15),

                ProjectName = "Project at Schillers Park",

                Area = 88,

                Description = "Deucthland, Berlin, Wedding",

                PurchasePrice = 250000
            };

            Fundings.Add(funding3);

        }

        public void InvestorList()
        {
            Investor user = new Investor()
            {

                Id = Guid.NewGuid(),

                FirstName ="Microsoft"
            };

            Users.Add(user);

            user = new Investor()
            {

                Id = Guid.NewGuid(),

                FirstName = "Amazon"
            };

            Users.Add(user);

             user = new Investor()
            {

                Id = Guid.NewGuid(),

                FirstName = "Google"
            };

            Users.Add(user);



        }


        public List<EngelFunding> GetFundings()
        {
            return Fundings.Local.ToList<EngelFunding>();
        }

        public List<Investor> GetUsers()
        {
            return Users.Local.ToList<Investor>();
        }

        public FundingAmount AddFunding(FundingAmount fa)
        {
            if (CheckDuplicateAmountForInvestor(fa) != null)
                throw new Exception($" Duplicate amount {fa.Amount} found with same investor {fa.InvestorId}");
            
            FundingAmount funding = new FundingAmount
            {
                Id = Guid.NewGuid(),
                FundingId = fa.FundingId,
                Amount = Convert.ToDouble(fa.Amount),
                InvestorId = fa.InvestorId
            };
            Amounts.Add(funding);

            return funding;
        }

        private FundingAmount CheckDuplicateAmountForInvestor(FundingAmount fa)
        {
            return Amounts.Where(x => x.Amount == fa.Amount
                                        && x.InvestorId == fa.InvestorId
                                        && x.FundingId == fa.FundingId).SingleOrDefault();
           
        }
    }
}
