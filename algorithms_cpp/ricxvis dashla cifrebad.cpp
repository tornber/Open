#include <bits/stdc++.h> 
using namespace std;


int main()
{
     int k, m, N, L, b[200];
     cin >> N;
	 k= -1;
     L = N;
     while(L >= 1)
     {
     	L /= 10;
     	k++;
	 }
	 m = k;
     while(N >= 1)
     {
     	
     	b[k] = N % 10;
     	N /= 10;
     	k--;
	 }
	for(int i=0;i<=m; i++)
    cout << b[i] << endl;
}
