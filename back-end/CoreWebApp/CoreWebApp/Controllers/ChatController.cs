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
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;

namespace CoreWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private IConfiguration _config;
        private string connectionString;
        public ChatController(IConfiguration config)
        {
            _config = config;
            this.connectionString = _config.GetConnectionString("DefaultConnectionString");
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
        public int GetUserId(string username)
        {
            string query = @"
                    SELECT id
                    FROM dbo.Users
                    WHERE username = '" + username + @"'
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

            if (docElement.ToString() == "") return -1;

            int result = Convert.ToInt32(docElement["Users"]["id"]);
            Console.WriteLine(result);
            return result;
        }


        [HttpGet("/gt")]
        public async Task Get()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                await Echo(webSocket);
            }
            else
            {
                HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
        }

        private async Task Echo(WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            var receiveResult = await webSocket.ReceiveAsync(
                new ArraySegment<byte>(buffer), CancellationToken.None);

            while (!receiveResult.CloseStatus.HasValue)
            {
                var request = JObject.Parse(Encoding.Default.GetString(buffer));

                if (!LoginController.ValidateToken(request["token"].ToString()))
                {
                    
                }
                else
                {
                    ArraySegment<byte> myArrSegAll = new ArraySegment<byte>(Encoding.UTF8.GetBytes("cokoleiwke"));
                    await webSocket.SendAsync(
                        myArrSegAll,
                        receiveResult.MessageType,
                        receiveResult.EndOfMessage,
                        CancellationToken.None);

                    int to = this.GetUserId(request["to"].ToString());
                    string content = request["content"].ToString();
                    int from = LoginController.getClaim(request["token"].ToString());
                    string date = DateTime.Now.ToString();

                    try
                    {

                        string query = @"
                            INSERT INTO dbo.Message VALUES
                            ('" + from + @"',
                            '" + to + @"',
                            '" + content + @"',
                            '" + date + @"')
                        ";

                        DataTable table = new DataTable();
                        table.TableName = "Message";
                        using (var con = new SqlConnection(this.connectionString))
                        using (var cmd = new SqlCommand(query, con))
                        using (var da = new SqlDataAdapter(cmd))
                        {
                            cmd.CommandType = CommandType.Text;
                            da.Fill(table);
                        }
                    }
                    catch (Exception ex)
                    {
                        
                    }

                    receiveResult = await webSocket.ReceiveAsync(
                    new ArraySegment<byte>(buffer), CancellationToken.None);
                }

            }

        }

        [HttpGet("/{userId:int}")]
        public async Task GetMessages(int userId)
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                await SendAllMessages(userId, webSocket);
            }
            else
            {
                HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
        }

        public async Task SendAllMessages(int userId, WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            var receiveResult = await webSocket.ReceiveAsync(
                new ArraySegment<byte>(buffer), CancellationToken.None);

            string query = @"
                SELECT id, senderId, receiverId, content, receivedAt
                FROM dbo.Message
                WHERE senderId = '" + userId + @"' OR receiverId = '" + userId + @"'
                ORDER BY receivedAt
            ";

            DataTable table = new DataTable();
            table.TableName = "Message";
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

            string result = "";

            if (table.Rows.Count == 1)
            {
                result = "[" + docElement["Message"].ToString() + "]";
            }
            else if (docElement.HasValues)
            {
                result = docElement["Message"].ToString();
            }
            else
            {
                result = "[]";
            }

            //string result = docElement["Message"].ToString();

            ArraySegment<byte> myArrSegAll = new ArraySegment<byte>(Encoding.UTF8.GetBytes(result));

            while (true)
            {
                //var request = JObject.Parse(Encoding.Default.GetString(buffer));

                await webSocket.SendAsync(
                    myArrSegAll,
                    receiveResult.MessageType,
                    receiveResult.EndOfMessage,
                    CancellationToken.None);

                receiveResult = await webSocket.ReceiveAsync(
                    new ArraySegment<byte>(buffer), CancellationToken.None);

                if (!receiveResult.CloseStatus.HasValue)
                {
                    break;
                }
            }

        }

        [HttpGet("/{userId:int}/{interlocutorId}")]
        public async Task GetConversation(int userId, int interlocutorId)
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                await SendConversation(userId, interlocutorId, webSocket);
            }
            else
            {
                HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
        }

        public async Task SendConversation(int userId, int interlocutorId, WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            var receiveResult = await webSocket.ReceiveAsync(
                new ArraySegment<byte>(buffer), CancellationToken.None);

            string query = @"
                SELECT id, senderId, receiverId, content, receivedAt
                FROM dbo.Message
                WHERE senderId = '" + userId + @"' AND receiverId = '" + interlocutorId + @"'
                    OR senderId = '" + interlocutorId + @"' AND receiverId = '" + userId + @"'
                ORDER BY receivedAt
            ";

            DataTable table = new DataTable();
            table.TableName = "Message";
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

            string result = "";

            if (table.Rows.Count == 1)
            {
                result = "[" + docElement["Message"].ToString() + "]";
            }
            else if (docElement.HasValues)
            {
                result = docElement["Message"].ToString();
            }
            else
            {
                result = "[]";
            }

            //string result = docElement["Message"].ToString();

            ArraySegment<byte> myArrSegAll = new ArraySegment<byte>(Encoding.UTF8.GetBytes(result));

            while (true)
            {
                //var request = JObject.Parse(Encoding.Default.GetString(buffer));

                await webSocket.SendAsync(
                    myArrSegAll,
                    receiveResult.MessageType,
                    receiveResult.EndOfMessage,
                    CancellationToken.None);

                receiveResult = await webSocket.ReceiveAsync(
                    new ArraySegment<byte>(buffer), CancellationToken.None);

                if (!receiveResult.CloseStatus.HasValue)
                {
                    break;
                }
            }

        }

        [HttpGet("/pt")]
        public async Task SendMessage()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                await AddMessage(webSocket);
            }
            else
            {
                HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
        }

        public async Task AddMessage(WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            var receiveResult = await webSocket.ReceiveAsync(
                new ArraySegment<byte>(buffer), CancellationToken.None);

            while (!receiveResult.CloseStatus.HasValue)
            {
                var request = JObject.Parse(Encoding.Default.GetString(buffer));

                if (!LoginController.ValidateToken(request["token"].ToString()))
                {

                }
                else
                {
                    ArraySegment<byte> myArrSegAll = new ArraySegment<byte>(Encoding.UTF8.GetBytes("response"));
                    await webSocket.SendAsync(
                        myArrSegAll,
                        receiveResult.MessageType,
                        receiveResult.EndOfMessage,
                        CancellationToken.None);

                    //int to = this.GetUserId(request["to"].ToString());
                    //string content = request["content"].ToString();
                    //int from = LoginController.getClaim(request["token"].ToString());
                    //string date = DateTime.Now.ToString();

                    int senderId = Int32.Parse(request["userId"].ToString());
                    int receiverId = Int32.Parse(request["interlocatorId"].ToString());
                    string content = request["content"].ToString();
                    string receivedAt = DateTime.Now.ToString();

                    try
                    {

                        string query = @"
                            INSERT INTO dbo.Message VALUES
                            ('" + senderId + @"',
                            '" + receiverId + @"',
                            '" + content + @"',
                            '" + receivedAt + @"')
                        ";

                        DataTable table = new DataTable();
                        table.TableName = "Message";
                        using (var con = new SqlConnection(this.connectionString))
                        using (var cmd = new SqlCommand(query, con))
                        using (var da = new SqlDataAdapter(cmd))
                        {
                            cmd.CommandType = CommandType.Text;
                            da.Fill(table);
                        }
                    }
                    catch (Exception ex)
                    {

                    }

                    receiveResult = await webSocket.ReceiveAsync(
                    new ArraySegment<byte>(buffer), CancellationToken.None);
                }

            }
        }
    }
}
