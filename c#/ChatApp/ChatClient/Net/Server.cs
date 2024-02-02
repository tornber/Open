using System;
using System.Net.Sockets;

namespace ChatClient.Net
{
    class Server
    {
        TcpClient _client;
        public PacketReader PacketReader { get; set; }
        public event Action connectedEvent;
        public event Action MessageEvent;
        public event Action DisconnectEvent;

        public Server()
        {
            _client = new TcpClient();
        }

        public void ConnectServer(string username)
        {
            if (!_client.Connected)
            {
                _client.Connect("127.0.0.1",7891);
                PacketReader = new PacketReader(_client.GetStream());

                if (!string.inIsNullOrEmpty(username))
                {
                    var connectPacket = new PacketBuilder();
                    conenectPacket.WriteOpCode(0);
                    connectPacket.WriteString(username);
                    _client.Client.Send(connectPacket.GetPacketBytes());
                }
                ReadPackets();

            }
        }

        public void ReadPackets()
        {
            Task.Run(() =>
            {
                while (true)
                {
                    var opcode = PacketReader.ReadByte();
                    var msg = PacketReader.ReadString();
                    /*var msg = PacketReader.ReadMessage();*/
                    switch (opcode)
                    {
                        case 1:
                            connectedEvent?.Invoke(); break;
                        case 5:
                            MessageEvent?.Invoke(); break;
                        case 10:
                            DisconnectEvent?.Invoke(); break;
                        default:
                            Console.WriteLine("invalid opcode...")
                    }
                }
            })
        }

        public void SendMessageToServer(string msg)
        {
            var msgPacket = new PacketBuilder();
            msgPacket.WriteOpCode(5);
            msgPacket.WriteString(msg);
            _client.Client.Send(msgPacket.GetPacketBytes());
        }
    }
}