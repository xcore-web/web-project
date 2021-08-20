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
using XCore.Entities.DataTransferObjects.Categories;
using XCore.Entities.Models.Rentals;

namespace XCore.Api.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly XCoreDbContext _context;
        private readonly ILoggerManager _loggerManager;
        private readonly IMapper _mapper;

        public CategoriesController(IRepositoryManager repository, XCoreDbContext context, ILoggerManager loggerManager, IMapper mapper)
        {
            _repository = repository;
            _context = context;
            _loggerManager = loggerManager;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            // Variable holding all categories from database table
            var categories = await _repository.Category.GetCategoriesAsync(trackChanges: false);

            // Map data transfer object to model 
            var categoriesDto = _mapper.Map<IEnumerable<CategoryDto>>(categories);

            return Ok(categoriesDto);
        }

        [HttpGet("{categoryId}")]
        public async Task<IActionResult> GetCategory(int categoryId)
        {
            // Variable holding selected category by id
            var category = await _repository.Category.GetCategoryAsync(categoryId, trackChanges: false);

            // Check if the categoryId exist in the database, return message if it is not found (Error Handler)
            // If it exist map data transfer object to model.
            if (category == null)
            {
                _loggerManager.LogInfo($"Category with id: {categoryId} doesn't exist in the database.");
                return NotFound();
            }
            else
            {
                var categoryDto = _mapper.Map<CategoryDto>(category);
                return Ok(categoryDto);
            }
        }

        [HttpPost]
        public async Task<ActionResult<CategoryForCreationDto>> CreateCategory([FromBody] CategoryForCreationDto category)
        {
            // Variable holding mapped entity to data transfer object
            var categoryEntity = _mapper.Map<Category>(category);

            // Create new category, then save it to the database
            _repository.Category.CreateCategory(categoryEntity);
            await _repository.SaveAsync();

            return CreatedAtAction("CreateCategory", new { categoryId = categoryEntity.CategoryId }, categoryEntity);
        }

        [HttpPut("{categoryId:int}")]
        public async Task<ActionResult> UpdateCategory(int categoryId, [FromBody] CategoryForUpdateDto category)
        {
            // Map data transfer object to entity, then save changes
            var model = _mapper.Map<Category>(category);

            // Set selected customerId
            model.CategoryId = categoryId;
            _context.Entry(model).State = EntityState.Modified;

            // Save changes to database
            await _repository.SaveAsync();

            return NoContent();
        }

        [HttpDelete("{categoryId}")]
        public async Task<IActionResult> DeleteCategory(int categoryId)
        {
            var category = await _repository.Category.GetCategoryAsync(categoryId, trackChanges: false);

            if (category == null)
            {
                _loggerManager.LogError($"Category with id: {categoryId} doesn't exist in the database");
                return NotFound();
            }

            _repository.Category.DeleteCategory(category);
            await _repository.SaveAsync();

            return NoContent();
        }
    }
}
