using CoreWebApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
using System.Security.Claims;
using System.Threading.Tasks;
using System.Xml;

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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                string query = @"
                    SELECT id, username, firstName, lastName, src
                    FROM dbo.Users
                ";
                DataTable table = new DataTable();
                table.TableName = "Users";
                table = CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

                JToken docElement = CoreWebApp.Utils.DataConverter.Convert(table);
                string result = docElement["Users"].ToString();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // this can be something like 
            }
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
                table.TableName = "Users";
                CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);

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
