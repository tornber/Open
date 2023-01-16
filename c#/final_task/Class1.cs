using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace final_task
{
    internal class MyStack<T>
    {
        int cap;
        T[] stack;
        int top;

        public MyStack(int max)
        {
            cap = max;
            stack = new T[cap];
            top = -1;
        }

        public Boolean Push(T element)
        {
            if(top == cap - 1)
            {
                Console.WriteLine("Stack overflow");
                return false;
            } else
            {
                top++;
                stack[top] = element;
            }
            return true;
        }

        public T pop()
        {
            T RemovedElement;
            T temp = default(T);
            if (top < 0)
            {
                Console.WriteLine("Stack udnerflow");
                return temp;
            } else
            {
                RemovedElement = stack[top];
                top--;
                return RemovedElement;
            }
        }

        public T peek()
        {
            T temp = default(T);
            if(top < 0)
            {
                Console.WriteLine("Stack underflow");
                return temp;
            } else
            {
                return stack[top];
            }
        }

    }
}
