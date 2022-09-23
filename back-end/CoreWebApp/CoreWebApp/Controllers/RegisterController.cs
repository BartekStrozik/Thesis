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
using System.Threading.Tasks;
using System.Xml;

namespace CoreWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private IConfiguration _config;
        private string connectionString;
        public RegisterController(IConfiguration config)
        {
            _config = config;
            this.connectionString = _config.GetConnectionString("DefaultConnectionString");
        }

        public static string ConvertDatatableToXML(DataTable dt)
        {
            MemoryStream str = new MemoryStream();
            dt.WriteXml(str, true);
            str.Seek(0, SeekOrigin.Begin);
            StreamReader sr = new StreamReader(str);
            string xmlstr;
            xmlstr = sr.ReadToEnd();
            return (xmlstr);
        }

        
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Register([FromBody] UserModel user)
        {
            if (!CheckIfUserExist(user.username))
            {
                RegisterUser(user);
                //var user = SeekUser(userLogin);
                return Ok("User inserted!!");
            }

            return NotFound("User with given username already exists!!");
        }

        private bool CheckIfUserExist(string username)
        {
            string query = @"
                    SELECT id
                    FROM dbo.Users
                    WHERE username = '" + username + @"'
                ";
            DataTable table = new DataTable();
            table.TableName = "Users";
            table = CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);
            return (table.Rows.Count > 0);
        }

        private void RegisterUser(UserModel user)
        {
            string query = @"
                    INSERT INTO dbo.Users ([username], [password], [firstName], [lastName], [src])
                    VALUES('" + user.username + @"', '" + user.password + @"', '" + user.firstName + @"', '" + user.lastName + @"', '" + user.src + @"')
                ";
            DataTable table = new DataTable();
            table.TableName = "Users";
            CoreWebApp.Utils.QueryExecutor.ExecuteQuery(this.connectionString, table, query);
        }

        private string SeekUser(UserLogin userLogin)
        {
            string query = @"
                    SELECT id, username, firstName, lastName, token
                    FROM dbo.Users
                    WHERE username = '" + userLogin.Username + @"' AND password = '" + userLogin.Password + @"'
                ";
            DataTable table = new DataTable();
            table.TableName = "Users";
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

            if (docElement.ToString() == "") return null;

            string result = docElement["Users"].ToString();

            return result;

        }
    }
}
