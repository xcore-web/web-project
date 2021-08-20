using System.Threading.Tasks;
using XCore.Contracts;
using XCore.Entities;

namespace XCore.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private XCoreDbContext _xCoreDbContext;
        private ICategoryRepository _categoryRepository;
        private ICustomerRepository _customerRepository;
        private IMediaRepository _mediaRepository;
        private IRentalRepository _rentalRepository;

        public RepositoryManager(XCoreDbContext xCoreDbContext) => this._xCoreDbContext = xCoreDbContext;

        public ICategoryRepository Category
        {
            get
            {
                if (this._categoryRepository == null)
                    this._categoryRepository = (ICategoryRepository)new CategoryRepository(this._xCoreDbContext);
                return this._categoryRepository;
            }
        }

        public ICustomerRepository Customer
        {
            get
            {
                if (this._customerRepository == null)
                    this._customerRepository = (ICustomerRepository)new CustomerRepository(this._xCoreDbContext);
                return this._customerRepository;
            }
        }

        public IMediaRepository Media
        {
            get
            {
                if (this._mediaRepository == null)
                    this._mediaRepository = (IMediaRepository)new MediaRepository(this._xCoreDbContext);
                return this._mediaRepository;
            }
        }

        public IRentalRepository Rental
        {
            get
            {
                if (this._rentalRepository == null)
                    this._rentalRepository = (IRentalRepository)new RentalRepository(this._xCoreDbContext);
                return this._rentalRepository;
            }
        }

        public async Task SaveAsync()
        {
            int num = await this._xCoreDbContext.SaveChangesAsync();
        }
    }
}
