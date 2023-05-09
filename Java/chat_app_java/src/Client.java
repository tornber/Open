import java.io.*;
import java.net.Socket;
import java.util.Scanner;

public class Client {

    private Socket s;
    private BufferedWriter bw;
    private BufferedReader br;
    private String username;

    public Client(Socket s,String username) {
        try {
            this.s = s;
            this.br = new BufferedReader(new InputStreamReader(s.getInputStream()));
            this.bw = new BufferedWriter(new OutputStreamWriter(s.getOutputStream()));
            this.username = username;
        } catch (IOException e) {
            closeEverything(s,br,bw);
        }
    }

    public void sendMessage() {
        try {
            bw.write(username);
            bw.newLine();
            bw.flush();

            Scanner scanner = new Scanner(System.in);
            while(s.isConnected()) {
                String message = scanner.nextLine();
                bw.write(username + ": " + message);
                bw.newLine();
                bw.flush();
            }
        } catch (IOException e) {
            closeEverything(s,br,bw);
        }
    }

    public void listenForMessage() {
        new Thread(new Runnable() {

            @Override
            public void run() {
                String messageFromGroupChat;
                while(s.isConnected()) {
                    try {
                        messageFromGroupChat = br.readLine();
                        System.out.println(messageFromGroupChat);
                    } catch (IOException ex) {
                        closeEverything(s, br, bw);
                    }
                }
            }
        }).start();
    }

    public void closeEverything(Socket s,BufferedReader br,BufferedWriter bw) {
        try {
            if (br != null) {
                br.close();
            }
            if (bw != null) {
                bw.close();
            }
            if (s != null) {
                s.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter your user name for group chat: ");
        String username = scanner.nextLine();
        Socket s = new Socket("localhost",1234);
        Client client = new Client(s,username);
        client.listenForMessage();
        client.sendMessage();
    }
}
