using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XCore.EmailService;
using XCore.Entities.Models;

namespace XCore.Api.Controllers
{
    [Route("api/email")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailSender _emailSender;
        public EmailController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMail([FromBody] EmailDto emailDto)
        {
            var message = new Message(new string[] { "xcore.web.development@gmail.com" }, null, null, null);

            emailDto.Email = "xcore.web.development@gmail.com";
            emailDto.Content = message.Content;
            emailDto.Subject = message.Subject;
            await _emailSender.SendEmailAsync(message);

            return StatusCode(201);
        }

        /*
        [HttpPost("send")]
        public async Task<IActionResult> SendMail([FromForm] Message message)
        {
            try
            {

                await emailSender.SendEmailAsync(message);
                return Ok();
            }
            catch (Exception ex)
            {
                throw;
            }
        }*/
    }
}
