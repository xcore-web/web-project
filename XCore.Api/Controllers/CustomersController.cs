using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XCore.Contracts;
using XCore.Entities;
using XCore.Entities.DataTransferObjects.Customers;
using XCore.Entities.Models.Rentals;

namespace XCore.Api.Controllers
{
    [Route("api/customers")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly XCoreDbContext _context;
        private readonly ILoggerManager _loggerManager;
        private readonly IMapper _mapper;

        public CustomersController(IRepositoryManager repository, XCoreDbContext context, ILoggerManager loggerManager, IMapper mapper)
        {
            _repository = repository;
            _context = context;
            _loggerManager = loggerManager;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetCustomers()
        {
            // Variable holding all customers from database table
            var customers = await _repository.Customer.GetCustomersAsync(trackChanges: false);

            // Map data transfer object to model 
            var customersDto = _mapper.Map<IEnumerable<CustomerDto>>(customers);

            return Ok(customersDto);
        }

        [HttpGet("{customerId}")]
        public async Task<IActionResult> GetCustomer(int customerId)
        {
            // Variable holding selected customer by id
            var customer = await _repository.Customer.GetCustomerAsync(customerId, trackChanges: false);

            // Check if the customerId exist in the database, return message if it is not found (Error Handler)
            // If it exist map data transfer object to model.
            if (customer == null)
            {
                _loggerManager.LogInfo($"Customer with id: {customerId} doesn't exist in the database.");
                return NotFound();
            }
            else
            {
                var customerDto = _mapper.Map<CustomerDto>(customer);
                return Ok(customerDto);
            }
        }

        [HttpPost]
        public async Task<ActionResult<CustomerForCreationDto>> CreateCustomer([FromBody] CustomerForCreationDto customer)
        {
            // Variable holding mapped entity to data transfer object
            var customerEntity = _mapper.Map<Customer>(customer);

            // Create new customer, then save it to the database
            _repository.Customer.CreateCustomer(customerEntity);
            await _repository.SaveAsync();

            return CreatedAtAction("CreateCustomer", new { customerId = customerEntity.CustomerId }, customerEntity);
        }

        [HttpPut("{customerId:int}")]
        public async Task<ActionResult> UpdateCustomer(int customerId, [FromBody] CustomerForUpdateDto customer)
        {
            // Map data transfer object to entity, then save changes
            var model = _mapper.Map<Customer>(customer);

            // Set selected customerId
            model.CustomerId = customerId;
            _context.Entry(model).State = EntityState.Modified;

            // Save changes to database
            await _repository.SaveAsync();

            return NoContent();
        }

        [HttpDelete("{customerId}")]
        public async Task<IActionResult> DeleteCustomer(int customerId)
        {
            var customer = await _repository.Customer.GetCustomerAsync(customerId, trackChanges: false);

            if (customer == null)
            {
                _loggerManager.LogError($"Customer with id: {customerId} doesn't exist in the database");
                return NotFound();
            }

            _repository.Customer.DeleteCustomer(customer);
            await _repository.SaveAsync();

            return NoContent();
        }
    }
}
