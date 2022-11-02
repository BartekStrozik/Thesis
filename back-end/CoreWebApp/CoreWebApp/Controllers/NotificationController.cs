using CoreWebApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace MvCMovie.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : Controller
    {
        private readonly IConfiguration configuration;

        private string connectionString;

        public NotificationController(IConfiguration configuration)
        {
            this.configuration = configuration;
            this.connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }

        // GET: Notification/id
        [HttpGet("{ownerId:int}")]
        public async Task<IActionResult> Get(int ownerId)
        {
            try
            {
                string query = @"
                    SELECT id, ownerId, sourceUserId, sourceUserSrc, sourceFirstName, sourceLastName, isNewMessage, isNewComment, postId, isNewInvite
                    FROM dbo.Notification
                    WHERE ownerId = '" + ownerId + @"'
                ";
                DataTable table = new DataTable();
                table.TableName = "Notification";
                table = CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

                JToken docElement = CoreWebApp.Utils.DataConverter.Convert(table);
                if (table.Rows.Count == 1)
                {
                    string result = "[" + docElement["Notification"].ToString() + "]";
                    return Ok(result);
                }
                else if (docElement.HasValues)
                {
                    string result = docElement["Notification"].ToString();
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
                    SELECT id, ownerId, sourceUserId, sourceUserSrc, sourceFirstName, sourceLastName, isNewMessage, isNewComment, postId, isNewInvite
                    FROM dbo.Notification
                ";
                DataTable table = new DataTable();
                table.TableName = "Notification";
                table = CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

                JToken docElement = CoreWebApp.Utils.DataConverter.Convert(table);
                if (table.Rows.Count == 1)
                {
                    string result = "[" + docElement["Notification"].ToString() + "]";
                    return Ok(result);
                }
                else if (docElement.HasValues)
                {
                    string result = docElement["Notification"].ToString();
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

        //[HttpPost("/{senderId:int}/{invitedId:int}")]
        [HttpPost]
        public async Task<ActionResult<Friends>> Create([FromBody]Friends friends)
        {
            try
            {
                string query = @"
                    INSERT INTO dbo.Friends VALUES
                    ('" + friends.userId + @"',
                    '" + friends.invitedId + @"',
                    '" + friends.accepted + @"')
                ";
                DataTable table = new DataTable();
                table.TableName = "Friends";
                CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

                /*

                JToken user = this.GetUserData(senderId);

                string query = @"
                            INSERT INTO dbo.Notification VALUES
                            ('" + invitedId + @"',
                            '" + senderId + @"',
                            '" + user["src"] + @"',
                            '" + user["firstName"] + @"',
                            '" + user["lastName"] + @"',
                            '" + 1 + @"',
                            '" + 0 + @"',
                            '" + null + @"',
                            '" + 0 + @"')
                        ";

                table = new DataTable();
                table.TableName = "Notification";
                CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);*/

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
