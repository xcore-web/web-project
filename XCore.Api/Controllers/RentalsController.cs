using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using XCore.Contracts;
using XCore.Entities;
using XCore.Entities.DataTransferObjects.Categories;
using XCore.Entities.DataTransferObjects.Customers;
using XCore.Entities.DataTransferObjects.Medias;
using XCore.Entities.DataTransferObjects.Rentals;
using XCore.Entities.Models.Rentals;

namespace XCore.Api.Controllers
{
    [Route("api/rentals")]
    [ApiController]
    public class RentalsController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly XCoreDbContext _context;
        private readonly ILoggerManager _loggerManager;
        private readonly IMapper _mapper;

        public RentalsController(IRepositoryManager repository, XCoreDbContext context, ILoggerManager loggerManager, IMapper mapper)
        {
            _repository = repository;
            _context = context;
            _loggerManager = loggerManager;
            _mapper = mapper;
        }

        // GET: api/rentals
        [HttpGet]
        public async Task<IActionResult> GetRentals()
        {
            // Variable holding all rentals from database table
            var rentals = await _repository.Rental.GetRentalsAsync(trackChanges: false);

            // Map data transfer object to model 
            var rentalsDto = _mapper.Map<IEnumerable<RentalDto>>(rentals);

            return Ok(rentalsDto);
        }

        // GET: api/rentals/5
        [HttpGet("{rentalId}")]
        public async Task<IActionResult> GetRental(int rentalId)
        {
            // Variable holding selected rental by id
            var rental = await _repository.Rental.GetRentalAsync(rentalId, trackChanges: false);

            // Check if the rentalId exist in the database, return message if it is not found (Error Handler)
            // If it exist map data transfer object to model.
            if (rental == null)
            {
                _loggerManager.LogInfo($"Rental with id: {rentalId} doesn't exist in the database.");
                return NotFound();
            }
            else
            {
                var rentalDto = _mapper.Map<RentalDto>(rental);
                return Ok(rentalDto);
            }
        }

        // POST: api/rentals
        [HttpPost]
        public async Task<ActionResult<RentalForCreationDto>> CreateRental([FromBody] RentalForCreationDto rental)
        {
            // Variable holding mapped entity to data transfer object
            var rentalEntity = _mapper.Map<Rental>(rental);

            // Create new rental, then save it to the database
            _repository.Rental.CreateRental(rentalEntity);
            await _repository.SaveAsync();

            return CreatedAtAction("CreateRental", new { RentalId = rentalEntity.RentalId }, rentalEntity);
        }

        // PUT: api/rentals/5
        [HttpPut("{rentalId:int}")]
        public async Task<ActionResult> UpdateRental(int rentalId, [FromBody] RentalForUpdateDto rental)
        {
            // Map data transfer object to entity, then save changes
            var model = _mapper.Map<Rental>(rental);

            // Set selected rentalId
            model.RentalId = rentalId;
            _context.Entry(model).State = EntityState.Modified;

            // Save changes to database
            await _repository.SaveAsync();

            return NoContent();
        }

        // DELETE: api/rentals/5
        [HttpDelete("{rentalId}")]
        public async Task<IActionResult> DeleteRental(int rentalId)
        {
            var rental = await _repository.Rental.GetRentalAsync(rentalId, trackChanges: false);

            if (rental == null)
            {
                _loggerManager.LogError($"Rental with id: {rentalId} doesn't exist in the database");
                return NotFound();
            }

            _repository.Rental.DeleteRental(rental);
            await _repository.SaveAsync();

            return NoContent();
        }

        // GET: api/rentals/customers
        [HttpGet("customers")]
        public async Task<IActionResult> GetCustomers()
        {
            // Variable holding all customers from database table
            var customers = await _repository.Customer.GetCustomersAsync(trackChanges: false);

            // Map data transfer object to model 
            var customersDto = _mapper.Map<IEnumerable<CustomerDto>>(customers);

            return Ok(customersDto);
        }

        // GET: api/rentals/medias
        [HttpGet("medias")]
        public async Task<IActionResult> GetMedias()
        {
            // Variable holding all medias from database table
            var medias = await _repository.Media.GetMediasAsync(trackChanges: false);

            // Map data transfer object to model 
            var mediasDto = _mapper.Map<IEnumerable<MediaDto>>(medias);

            return Ok(mediasDto);
        }

        // GET: api/rentals/categories
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            // Variable holding all categories from database table
            var categories = await _repository.Category.GetCategoriesAsync(trackChanges: false);

            // Map data transfer object to model 
            var categoriesDto = _mapper.Map<IEnumerable<CategoryDto>>(categories);

            return Ok(categoriesDto);
        }
    }
}
