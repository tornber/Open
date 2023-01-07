#include <bits/stdc++.h>
using namespace std;

int R, L, m, x, j, i, k, n, a[1000];
	
int main()
{

	cin >> n;
	for( i = 0;i < n ;i++)
		cin >> a[i];
	
	
	for(i = 1;i < n;i++)
	{
		R = i;
		L = 0;
		while(L < R)
		{
			m = (L + R) / 2;
			if(a[m] > a[i])
			  L = m + 1;
		  	      else 
			      R = m;
		}
		k = R;
		x = a[i];
		for( j = i;j >= k + 1;j--) {
		   a[j] = a[j - 1];
	}
	a[k] = x;
	}
	for(i = 0;i < n ;i++ )
	cout << a[i] << " ";
	cout << endl;
	
}
