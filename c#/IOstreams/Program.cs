using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace IOstreams
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string rootPath = @"C:\Users\tornike\Desktop\C#\IOstreams\Files";
            string pattern = "*.*";
            SearchOption searchOption = SearchOption.AllDirectories;
            string destinationFolder = "CopiesHere";
            string destinationPath = rootPath + "\\" + destinationFolder + "\\";
            string moveDestinationFolder = "MovesHere";
            string moveDestinationPath = rootPath + "\\" + moveDestinationFolder + "\\";

            if (Directory.Exists(rootPath))
            {
                Utils.GetAllDirectories(rootPath);
                Utils.GetFiles(rootPath, pattern, searchOption);
                /*Utils.CopyAllFiles(rootPath, destinationPath, true);*/
                /*Utils.MoveAllFiles(rootPath,moveDestinationPath);*/

            } else
            {
                Directory.CreateDirectory(rootPath);
                Console.WriteLine($"Directory path not found {rootPath} but we created");
            }

            string filePath = rootPath + "\\rootFile.txt";
            Console.WriteLine(filePath);
            bool stoped = false;
            List<string> lines = new List<string>();
            Console.WriteLine("type text, press escape to stopp...");
            while (!stoped)
            {
                if (Console.ReadKey().Key == ConsoleKey.Escape)
                {
                    break;
                }
                string line = Console.ReadLine();
                lines.Add(line.Trim());
            }
            if (lines.Count > 0)
            {
                Utils.WriteIntoFile(filePath, lines);
                Utils.ReadFromFile(filePath);
            }

        }


    }
}
