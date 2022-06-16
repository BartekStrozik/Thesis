using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class PostController : ApiController
    {
        // GET: Post
        public HttpResponseMessage Get()
        {
            string query = @"
                SELECT Topic, Content, Src
                FROM dbo.Post
                ";
            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["QuarantineAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        // POST: Post
        public string Post(Post post)
        {
            try
            {
                string query = @"
                    INSERT INTO dbo.Post VALUES
                    ('" + post.Topic + @"',
                    '" + post.Content + @"',
                    '" + post.Src + @"')
                ";

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["QuarantineAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Added Successfully!!";
            }
            catch (Exception)
            {
                return "Failed To Add!!";
            }
        }

        // PUT: Post
        public string Put(Post post)
        {
            try
            {
                string query = @"
                    UPDATE dbo.Post SET
                    Topic = '" + post.Topic + @"',
                    Content = '" + post.Content + @"',
                    Src = '" + post.Src + @"'
                    WHERE Id = " + post.Id + @"
                ";

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["QuarantineAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Updated Successfully!!";
            }
            catch (Exception)
            {
                return "Failed To Update!!";
            }
        }
        
        public string Delete(int id)
        {
            try
            {
                string query = @"
                    DELETE FROM dbo.Post
                    WHERE Id = '" + id + @"'
                ";

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["QuarantineAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Deleted Successfully!!";
            }
            catch (Exception)
            {
                return "Failed To Delete!!";
            }
        }

        [Route("api/Post/DeleteAll")]
        [HttpDelete]
        public HttpResponseMessage DeleteAll()
        {
            try
            {
                string query = @"
                    DELETE FROM dbo.Post
                ";

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["QuarantineAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return Request.CreateResponse(HttpStatusCode.OK, table);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }
    }
}