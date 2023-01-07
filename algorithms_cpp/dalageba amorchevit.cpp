#include <iostream>
using namespace std;


int main()
{
	int a[8] = {0,1,9,2,4,3,6,5};
	int k,max;
	int n = 8;
	for(int i = 0;i < n - 1;i++)
	{
		k = i;
		max = a[i];
		for(int j = i + 1;j < n;j++)
		{
			if (a[j] > max)
			{
				max = a[j];
				k = j;
			}
		}
		a[k] = a[i];
		a[i] = max;
	}
	for(int i = 0;i < n;i++)
	cout << a[i] << endl;
}
