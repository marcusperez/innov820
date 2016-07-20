using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Paylocity.Core.DomainObjects
{
    public class Person
    {
        public string PersonId { get; set; }
        public string ParentPersonId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public decimal RegularPrice   { get; set; }
        public decimal PriceWithDiscount { get; set; }
        public decimal ApplyDiscount { get; set; }
        public decimal TotalCost { get; set; }
        public bool IsDependent
        {
            get
            {
                return !string.IsNullOrEmpty(this.ParentPersonId);
            }
        }
        public List<Person> Dependents { get; set; }
    }
}
