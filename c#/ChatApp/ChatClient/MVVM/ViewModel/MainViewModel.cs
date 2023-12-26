using System.Linq;
using ChatClient.Net;

namespace ChatCLient.MVVM.ViewModel
{
    class MainViewModel
    {

        private Server _server;
        public string UserName { get; set; }
        public string Message { get; set; }
        public RelayCommand ConnectToServerCommand { get; set; };
        public RealyCommand SendMessageCommand { get; set; }
        public ObservableCollection<UserModel> Users;
        public ObservableCollection<string> Messages;

        public MainViewModel()
        {
            Users = new ObservableCollection<UserModel>();
            Messages = new ObservableCollection<string>();
            _server = new Server();
            _server.connectedEvent += UserConnected;
            _server.MessageEvent += MessageReceived;
            _server.DisconnectEvent += UserDisconnected;
            ConnectToServerCommand = new RelayCommand(object => _server.ConnectServer(UserName),object => !string.IsNullOrEmpty(UserName));
            SendMessageCommand = new RealyCommand(object => _server.SendMessage(Message),object => !string.IsNullOrempty(Message);
        }

        public void MessageReceived()
        {
            var msg = _server.PacketReader().ReadString();
            Application.Current.Dispatcher.Invoke(() => Messages.Add(msg);
        }

        public void UserDisconnected()
        {
            var uid = _server.PacketReader.ReadString();
            var user = Users.Where(x => x.UserId == uid).FirstOrDefault();
            Application.Current.Dispatcher.Invoke(() => Users.Remove(user));
        }

        public void UserConnected()
        {
            var user = new UserModel
            {
                UserName = _server.PacketReader.ReadString();
                UID = _server.PacketReader.ReadString();
            }

            if (!Users.Any(x => x.UID == user.UID)) 
            {
                Application.Current.Dispatcher.Invoke(() => Users.Add(user));
            } 
        }


}