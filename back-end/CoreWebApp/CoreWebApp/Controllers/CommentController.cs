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
            Request.Headers.TryGetValue("Authorization", out var jwt);
            if (!LoginController.ValidateToken(jwt)) return Ok("[]");
            int userId = LoginController.getClaim(jwt);
            try
            {
                string query = @"
                   SELECT C.id, C.body, C.postId, C.username, C.userId, C.createdAt
                   FROM dbo.Comment C
                   JOIN dbo.Post P ON C.postId = P.id
                   WHERE C.postId = '" + id + @"' AND P.userId = '" + userId + @"'
                ";
                DataTable table = new DataTable();
                table.TableName = "Comment";
                table = CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

                JToken docElement = CoreWebApp.Utils.DataConverter.Convert(table);
                if (table.Rows.Count == 1)
                {
                    string result = "[" + docElement["Comment"].ToString() + "]";
                    return Ok(result);
                }
                else if (docElement.HasValues)
                {
                    string result = docElement["Comment"].ToString();
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
                table = CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

                JToken docElement = CoreWebApp.Utils.DataConverter.Convert(table);
                return Ok(docElement["Comment"].ToString());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); 
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
                CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

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
