#include <iostream>
using namespace std;

const int N = 3,M = 3;
int main()
{
	int i,a[N] = {7,8,3};
	int b[M] = {8,6,9};
	int k = max(N,M) + 1;
	k--;
	int c[k];
	
	for(i = 0;i < k;i++)
	{
		c[i] = a[i] + b[i] + c[i];
		if(c[i] >= 10)
		{
			c[i] = c[i] % 10;
			c[i+ 1] += 1;
		}
	}
	if(c[k] == 0)
	k--;
	for(i = k;i >= 0;i--)
	cout << c[i] << endl;
}



