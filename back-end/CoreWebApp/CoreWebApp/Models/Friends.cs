using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Friends
    {
        public int id { get; set; }
        public int userId { get; set; }
        public int invitedId { get; set; }
        public int accepted { get; set; }
    }
}
