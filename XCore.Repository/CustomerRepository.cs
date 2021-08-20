using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using XCore.Contracts;
using XCore.Entities;
using XCore.Entities.Models.Rentals;

namespace XCore.Repository
{
    public class CustomerRepository : RepositoryBase<Customer>, ICustomerRepository
    {
        public CustomerRepository(XCoreDbContext xcoreDbContext)
          : base(xcoreDbContext)
        {
        }

        public async Task<IEnumerable<Customer>> GetCustomersAsync(
          bool trackChanges)
        {
            return (IEnumerable<Customer>)await this.FindAll(trackChanges).OrderBy<Customer, string>((Expression<Func<Customer, string>>)(c => c.LastName)).ToListAsync<Customer>();
        }

        public async Task<Customer> GetCustomerAsync(int customerId, bool trackChanges) => await this.FindByCondition((Expression<Func<Customer, bool>>)(c => c.CustomerId.Equals(customerId)), (trackChanges ? 1 : 0) != 0).SingleOrDefaultAsync<Customer>();

        public void CreateCustomer(Customer customer) => this.Create(customer);

        public void UpdateCustomer(Customer customer) => this.Update(customer);

        public void DeleteCustomer(Customer customer) => this.Delete(customer);
    }
}
