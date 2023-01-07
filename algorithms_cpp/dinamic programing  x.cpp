#include <iostream>
using namespace std;


// s = 1 + 1/x + 1/x2 + 1/ xn x>0 jamis povna
int main()
{
	s[0] = 1;
	a[0] = 1;
	for(i = 0;i < N;i++)
	{
		a[i] = a[i - 1] / x;
		s[i] = s[i-1] + a[i];
	}
		for(i = 0;i < N;i++) 
		{
			cout << s[i] << " ";
			cout << endl;
		}
}






