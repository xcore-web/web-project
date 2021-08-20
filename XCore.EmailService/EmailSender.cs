using MailKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using MimeKit;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace XCore.EmailService
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailConfiguration _emailConfig;

        public EmailSender(EmailConfiguration emailConfig) => this._emailConfig = emailConfig;

        public void SendEmail(Message message) => this.Send(this.CreateEmailMessage(message));

        public async Task SendEmailAsync(Message message) => await this.SendAsync(this.CreateEmailMessage(message));

        private MimeMessage CreateEmailMessage(Message message)
        {
            MimeMessage mimeMessage = new MimeMessage();
            mimeMessage.From.Add((InternetAddress)new MailboxAddress(this._emailConfig.From));
            mimeMessage.To.AddRange((IEnumerable<InternetAddress>)message.To);
            mimeMessage.Subject = message.Subject;
            BodyBuilder bodyBuilder = new BodyBuilder()
            {
                HtmlBody = string.Format("<h2 style='color:red;'>{0}</h2>", (object)message.Content)
            };
            if (message.Attachments != null && message.Attachments.Any<IFormFile>())
            {
                foreach (IFormFile attachment in (IEnumerable<IFormFile>)message.Attachments)
                {
                    byte[] array;
                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        attachment.CopyTo((Stream)memoryStream);
                        array = memoryStream.ToArray();
                    }
                    bodyBuilder.Attachments.Add(attachment.FileName, array, ContentType.Parse(attachment.ContentType));
                }
            }
            mimeMessage.Body = bodyBuilder.ToMessageBody();
            return mimeMessage;
        }

        private void Send(MimeMessage mailMessage)
        {
            using (SmtpClient smtpClient = new SmtpClient())
            {
                try
                {
                    smtpClient.Connect(this._emailConfig.SmtpServer, this._emailConfig.Port, true, new CancellationToken());
                    smtpClient.AuthenticationMechanisms.Remove("XOAUTH2");
                    smtpClient.Authenticate(this._emailConfig.UserName, this._emailConfig.Password, new CancellationToken());
                    smtpClient.Send(mailMessage, new CancellationToken(), (ITransferProgress)null);
                }
                catch
                {
                    throw;
                }
                finally
                {
                    smtpClient.Disconnect(true, new CancellationToken());
                    smtpClient.Dispose();
                }
            }
        }

        private async Task SendAsync(MimeMessage mailMessage)
        {
            using (SmtpClient client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(this._emailConfig.SmtpServer, this._emailConfig.Port, true, new CancellationToken());
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    await client.AuthenticateAsync(this._emailConfig.UserName, this._emailConfig.Password, new CancellationToken());
                    await client.SendAsync(mailMessage, new CancellationToken(), (ITransferProgress)null);
                }
                catch
                {
                    throw;
                }
                finally
                {
                    await client.DisconnectAsync(true, new CancellationToken());
                    client.Dispose();
                }
            }
        }

        public async Task SendMessageAsync(EmailDto emailDto)
        {
            MimeMessage message = new MimeMessage();
            message.Sender = MailboxAddress.Parse(this._emailConfig.From);
            message.To.Add((InternetAddress)new MailboxAddress("X-Core", "xcore.web.development@gmail.com"));
            message.Subject = emailDto.Subject;
            BodyBuilder bodyBuilder = new BodyBuilder();
            message.Body = bodyBuilder.ToMessageBody();
            using (SmtpClient smtp = new SmtpClient())
            {
                smtp.Connect(this._emailConfig.SmtpServer, this._emailConfig.Port, SecureSocketOptions.Auto, new CancellationToken());
                smtp.Authenticate(this._emailConfig.From, this._emailConfig.Password, new CancellationToken());
                await smtp.SendAsync(message, new CancellationToken(), (ITransferProgress)null);
                smtp.Disconnect(true, new CancellationToken());
            }
        }
    }
}
