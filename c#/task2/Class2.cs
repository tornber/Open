using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace midTerm_Task
{
    public class Human
    {
        public string name;
        public string surname;

        public Human() { }
        public Human(string name,string surname)
        {
            this.name = name;
            this.surname = surname;
        }

        public void Print()
        {
            Console.WriteLine($"human name is {name} {surname}");
        }
    }

    public class Student2 : Human
    {
        public int mark;

        public Student2() { }
        public Student2(string name,string surname,int mark) : base(name,surname)
        {
            this.mark = mark;
        }

        public void Print()
        {
            Console.WriteLine($"human name is {name} {surname},he/she is student," +
                $"his/her mark is {mark}");
        }
    }

    public class Worker : Human
    {
        public int wage;
        public int hoursWorked;

        public Worker() { }
        public Worker(string name, string surname,int wage,int hoursWorked) : base(name,surname) {
            this.wage = wage;
            this.hoursWorked = hoursWorked;
        }

        public int HourSalary()
        {
            return wage / hoursWorked;
        }

        public void Print() {
            Console.WriteLine($"human name is {name} {surname},he/she is worker," +
                $"his/her wage is {wage}" +
                $"he/she works {hoursWorked} hours in a month");
        }
    }
}
