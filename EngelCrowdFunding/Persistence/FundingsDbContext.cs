﻿using EngelCrowdFunding;
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

        public FundingsDbContext(DbContextOptions options) : base(options)
        {
            FundingsList();
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

        public List<EngelFunding> GetFundings()
        {
            return Fundings.Local.ToList<EngelFunding>();
        }

        public void AddFunding(FundingAmount fa)
        {
            Amounts.Add(new FundingAmount
            {
                Id= Guid.NewGuid(),
                FundingId = fa.FundingId,
                Amount = Convert.ToDouble(fa.Amount)
            });


        }
    }
}
