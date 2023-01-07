#include <bits/stdc++.h>
using namespace std;


int main()
{
	int  s,r,i,m,b[1000];
	s = 0;
	r = 1;
	for(i = 0;i< N;i++)
	{
		s= (s+b[i] * r) % m;
		r = (r * 10) % m;
	}
}
