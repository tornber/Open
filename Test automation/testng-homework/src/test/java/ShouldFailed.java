import Annotations.RetryFailedTests;
import org.testng.Assert;
import org.testng.annotations.Test;

public class ShouldFailed {

    @Test
    @RetryFailedTests(10)

    public void test1() {
        for (int i = 0; i < 6; i++) {
            Assert.assertTrue(i > 4);
        }
    }

}
