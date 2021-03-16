using System;

namespace EngelCrowdFunding
{
    public class EngelFunding
    {
        public Guid Id { get; set; }

        public DateTime Date { get; set; }

        public string ProjectName { get; set; }

        public int Area { get; set; }

        public string Description { get; set; }

        public double PurchasePrice { get; set; }

    }
}
