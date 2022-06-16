using CoreWebApp.Models;
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
    public class CommentController : Controller
    {
        private readonly IConfiguration configuration;

        private string connectionString;
        public CommentController(IConfiguration configuration)
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

        // GET: Comment/id
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                string query = @"
                   SELECT id, body, postId, username, userId, createdAt
                   FROM dbo.Comment
                   WHERE postId = '" + id + @"'
                ";
                DataTable table = new DataTable();
                table.TableName = "Comment";
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
                string result = docElement["Comment"].ToString();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // this can be something like 
            }
        }

        // GET: Comment
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                string query = @"
                    SELECT id, body, postId, username, userId, createdAt
                    FROM dbo.Comment
                ";
                DataTable table = new DataTable();
                table.TableName = "Comment";
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
                string result = docElement["Comment"].ToString();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // this can be something like 
            }
        }

        // POST: Comment
        [HttpPost]
        public async Task<ActionResult<Comment>> Create([FromBody] Comment comment)
        {
            try
            {

                string query = @"
                    INSERT INTO dbo.Comment VALUES
                    ('" + comment.body + @"',
                    '" + comment.postId + @"',
                    '" + comment.username + @"',
                    '" + comment.userId + @"',
                    '" + comment.createdAt + @"')
                ";

                DataTable table = new DataTable();
                table.TableName = "Comment";
                using (var con = new SqlConnection(this.connectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                var message = "Added!!";
                return Ok(message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
