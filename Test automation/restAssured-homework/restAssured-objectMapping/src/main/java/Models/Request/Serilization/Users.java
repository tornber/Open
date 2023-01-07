package Models.Request.Serilization;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NonNull;

public record Users(@JsonProperty("name") @NonNull String name,
                    @JsonProperty("job") @NonNull String job){
}
