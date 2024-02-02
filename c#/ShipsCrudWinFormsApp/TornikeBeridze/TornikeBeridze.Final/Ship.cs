using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TornikeBeridze.Final
{
    internal class Ship
    {
        public int ID { get; set; }
        public string Model { get; set; }
        public DateTime ReleaseYear {  get; set; }
        public int Speed {  get; set; }
        public int Weight {  get; set; }

        public override string ToString()
        {
            return $"{ID} {Model} {ReleaseYear} {Speed} {Weight}";
        }

    }
}
