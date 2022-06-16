using CoreWebApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CoreWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration configuration;

        private string connectionString;
        public UserController(IConfiguration configuration)
        {
            this.configuration = configuration;
            this.connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }

        [HttpGet("Admins")]
        [Authorize]
        public IActionResult AdminsEndpoint()
        {
            //var currentUser = GetCurrentUser();

            return Ok("Hi , you are an !!");

        }

        [HttpGet("Public")]
        public IActionResult Public()
        {
            return Ok("Hi, you're on public property!!");
        }

        // PUT: User
        [HttpPut]
        public async Task<ActionResult<UserModel>> Update([FromBody] UserModel user)
        {
            try
            {

                string query = @"
                    UPDATE dbo.Users SET
                    firstName = '" + user.firstName + @"',
                    lastName = '" + user.lastName + @"',
                    src = '" + user.src + @"'
                    WHERE id = " + user.id + @"
                ";

                DataTable table = new DataTable();
                //table.TableName = "Users";
                using (var con = new SqlConnection(this.connectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                var message = "Updated!!";
                return Ok(message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
