import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {

    private ServerSocket ss;

    Server(ServerSocket serverSocket) {
        this.ss = serverSocket;
    }

    public void startServer() {
        try {

            while(!ss.isClosed()) {
                Socket s = ss.accept();
                System.out.println("a new client has joined");

                ClientHandler clientHandler = new ClientHandler(s);
                Thread thread = new Thread(clientHandler);
                thread.start();
            }

        } catch(IOException ex) {
            closeServer();
        }
    }

    public void closeServer() {
        try {
            if(ss != null) {
                ss.close();
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public static void main(String[] args) throws IOException {
        ServerSocket ss = new ServerSocket(1234);
        Server server = new Server(ss);
        server.startServer();
    }


}
