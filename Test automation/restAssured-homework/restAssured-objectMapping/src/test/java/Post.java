import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.util.Date;

@JsonPropertyOrder(alphabetic = true)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class Post {

    @JsonProperty("changedName")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    @JsonProperty("changedJob")
    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    private String name;
    private String job;
    public String id;
    public Date createdAt;
}
