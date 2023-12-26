using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using TornikeBeridze.Final;

namespace TornikeBeridze.Final
{
    public partial class AddShipForm : Form
    {
        private MainForm _parentForm;
        private ShipsRepository _shipsRepository;
        private bool _stop = false;
        public AddShipForm(MainForm parentForm)
        {
            InitializeComponent();
            _shipsRepository = new ShipsRepository();
            this._parentForm = parentForm;
        }

        private void saveBtn_Click(object sender, EventArgs e)
        {
            if (modelTextBox.Text == string.Empty || releaseYearTextBox.Text  == string.Empty || 
                speedTextBox.Text == string.Empty || weightTextbox.Text == string.Empty)
            {
                MessageBox.Show("Please fill all fields");
                return;
            }
            if (!DateTime.TryParse(releaseYearTextBox.Text,out DateTime result)) 
            {
                MessageBox.Show("Invalid date time format, it should looks like this yyyy-mm-dd");
                return;
            }
            Ship ship = new Ship() { Model = modelTextBox.Text,ReleaseYear=
                DateTime.ParseExact(releaseYearTextBox.Text, "yyyy-MM-dd",CultureInfo.InvariantCulture),
                Speed= parseInt(speedTextBox.Text),Weight=parseInt(weightTextbox.Text) };
            if (_stop == true)
            {
                _stop = false;
                MessageBox.Show("weight and speed input should be integers only");
                return;
            }
            _shipsRepository.Add(ship);
            _parentForm.SetData();
            this.Close();
        }

        private int parseInt(string value)
        {
            string num = "";
            foreach (char c in  value)
            {
                if (char.IsDigit(c))
                {
                    num += c;
                }
            }
            if (num.Length > 0)
            {
                return int.Parse(num);
            }
            this._stop = true;
            return -1;
        }
    }
}
