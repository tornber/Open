using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace final_task
{
    internal class Program
    {
        static void Main(string[] args)
        {
            MyStack<int> stack = new MyStack<int>(5);
            stack.Push(1);
            stack.Push(2);
            Console.WriteLine(stack.peek());
            int[] nums = { 1, 1, 2, 3, 2, 2, 2, 1 };
            Console.WriteLine(Count(nums));
            string str = "hello world";
            int count = StringHelper.WordCount(str);
            Console.WriteLine(count);
            string palidrome = "level";
            bool isPalindrome = StringHelper.IsPalindrome(palidrome);
            Console.Write("is palindrome: ");
            Console.WriteLine(isPalindrome);
            string fullStr = "Stack overflow";
            string subStr = "flow";
            bool isSubstring = StringHelper.IsSubstring(fullStr, subStr);
            Console.Write("one string contains another: ");
            Console.WriteLine(isSubstring);
            char key = 'o';
            int keyCount = StringHelper.ContainsCount(fullStr, key);
            Console.WriteLine($"string contains {keyCount} keys");

        }

        static int Count(int[] arr)
        {
            int res = 0;
            int len = 0;
            int start = 0;
            for (int i =0;i< arr.Length;i++)
            {
                
                if((i < arr.Length - 1 && arr[i] == arr[i+1]) || (i > 0 && arr[i] == arr[i - 1]))
                {
                    len++;
                    if (len > res)
                    {
                        res = len;
                        start = (i + 1) - len;
                    }
                } else
                {
                    len = 0;
                }
            }
            var segment = new ArraySegment<int>(arr,start,res);
            foreach (var i in segment)
            {
                Console.WriteLine("array item: ");
                Console.WriteLine(i);
            }
            Console.WriteLine("length is: ");
            return res;
 
        }

    }
}
