#include <bits/stdc++.h>
using namespace std;


int main()
{
	int k,n,x,a[1000],b[1000];
	cin >> n >> x;
	for(int i = 0;i < n;i++)
	cin >> a[i];
	k = -1;
	for(int i = 0;i < n;i++)
	if(a[i] == x)
	{
		k++;
		b[k] = i;
	}
	for(int i = 0;i <=k;i++)
	cout << b[i] << " " << endl;
	
}
