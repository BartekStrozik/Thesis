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
                    SELECT Id, Topic, Content, Src, UserId
                    FROM dbo.Post
                    WHERE UserId = '" + userId + @"'
                ";
                DataTable table = new DataTable();
                table.TableName = "Post";
                using (var con = new SqlConnection(this.connectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                var xmlStr = ConvertDatatableToXML(table);

                XmlDocument doc = new XmlDocument();
                doc.LoadXml(xmlStr);
                string jsonText = JsonConvert.SerializeXmlNode(doc);

                JObject data = JObject.Parse(jsonText);
                JToken docElement = data["DocumentElement"];
                string result = docElement["Post"].ToString();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // this can be something like 
            }
        }
    }
}
