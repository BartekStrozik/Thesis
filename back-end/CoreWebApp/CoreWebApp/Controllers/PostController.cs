using CoreWebApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using WebApi.Models;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Xml;
using System.IO;
using System.Xml.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MvCMovie.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : Controller
    {
        private readonly IConfiguration configuration;

        private string connectionString;
        public PostController(IConfiguration configuration)
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

        public JToken ConvertXMLToJToken(string xmlStr)
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(xmlStr);
            string jsonText = JsonConvert.SerializeXmlNode(doc);
            JObject data = JObject.Parse(jsonText);
            return data["DocumentElement"];
        }

        public DataTable ExecuteQuery(string connectionString, DataTable table, string query)
        {
            using (var con = new SqlConnection(this.connectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return table;
        }

        // GET: Post/id
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                string query = @"
                    SELECT topic, content, src, userId, place, date
                    FROM dbo.Post
                    WHERE id = '" + id + @"'
                ";
                DataTable table = new DataTable();
                table.TableName = "Post";
                table = CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

                JToken docElement = CoreWebApp.Utils.DataConverter.Convert(table);
                if (table.Rows.Count == 1)
                {
                    string result = "[" + docElement["Post"].ToString() + "]";
                    return Ok(result);
                }
                else if (docElement.HasValues)
                {
                    string result = docElement["Post"].ToString();
                    return Ok(result);
                }
                else
                {
                    return Ok("[]");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); 
            }
        }

        // GET: Post
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                string query = @"
                    SELECT id, topic, content, src, userId, place, date
                    FROM dbo.Post
                ";
                DataTable table = new DataTable();
                table.TableName = "Post";
                table = CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

                JToken docElement = CoreWebApp.Utils.DataConverter.Convert(table);
                if (table.Rows.Count == 1)
                {
                    string result = "[" + docElement["Post"].ToString() + "]";
                    return Ok(result);
                }
                else if (docElement.HasValues)
                {
                    string result = docElement["Post"].ToString();
                    return Ok(result);
                }
                else
                {
                    return Ok("[]");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        

        // POST: Post
        [HttpPost]
        public async Task<ActionResult<Post>> Create([FromBody]Post post)
        {
            try
            {
                
                string query = @"
                    INSERT INTO dbo.Post VALUES
                    ('" + post.topic + @"',
                    '" + post.content + @"',
                    '" + post.src + @"',
                    '" + post.userId + @"',
                    '" + post.place + @"',
                    '" + post.date + @"')
                ";

                DataTable table = new DataTable();
                table.TableName = "Post";
                CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

                var message = "Added!!";
                return Ok(message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: Post
        [HttpPut]
        public async Task<ActionResult<Post>> Update([FromBody] Post post)
        {
            try
            {

                string query = @"
                    UPDATE dbo.Post SET
                    topic = '" + post.topic + @"',
                    content = '" + post.content + @"',
                    src = '" + post.src + @"',
                    place = '" + post.place + @"',
                    date = '" + post.date + @"'
                    WHERE id = " + post.id + @"
                ";

                DataTable table = new DataTable();
                table.TableName = "Post";
                CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

                var message = "Updated!!";
                return Ok(message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: Post
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Post>> Delete(int id)
        {
            try
            {

                string query = @"
                    DELETE FROM dbo.Post
                    WHERE id = '" + id + @"'
                ";

                DataTable table = new DataTable();
                table.TableName = "Post";
                CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

                var message = "Deleted!!";
                return Ok(message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("/DeleteAll")]
        [HttpDelete]
        public async Task<ActionResult<Post>> DeleteAll()
        {
            try
            {
                string query = @"
                    DELETE FROM dbo.Post
                ";

                DataTable table = new DataTable();
                CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

                var message = "Deleted All!!";
                return Ok(message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
