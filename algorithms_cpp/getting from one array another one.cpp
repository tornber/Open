#include <bits/stdc++.h>

using namespace std;

int n, m, a[1000][100], b[1000][100], i, j;

int main ()
{
cin>>n>>m;

for(int i=0;i<n;i++)
for(int j=0;j<m;j++)
cin>>a[i][j];

b[0][0]=a[0][0];

for(int j=1;j<m;j++)
b[0][j]=max(b[0][j-1], a[0][j]);

for(int i=1;i<n;i++)
b[i][0]=max(b[i-1][j-1], a[i][0]);

for(int i=0;i<n;i++)
for(int j=0;j<m;j++)
{
b[i][j]=max(b[i-1][j], b[i][j-1]);
b[i][j]=max(b[i][j], a[i][j]);
}

for (i=0; i<n; i++)
  	 {
	   for (j=0; j<m; j++)
       cout<<b[i][j];
       
	   cout<<endl;
	 }
}

