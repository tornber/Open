using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace final_task
{
    static class StringHelper
    {
        public static int WordCount(string str)
        {
            int count = 0;
            string[] res = str.Split(' ');
            foreach (var word in res)
            {
                count++;
            }
            Console.WriteLine("count is :");
            return count;
        }

        public static bool IsPalindrome(string str)
        {
            int left,right;
            int len = str.Length;
            int m = len / 2;
            if(len % 2 == 0)
            {
                left = m - 1;
                right = m;
            } else
            {
                left = m;
                right = m;
            }
            while(left >= 0 && right < str.Length && str[left] == str[right])
            {
                if(left - 1 < 0 && right + 1 == str.Length)
                {
                    return true;
                }
                left--;
                right++;
            }
            return false;
        }

        public static bool IsSubstring(string str1,string str2)
        {
            return str1.Contains(str2);
        }

        public static int ContainsCount(string str,char key)
        {
            int count = 0;
            foreach(char c in str)
            {
                if(c == key)
                {
                    count++;
                }
            }
            return count;
        }

    }
}
