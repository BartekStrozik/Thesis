using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace CoreWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly IConfiguration configuration;

        private string connectionString;

        public FriendsController(IConfiguration configuration)
        {
            this.configuration = configuration;
            this.connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }

        [HttpPost]
        public async Task<ActionResult<Friends>> Create([FromBody] Friends friends)
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
