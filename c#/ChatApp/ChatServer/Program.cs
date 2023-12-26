using ChatServer;
using ChatServer.Net.IO;
using System.Net;
using System.Net.Sockets;

class Program
{

    static List<Client> _users;
    static TcpListener _listener;

    static void Main(string[] args)
    {
        _users = new List<Client>();
        _listener = new TcpListener(IPAddress.Parse("127.0.0.1"), 7891);
        _listener.Start();

        while(true) 
        {
            var client = new Client(_listener.AcceptTcpClient());
            _users.Add(client);
            BroadCastConnection();
        }


    }
    
    static void BroadCastConnection()
    {
        foreach(var user in _users) 
        {
            foreach(var usr in _users) 
            {
                var broadCastPacket = new PacketBuilder();
                broadCastPacket.WriteOpCode(1);
                broadCastPacket.WriteString(usr.UserName);
                broadCastPacket.WriteString(usr.UserId.ToString());
                usr.ClientSocket.Client.Send(broadCastPacket.GetPacketBytes());
            }
        }
    }

    public static void BroadCastMessage(string msg)
    {
        foreach(var usr in _users)
        {
            var msgPacket = new PacketBuilder();
            msgPacket.WriteOpCode(5);
            msgPacket.WriteString(msg);
            usr.ClientSocket.Client.Send(msgPacket.GetPacketBytes());
        }
    }

    public static void BroadCastDisconnect(string uid)
    {
        var disconnectedUser = _users.Where(x => x.UserId.ToString() == uid).FirstOrDefault();
        _users.Remove(disconnectedUser);
        foreach (var usr in _users)
        {
            var msgPacket = new PacketBuilder();
            msgPacket.WriteOpCode(10);
            msgPacket.WriteString(uid);
            usr.ClientSocket.Client.Send(msgPacket.GetPacketBytes());
        }
        BroadCastMessage($"{disconnectedUser.UserName}: Disconnected!"); 
    }

}
