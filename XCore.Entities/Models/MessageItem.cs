using System;

namespace XCore.Entities.Models
{
    public class MessageItem
    {
        public int Id { get; set; }

        public DateTime Created { get; set; }

        public string MessageName { get; set; }

        public string UserName { get; set; }
    }
}
