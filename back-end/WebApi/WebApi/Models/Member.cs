using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Member
    {
        public int Id { get; set; }
        public string Nick { get; set; }
        public string Mail { get; set; }
        public string Password { get; set; }
        public string Src { get; set; }
    }
}