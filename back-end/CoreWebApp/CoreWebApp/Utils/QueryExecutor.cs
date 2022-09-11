using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CoreWebApp.Utils
{
    public class QueryExecutor
    {
        public static DataTable ExecuteQuery(string connectionString, DataTable table, string query)
        {
            using (var con = new SqlConnection(connectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return table;
        }
    }
}
