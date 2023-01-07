#include <iostream>
using namespace std;


int main()
{
	int a[8] = {0,1,9,2,4,3,6,5};
	int k , r, x;
	int n = 8;
	bool p;
	
	p = true;
	k = n - 1;
	while(p == true)
	{
		p = false;
		r = k;
		for(int j = 0;j < r;j++) {
		     if(a[j] < a[j + 1]) 
		     {
		     x = a[j];
		     a[j] = a[j + 1];
		     a[j + 1] = x;
		     p = true;
		     k = j;
		 }
		 }
	}
	for(int i = 0;i < n;i++)
	cout << a[i] << endl;
}
