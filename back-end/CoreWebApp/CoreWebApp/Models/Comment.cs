using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreWebApp.Models
{
    public class Comment
    {
        public int id { get; set; }
        public string body { get; set; }
        public int postId { get; set; }
        public string username { get; set; }
        public int userId { get; set; }
        public string createdAt { get; set; }
    }
}
