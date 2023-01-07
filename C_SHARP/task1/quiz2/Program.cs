using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace quiz2
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            try
            {
                Student student = new Student { Mark = 100, Gpa = -5 };
                Console.WriteLine(student);
            } catch(GPAException ex)
            {
                Console.WriteLine(ex.Message);
            }

            Point a = new Point(10,20);
            Point b = new Point(20,30);
            Point c = new Point();
            c = a + b;
            c.Print();
            c = b - a;
            c.Print();
            Console.WriteLine(c.CalculateDistance(a, b));

        }
    }

    class Human
    {

        private readonly string name = "default name";
        private readonly string surname = "default surname";
        public string Name { get { return name; } }
        public string Surname { get { return surname; } }

        public Human() { }
        public Human(string name, string surname)
        {
            this.name = name; this.surname = surname;
        }

        public override string ToString()
        {
            return "Person name: " + Name + " " + Surname;
        }

    }

    class Student : Human
    {
        private int mark;
        private int gpa;

        public int Mark { get { return mark; } set { mark = value; } }
        public int Gpa
        {
            get { return gpa; }
            set
            {
                if (value > 0)
                {
                    gpa = value;
                }
                else
                {
                    throw new GPAException(value);
                }
            }
        }

        public Student() { }
        public Student(string name, string surname, int mark, int gpa) : base(name, surname)
        {
            Mark = mark; Gpa = gpa;
        }

        public override string ToString()
        {
            return "Mark is: " + Mark + ", GPA is " + Gpa;
        }
    }

    class Worker : Human
    {
        private int hourlyRate;
        private int hoursWorked;

        public int HourlyRate
        {
            get { return hourlyRate; }
            set { hourlyRate = value; }
        }
        public int HoursWorked { get { return hoursWorked; } set { hoursWorked = value; } }

        public Worker() { }
        public Worker(string name, string surname, int hourlyRate, int hoursWorked) : base(name, surname)
        {
            HourlyRate = hourlyRate; HoursWorked = hoursWorked;
        }


        public int CalculareSalary()
        {
            return hourlyRate * hoursWorked;
        }

        public override string ToString()
        {
            return "hourly rate is: " + HourlyRate + ",hours worked is: " + HoursWorked;
        }

    }

    class GPAException : Exception
    {
        public GPAException()
        {
        }

        public GPAException(int gpa)
            : base($"Gpa can not be  {gpa}")
        {

        }


    }

    class Point
    {
        private int x;
        private int y;

        public Point() { }
        
        public Point(int x,int y) {
            this.x = x; this.y = y;
        }

        public int CalculateDistance(Point a,Point b)
        {
            int x = (int) Math.Pow(b.x - a.x,2);
            int y = (int) Math.Pow(b.y - a.y,2);
            return (int) Math.Sqrt(x + y);
        }

        public static Point operator +(Point a,Point b)
        {
            Point temp = new Point();
            temp.x = a.x + b.x;
            temp.y = a.y + b.y;
            return temp;
        }

        public static Point operator -(Point a, Point b)
        {
            Point temp = new Point();
            temp.x = a.x - b.x;
            temp.y = a.y - b.y;
            return temp;
        }

        public void Print()
        {
            Console.WriteLine($"{x} {y}");
        }


    }

}
