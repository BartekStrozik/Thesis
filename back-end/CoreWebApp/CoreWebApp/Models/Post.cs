using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Post
    {
        public int id { get; set; }
        public string topic { get; set; }
        public string content { get; set; }
        public string src { get; set; }
        public int userId { get; set; }
        public string place { get; set; }
        public string date { get; set; }
    }
}