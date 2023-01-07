#include <bits/stdc++.h>
using namespace std;


int main() 
{
	int L, R, i, n, x, m, a[1000];
	cin >> n ;
	x = 7;
	for( i = 0;i < n ;i++) 
		cin >> a[i];
		
	L = 0;
	R = n;
    while(L < R) {
    m = (R + L) / 2;
   	if(a[m] > x ) 
	 L = m + 1;
    else 
	R = m;
    }
    if(a[R] == x){
    cout << "elementis indexia" << R << endl;
    }
    else cout << "aseti elementi ver moidzebna" << endl;
}
