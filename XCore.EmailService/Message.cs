using Microsoft.AspNetCore.Http;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;

namespace XCore.EmailService
{
    public class Message
    {
        public List<MailboxAddress> To { get; set; }

        public string Subject { get; set; }

        public string Content { get; set; }

        public IFormFileCollection Attachments { get; set; }

        public Message(
          IEnumerable<string> to,
          string subject,
          string content,
          IFormFileCollection attachments)
        {
            this.To = new List<MailboxAddress>();
            this.To.AddRange(to.Select<string, MailboxAddress>((Func<string, MailboxAddress>)(x => new MailboxAddress(x))));
            this.Subject = subject;
            this.Content = content;
            this.Attachments = attachments;
        }
    }
}
