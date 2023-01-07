package Models.Response.Deserilization;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.deser.std.DateDeserializers;

public record UsersDe(@JsonProperty("name") String name,
                      @JsonProperty("job") String job,
                      @JsonProperty("id") int id,
                      @JsonProperty("createdAt") String createdAt) {

}
