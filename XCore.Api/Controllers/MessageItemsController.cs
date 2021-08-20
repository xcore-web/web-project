using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using XCore.Contracts;
using XCore.Entities;
using XCore.Entities.DataTransferObjects.Messages;
using XCore.Entities.Models;

namespace XCore.Api.Controllers
{
    [Route("api/message-items")]
    [ApiController]
    public class MessageItemsController : ControllerBase
    {
        private readonly XCoreDbContext _context;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;

        public MessageItemsController(XCoreDbContext context, ILoggerManager logger, IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        // api/message-items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessages()
        {
            try
            {
                var messages = await _context.MessageItems.ToListAsync();
                return _mapper.Map<List<MessageDto>>(messages);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong in the {nameof(GetMessages)} action {ex}");
                return StatusCode(500, "Internal server error");
            }
        }

        // api/message-items/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<MessageDto>> GetMessage(int id)
        {
            var message = await _context.MessageItems.FindAsync(id);

            if (message == null)
            {
                _logger.LogError($"Message with id: {id} doesn't exist in the database");
                return NotFound();
            }
            else
            {
                return _mapper.Map<MessageDto>(message);
            }
        }

        // api/message-items
        [HttpPost]
        public async Task<ActionResult> CreateMessage([FromBody] MessageCreationDto messageCreationDto)
        {
            if (messageCreationDto == null)
            {
                _logger.LogError("MessageCreationDto object sent from client is null.");
                return BadRequest("MessageCreationDto object is null.");
            }

            var message = _mapper.Map<MessageItem>(messageCreationDto);

            await _context.AddAsync(message);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // api/message-items/5
        [HttpPut("{id:int}")]
        public async Task<ActionResult> EditMessage(int id, [FromForm] MessageCreationDto messageCreationDto)
        {
            var message = await _context.MessageItems.FirstOrDefaultAsync(x => x.Id == id);

            if (message == null)
            {
                _logger.LogError($"Message with id: {id} doesn't exist in the database");
                return NotFound();
            }

            message = _mapper.Map(messageCreationDto, message);

            await _context.SaveChangesAsync();
            return NoContent();
        }



        // api/message-items/5
        [HttpDelete]
        public async Task<ActionResult> DeleteMessage(int id)

        {
            var message = await _context.MessageItems.FirstOrDefaultAsync(x => x.Id == id);

            if (message == null)
            {
                _logger.LogError($"Message with id: {id} doesn't exist in the database");
                return NotFound();
            }

            _context.Remove(message);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
