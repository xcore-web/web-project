using System;

namespace XCore.Entities.DataTransferObjects.Messages
{
    public class MessageDto
    {
        public int Id { get; set; }

        public DateTime Created { get; set; }

        public string MessageName { get; set; }

        public string UserName { get; set; }
    }
}
