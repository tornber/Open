#include <stdio.h>

int main() {
	int number,num,reversed = 0,raodenoba = 0;
	
    scanf("%i",&number);
    if(number > 9 && number < 100) {
    while(number != 0)
    {
    	reversed *= 10;
    	reversed = reversed + number % 10;
    	number /= 10;
    	if(number == 0) {
    		raodenoba++;
		}
	}

    }
    printf("reverse nubmer is %i\n",reversed);
    printf("raodenoba= %i\n",raodenoba);
    
    
	return 0;
}



