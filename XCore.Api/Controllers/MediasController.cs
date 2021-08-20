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
using XCore.Entities.DataTransferObjects.Medias;
using XCore.Entities.Models.Rentals;

namespace XCore.Api.Controllers
{
    [Route("api/medias")]
    [ApiController]
    public class MediasController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly XCoreDbContext _context;
        private readonly ILoggerManager _loggerManager;
        private readonly IMapper _mapper;

        public MediasController(IRepositoryManager repository, XCoreDbContext context, ILoggerManager loggerManager, IMapper mapper)
        {
            _repository = repository;
            _context = context;
            _loggerManager = loggerManager;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetMedias()
        {
            // Variable holding all medias from database table
            var medias = await _repository.Media.GetMediasAsync(trackChanges: false);

            // Map data transfer object to model 
            var mediasDto = _mapper.Map<IEnumerable<MediaDto>>(medias);

            return Ok(mediasDto);
        }

        [HttpGet("{mediaId}")]
        public async Task<IActionResult> GetMedia(int mediaId)
        {
            // Variable holding selected media by id
            var media = await _repository.Media.GetMediaAsync(mediaId, trackChanges: false);

            // Check if the categoryId exist in the database, return message if it is not found (Error Handler)
            // If it exist map data transfer object to model.
            if (media == null)
            {
                _loggerManager.LogInfo($"Media with id: {mediaId} doesn't exist in the database.");
                return NotFound();
            }
            else
            {
                var mediaDto = _mapper.Map<MediaDto>(media);
                return Ok(mediaDto);
            }
        }

        [HttpPost]
        public async Task<ActionResult<MediaForCreationDto>> CreateMedia([FromBody] MediaForCreationDto media)
        {
            // Variable holding mapped entity to data transfer object
            var mediaEntity = _mapper.Map<Media>(media);

            // Create new media, then save it to the database
            _repository.Media.CreateMedia(mediaEntity);
            await _repository.SaveAsync();

            return CreatedAtAction("CreateMedia", new { mediaId = mediaEntity.MediaId }, mediaEntity);
        }

        [HttpPut("{mediaId:int}")]
        public async Task<ActionResult> UpdateMedia(int mediaId, [FromBody] MediaForUpdateDto media)
        {
            // Map data transfer object to entity, then save changes
            var model = _mapper.Map<Media>(media);

            // Set selected mediaId
            model.MediaId = mediaId;
            _context.Entry(model).State = EntityState.Modified;

            // Save changes to database
            await _repository.SaveAsync();

            return NoContent();
        }

        [HttpDelete("{mediaId}")]
        public async Task<IActionResult> DeleteMedia(int mediaId)
        {
            var media = await _repository.Media.GetMediaAsync(mediaId, trackChanges: false);

            if (media == null)
            {
                _loggerManager.LogError($"Media with id: {mediaId} doesn't exist in the database");
                return NotFound();
            }

            _repository.Media.DeleteMedia(media);
            await _repository.SaveAsync();

            return NoContent();
        }

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
