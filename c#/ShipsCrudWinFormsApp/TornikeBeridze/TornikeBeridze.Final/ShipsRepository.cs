using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TornikeBeridze.Final
{
    internal class ShipsRepository
    {
        private static string _server = "DESKTOP-HGB0AIU\\SQLEXPRESS";
/*        private string connString = $"Server=localhost;Database=ShipsDB;uid=User Id;pwd=Password;TrustServerCertificate=True;";*/
        private string connString = $"Server={_server};Database=ShipsDB;Trusted_Connection=True;TrustServerCertificate=True;";


        public void Add(Ship ship)
        {
            SqlConnection conn = new SqlConnection(connString);
            SqlCommand cmd = conn.CreateCommand();

            cmd.CommandText = "insert into ships(Model,ReleaseYear,Speed,Weight) values (@model,@releaseYear,@speed,@weight);";
            cmd.Parameters.AddWithValue("@model", ship.Model);
            cmd.Parameters.AddWithValue("@releaseYear", ship.ReleaseYear);
            cmd.Parameters.AddWithValue("@speed", ship.Speed);
            cmd.Parameters.AddWithValue("@weight", ship.Weight);

            conn.Open();
            cmd.ExecuteNonQuery();
            conn.Close();
            conn.Dispose();
        }

        public List<Ship> GetAll()
        {
            List<Ship> ships = new List<Ship>();
            SqlConnection conn = new SqlConnection( connString );
            SqlCommand cmd = conn.CreateCommand();

            cmd.CommandText = "select * from ships";

            conn.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            
            while (reader.Read())
            {
                /*int id = Convert.ToInt32(reader["ID"]);*/
                int id = reader.GetInt32(0);
                string model = reader.GetString(1);
                DateTime releaseYear =  reader.GetDateTime(2);
                int speed = reader.GetInt32(3);
                int weight = reader.GetInt32(4);

                Ship ship = new Ship() { ID = id, Model = model, ReleaseYear = releaseYear, Speed = speed, Weight = weight };
                ships.Add(ship);
            }

            conn.Close();
            conn.Dispose();
            return ships;
        }

        public void Remove(string  id)
        {
            SqlConnection conn = new SqlConnection(connString);
            SqlCommand cmd = conn.CreateCommand();

            cmd.CommandText = $"DELETE FROM ships WHERE ID = {id}";

            conn.Open();
            cmd.ExecuteNonQuery();
            conn.Close();
            conn.Dispose();
        }
    }
}
