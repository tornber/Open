#include <iostream>
using namespace std;

int a,k,i,d,b[1000];
int main()
{
	cin >> a;
	k = -1;
	d = 2;
	while(a > 1) {
	if(a % d == 0)
	{
		k++;
		b[k] = d;
		a = a / d;
	}
	else 
	  if (d == 2)
	      d++;
	        else
	        d += 2;
	}
	for(i = 0;i <=k;i++)
	cout << b[i] << " ";
	cout << endl;
}

