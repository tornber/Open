#include <iostream>
using namespace std;


int main()
{
    t[0][0] = 0;
	for(j = 0;j < m;j++){
		t[0][j] = 0;
	}	
	for(i = 0;i < n;i++){
		t[i][0] = 0;
	}
	for(i = 0;i <n;i++)
	   for(j=0;j<m;j++) 
	    if(M[i]<=j){
	    t[i][j] =max(t[i-1][j],t[i-1][j-M[i]] + c[i])	
		} else {
			t[i][j] = t[i-1][j];
		}
}






