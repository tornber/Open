#include <bits/stdc++.h>
using namespace std;


int main()
{
	int a,b,c,usg,usj;
	cin >> a >> b;
	c = a * b;
	while(a != 0 && b != 0)
	{
		if(a > b)
		a %= b;
		else 
		b = b % a;
	}
	usg = a + b;
	usj = c / usg;
	
	cout << "udidesi saerto gamyofi" << usg << endl;
	cout << "umciresi saerto jeradi" << usj << endl;
}
