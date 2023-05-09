import java.io.*;
import java.net.Socket;
import java.util.ArrayList;

public class ClientHandler implements Runnable {

    public static ArrayList<ClientHandler> clientHandlers = new ArrayList<ClientHandler>();
    private BufferedReader br;
    private BufferedWriter bw;
    private Socket s;
    private String clientName;

    ClientHandler(Socket s) {
        try {
            this.s = s;
            this.br = new BufferedReader(new InputStreamReader(s.getInputStream()));
            this.bw  = new BufferedWriter(new OutputStreamWriter(s.getOutputStream()));
            this.clientName = br.readLine();
            clientHandlers.add(this);
            broadCastMessage("Server: " + clientName + " connected!");
        } catch (IOException e) {
            closeEverything(s,bw,br);
        }
    }

    @Override
    public void run() {
        String messageFromClient;
        try {
            while(s.isConnected()) {
                messageFromClient = br.readLine();
                broadCastMessage(messageFromClient);
            }
        } catch (IOException ex) {
            closeEverything(s,bw,br);
        }
    }

    public void broadCastMessage(String messageToSend) {
        try {
            for (ClientHandler clientHandler : clientHandlers) {
                if (!clientHandler.clientName.equals(clientName)) {
                    clientHandler.bw.write(messageToSend);
                    clientHandler.bw.newLine();
                    clientHandler.bw.flush();
                }
            }
        } catch (IOException e) {
            closeEverything(s,bw,br);
        }
    }

    public void removeClientHandler() {
        broadCastMessage("Server: " + clientName + " left the chat");
        clientHandlers.remove(this);
    }
    public void closeEverything(Socket s,BufferedWriter bw,BufferedReader br) {
        removeClientHandler();
        try {
            if(bw != null) {
                bw.close();
            }
            if(br != null) {
                br.close();
            }
            if(s != null) {
                s.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
