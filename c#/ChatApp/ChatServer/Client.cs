using ChatServer.Net.IO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace ChatServer
{
    internal class Client
    {
        public string UserName { get; set; }
        public Guid UserId { get; set; }
        public TcpClient ClientSocket { get; set; }
        PacketReader _packcetReader;

        public Client(TcpClient client)
        {
                ClientSocket = client;
                UserId = Guid.NewGuid();
                _packcetReader = new PacketReader(client.GetStream());
                var opcode = _packcetReader.ReadByte();        
                UserName = _packcetReader.ReadMessage();
                Console.WriteLine($"{DateTime.Now}: user has connected with username: {UserName}");

            Task.Run(() => Process());
        }

        void Process()
        {
            while (true)
            {
                try
                { 
                    var opcode = _packcetReader.ReadByte();
                    switch (opcode)
                    {
                        case 5:
                            var msg = _packcetReader.ReadString();
                            Console.WriteLine($"{DateTime.Now}: Message Received, {msg}");
                            Program.BroadCastMessage(msg);
                            break;
                        default:
                            break;
                    }
                } catch ( Exception e )
                {
                    Console.WriteLine($"{UserId.ToString()}: Disconnected!");
                    Program.BroadCastDisconnect(UserId.ToString());
                    ClientSocket.Close();
                    break;
                }
            }
        }
    }
}
