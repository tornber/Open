#include <iostream>
using namespace std;


	int i, j, N, M, k, a[10000], b[10000], c[20000]; 

int main ()
{
cin>>N>>M;

for(i=0; i<N; i++)
cin>>a[i];

for(i=0; i<M; i++)
cin>>b[i];


	for(i = 0;i < N;i++) {
	c[i] = a[i] - b[i] + c[i];
	if(c[i] <= 0)
	{
		c[i] = c[i] + 10;
		c[i + 1]--;
	}
    }
	while(c[N] == 0) {
		N--;
	}
	for(i = N;i >= 0;i--)
	cout << c[i] << endl;
}
