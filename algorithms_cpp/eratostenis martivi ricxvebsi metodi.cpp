#include <bits/stdc++.h>
using namespace std;


int N,i,j,b[1000];

int main()
{
	cin >> N;
	N = (N + 1) / 2;
	b[0] = 2;
	for(i = 2;i < N;i++) {
	b[i] = (2 * i) - 1;
    }
    j = 2;
    while(j <= N){
    i = j + b[j];
    while(i <= N){
    b[i] = 0;
    i = i + b[j];
    }
    j = j + 1;
      while(j <=N && b[j] == 0)
      j = j + 1;
    }
    for(i = 0;i < N;i++)
    cout << b[i] << " ";
    cout << endl;
}




