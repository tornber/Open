using System.ComponentModel;

namespace TornikeBeridze.Final
{
    public partial class MainForm : Form
    {

        private ShipsRepository _repository;
        private BindingList<Ship> _ships;
        public MainForm()
        {
            InitializeComponent();
            _repository = new ShipsRepository();
            _ships = new BindingList<Ship>();
            SetData();
        }

        public void SetData()
        {
            var ships = _repository.GetAll();
            shipsListView.Items.Clear();
            foreach (var ship in ships)
            {
                /*_ships.Add(ship);*/
                ListViewItem item = new ListViewItem(ship.Model);
                /*item.SubItems.Add(ship.Model);*/
                item.SubItems[0].Tag = ship.ID;
                item.SubItems.Add(ship.ReleaseYear.ToString("yyyy-mm-dd"));
                item.SubItems.Add(ship.Speed + " km/h");
                item.SubItems.Add(ship.Weight + " 000 kg");
                shipsListView.Items.Add(item);

            }

/*            foreach( var ship in _ships)
            {
                ListViewItem item = new ListViewItem(ship.ID.ToString());
                item.SubItems.Add(ship.Model);
                item.SubItems.Add(ship.ReleaseYear);
                item.SubItems.Add(ship.Speed);
                item.SubItems.Add(ship.Weight);
                shipsListView.Items.Add(item);
            }*/

        }

        private void addBtn_Click(object sender, EventArgs e)
        {
            /*            ListViewItem item = new ListViewItem("example model");
                        item.SubItems.Add("1902");
                        item.SubItems.Add("30 km/h");
                        item.SubItems.Add("70 000 kg");
                        shipsListView.Items.Add(item);*/
            AddShipForm form = new(this);
            form.Show();
        }

        private void removeBtn_Click(object sender, EventArgs e)
        {
            if (shipsListView.SelectedItems.Count == 0)
            {
                MessageBox.Show("please select ship before delete!");
                return;
            }
            foreach (ListViewItem item in shipsListView.SelectedItems)
            {
                _repository.Remove(item.SubItems[0].Tag.ToString());
            }
            SetData();
/*            if (shipsListView.SelectedItems.Count > 0)
            {
                shipsListView.Items.Remove(shipsListView.SelectedItems[0]);
            } else
            {
                MessageBox.Show("Please select an item");
            }*/
        }

    }
}
