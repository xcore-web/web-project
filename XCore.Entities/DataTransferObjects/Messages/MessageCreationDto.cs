using System;

namespace XCore.Entities.DataTransferObjects.Messages
{
    public class MessageCreationDto
    {
        public DateTime Created { get; set; }

        public string MessageName { get; set; }

        public string UserName { get; set; }
    }
}
