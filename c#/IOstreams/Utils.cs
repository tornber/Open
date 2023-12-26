using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IOstreams
{
    public class Utils
    {
        public static void GetAllDirectories(string path)
        {
            string[] dirs = Directory.GetDirectories(path, "*", SearchOption.AllDirectories);
            foreach (string dir in dirs)
            {
                if (Directory.Exists(dir))
                {
                    Console.WriteLine(dir);
                }
                else
                {
                    Console.WriteLine($"directory {dir} not found");
                }
            }
        }

        public static void GetFiles(string path, string pattern, SearchOption searchOption)
        {
            var files = Directory.GetFiles(path, pattern, searchOption);

            foreach (string file in files)
            {
                if (File.Exists(file))
                {
                    /*Console.WriteLine(file);*/
                    /* Console.WriteLine(Path.GetFileName(file));*/
                    /*Console.WriteLine(Path.GetFileNameWithoutExtension(file)); */
                    FileInfo info = new FileInfo(file);
                    Console.WriteLine($"{Path.GetFileName(file)}: {info.Length / (1024 * 1024)}");
                }
                else
                {
                    Console.WriteLine($"file {file} not found");
                }
            }
        }

        public static void CopyAllFiles(string path, string destinationFolder, bool overwrite) 
        {
            string[] files = Directory.GetFiles(path);
            foreach (string file in files)
            {
                File.Copy(file, $"{destinationFolder}\\{Path.GetFileName(file)}", overwrite);
            }
        }
        public static void MoveAllFiles(string path, string destinationFolder)
        {
            string[] files = Directory.GetFiles(path);
            foreach (string file in files)
            {
                File.Move(file, $"{destinationFolder}\\{Path.GetFileName(file)}");
            }
        }

        public static void WriteIntoFile(string path,List<string> text)
        {
            using (StreamWriter sw = new StreamWriter(path))
            {
                /*sw.AutoFlush = true;*/
                foreach (string line in text)
                {
                    sw.WriteLine(line);
                }
                /*sw.Close();*/
            }
        }

        public static void ReadFromFile(string path)
        {
            Console.WriteLine(File.ReadAllText(path, Encoding.UTF8));
            
        }
    }
}
