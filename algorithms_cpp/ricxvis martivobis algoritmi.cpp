#include <iostream>
#include <math.h>
#include <string>
using namespace std;


int main()
{
	string p;
	int i,a;
	cin >> a;
	p = "martivia";
	for(i = 2;i < int(sqrt(a)) + 1;i++) {
	if(a % i == 0 && i < a)
	p = "shedgenilia"; 
	break;
    }
    cout << p << endl;
}

