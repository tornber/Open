import org.testng.IRetryAnalyzer;
import org.testng.ITestResult;

public class Retry implements IRetryAnalyzer {
    int counter = 0;
    int retryLimit = 3;

    @Override

    public boolean retry(ITestResult result) {
        if(ITestResult.FAILURE == result.getStatus()) {
            if(counter < retryLimit) {
                counter++;
                return true;
            }
        }
        return false;
    }
}
