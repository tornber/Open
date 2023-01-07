#include <iostream>
using namespace std;


main()
{
	int m[6] = {1,3,0,4,7,2};
	int x;
	cin >> x;
	int k = -1;
	for(int i = 0;i < 6;i++)
	if(m[i] == x)
	{
	k = i;
	break;
	}
	if(k == -1) cout << "ar aris" << "\n";
	else cout << k << endl;
	
}
