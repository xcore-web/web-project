using System.Threading.Tasks;

namespace XCore.Contracts
{
    public interface IRepositoryManager
    {
        ICategoryRepository Category { get; }

        ICustomerRepository Customer { get; }

        IMediaRepository Media { get; }

        IRentalRepository Rental { get; }

        Task SaveAsync();
    }
}
