using Paylocity.Core.DomainObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Paylocity.Core.BusinessLogicLayer
{
    public class DiscountBO
    {
        public Person ApplyDiscount(Person person) {
            if (person.FirstName.ToLower().StartsWith("a"))
            {
                person.ApplyDiscount = 0.10m;
            }
            else
            {
                person.ApplyDiscount = 0;
            }

            return person;
        }

    }
}
