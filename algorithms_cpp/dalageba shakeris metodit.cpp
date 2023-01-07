#include <iostream>
using namespace std;


int main()
{
	int a[8] = {0,1,9,2,4,3,6,5};
	int k,x,r,t,l,max;
	int n = 8;
	bool p;
	p = true;
	k = n - 1;
	t = 0;
	while(p == true)
	{
		p = false;
		r = k;
		l = t;
		for(int i = l;i < r;i++)
		{
		if(a[i] > a[i + 1])
		{
			x = a[i];
			a[i] = a[i + 1];
			a[i + 1] = x;
			p = true;
			k = i;
		}
	}
	if(p == true)
	{
		p = false;
		for(int j = k - 1;j > l;j--)
		{
			if(a[j] > a[j + 1])
			{
				x = a[j];
				a[j] = a[j + 1];
				a[j + 1] = x;
				p = true;
				t = j + 1;
			}	
		}
	}
	}
	for(int i = 0;i < n;i++)
	cout << a[i] << endl;
}
