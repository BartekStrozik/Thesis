using CoreWebApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;
using WebApi.Models;

namespace CoreWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private string connectionString;
        public LoginController(IConfiguration config)
        {
            _config = config;
            this.connectionString = _config.GetConnectionString("DefaultConnectionString");
        }

        private string ConvertDatatableToXML(DataTable dt)
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
        public IActionResult Login([FromBody] UserLogin userLogin)
        {

            JToken user = Authenticate(userLogin);
            //JToken postList = GetPostList((int) user["id"]);
            //user["postList"] = postList;

            if (user != null) return Ok(user.ToString());
            return NotFound("User not found!!");
        }


        private JToken Authenticate(UserLogin userLogin)
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
            
            return docElement["Users"];

        }

        private JToken GetPostList(int id)
        {
            string query = @"
                    SELECT Topic, Content, Src
                    FROM dbo.Post
                    WHERE UserId = '" + id + @"'
                ";
            DataTable table = new DataTable();
            table.TableName = "Posts";
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

            return docElement["Posts"];
        }
    }
}
