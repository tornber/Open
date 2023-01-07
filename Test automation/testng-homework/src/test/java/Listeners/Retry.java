package Listeners;
import Annotations.RetryFailedTests;
import org.testng.IRetryAnalyzer;
import org.testng.ITestResult;

public class Retry implements IRetryAnalyzer {

    int count = 0;

    @Override

    public boolean retry(ITestResult result) {

        RetryFailedTests annotation = result.getMethod().getConstructorOrMethod().getMethod()
                .getAnnotation(RetryFailedTests.class);

//        result.getTestContext().getSkippedTests().removeResult(result.getMethod());

        if((annotation != null) && (count < annotation.value())) {
            count++;
            return true;
        }
        return false;
    }
}
