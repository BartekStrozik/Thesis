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
    public class MemberController : ApiController
    {
        // GET: Member
        public HttpResponseMessage Get()
        {
            string query = @"
                SELECT Nick, Mail, Src
                FROM dbo.Member
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

        // POST: Member
        public string Post(Member member)
        {
            try
            {
                string query = @"
                    INSERT INTO dbo.Member VALUES
                    ('" + member.Nick + @"',
                    '" + member.Mail + @"',
                    '" + member.Password + @"',
                    '" + member.Src + @"')
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

        // PUT: Member
        public string Put(Member member)
        {
            try
            {
                string query = @"
                    UPDATE dbo.Member SET
                    Nick = '" + member.Nick + @"',
                    Mail = '" + member.Mail + @"',
                    Password = '" + member.Password + @"',
                    Src = '" + member.Src + @"'
                    WHERE Id = " + member.Id + @"
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
                    DELETE FROM dbo.Member
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

        [Route("api/Member/DeleteAll")]
        [HttpDelete]
        public HttpResponseMessage DeleteAll()
        {
            try
            {
                string query = @"
                    DELETE FROM dbo.Member
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