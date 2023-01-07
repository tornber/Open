#include <bits/stdc++.h>
using namespace std;


int main() 
{
	int N,k,p,b[200];
	cin >> N >> p;
	k = -1;
	while(N>=1)
	{
		k++;
		b[k] = N % p;
		N = N / p;
	}
	for(int i = 0;i < k;i++)
	cout << b[i] << endl;
}
