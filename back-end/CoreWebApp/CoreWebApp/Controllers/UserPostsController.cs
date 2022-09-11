using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;

namespace CoreWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserPostsController : Controller
    {

        private readonly IConfiguration configuration;

        private string connectionString;
        public UserPostsController(IConfiguration configuration)
        {
            this.configuration = configuration;
            this.connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }

        public string ConvertDatatableToXML(DataTable dt)
        {
            MemoryStream str = new MemoryStream();
            dt.WriteXml(str, true);
            str.Seek(0, SeekOrigin.Begin);
            StreamReader sr = new StreamReader(str);
            string xmlstr;
            xmlstr = sr.ReadToEnd();
            return (xmlstr);
        }

        // GET: UserPosts/id
        [HttpGet("{userId:int}")]
        public async Task<IActionResult> Get(int userId)
        {
            try
            {
                string query = @"
                    SELECT id, topic, content, src, userId, place, date
                    FROM dbo.Post
                    WHERE userId = '" + userId + @"'
                ";
                DataTable table = new DataTable();
                table.TableName = "Post";
                table = CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

                JToken docElement = CoreWebApp.Utils.DataConverter.Convert(table);
                return Ok(docElement["Post"].ToString());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
