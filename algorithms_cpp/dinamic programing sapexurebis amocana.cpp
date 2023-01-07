#include <iostream>
using namespace std;


int main()
{
	int n,m,i,j;
	int a[n][m],b[n][m];
	cin>> n >> m;
	for(i = 0;i<n;i++)
	     for(j = 0;j < m;j++)
	     cin>> a[i][j];
	
	b[0][0] = a[0][0];
	for(j = 0;j<m;j++)
	b[0][j] = a[0][j];
	for(i=0;i<n;i++)
	b[i][0] = a[i][0];
	
	if(a[i][j] == 1) {
		b[i][j] = min(b[i][j-1],b[i-1][j]);
		b[i][j] = min(b[i][j],b[i-1][j-1]) + 1;
	}
	
	for(i = 0;i<n;i++){
		for(j = 0;j<m;i++)
		cout << b[i][j] << " ";
		cout << endl;
	}
	mx = b[0][0]
	for(i = 0;i<n;i++){
		for(j = 0;j<m;i++)
		if(b[i][j] > mx)
		mx = b[i][j];
   }
	
	
}






