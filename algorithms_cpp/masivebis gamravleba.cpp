#include <iostream>
using namespace std;

int i, j, n, m, k, a[1000], b[1000], c[20000]; 

int main ()
{
   cin>>n>>m;

   for(i=0; i<n; i++)
   cin>>a[i];

   for(i=0; i<m; i++)
   cin>>b[i];

   k=n+m;     

  for(i=0; i<m; i++) 
     for(j=0; j<n; j++)
      c[i+j]=a[j]*b[i]+c[i+j];
   
      for(i=0; i<k-1; i++)
	  c[i+1]=c[i+1]+c[i]/10;
	   c[i]=c[i]%10;
	   
   while(c[k]==0)
   k--;

   for(i=k; i>=0; i--)
    cout<<c[i]<<" ";
    cout<<endl;
}

