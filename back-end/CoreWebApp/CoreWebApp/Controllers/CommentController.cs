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

        public JToken GetUserData(int userId)
        {
            try
            {
                string query = @"
                    SELECT firstName, lastName, src
                    FROM dbo.Users
                    WHERE id = '" + userId + @"'
                ";
                DataTable table = new DataTable();
                table.TableName = "Users";
                table = CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

                JToken userData = CoreWebApp.Utils.DataConverter.Convert(table);
                return userData["Users"];
            }
            catch (Exception ex)
            {
                return "{}";//BadRequest(ex.Message); // this can be something like 
            }
        }

        public JToken GetPostOwner(int postId)
        {
            try
            {
                string query = @"
                    SELECT userId
                    FROM dbo.Post
                    WHERE id = '" + postId + @"'
                ";
                DataTable table = new DataTable();
                table.TableName = "Post";
                table = CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

                JToken data = CoreWebApp.Utils.DataConverter.Convert(table);
                return data["Post"];
            }
            catch (Exception ex)
            {
                return "{}";//BadRequest(ex.Message); // this can be something like 
            }
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

                JToken user = this.GetUserData(comment.userId);
                JToken ownerId = this.GetPostOwner(comment.postId);

                query = @"
                            INSERT INTO dbo.Notification 
                            (ownerId, sourceUserId, sourceUserSrc, sourceFirstName, sourceLastName, isNewMessage, isNewComment, postId, isNewInvite) VALUES
                            ('" + ownerId["userId"] + @"',
                            '" + comment.userId + @"',
                            '" + user["src"] + @"',
                            '" + user["firstName"] + @"',
                            '" + user["lastName"] + @"',
                            '" + 0 + @"',
                            '" + 1 + @"',
                            '" + comment.postId + @"',
                            '" + 0 + @"')
                        ";

                table = new DataTable();
                table.TableName = "Notification";
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
