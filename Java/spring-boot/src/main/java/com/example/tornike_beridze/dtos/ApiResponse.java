package dtos;

import java.util.HashMap;
import java.util.Map;

public class ApiResponse {

    private Map<String,Object> data = new HashMap<>();
    private Map<String,Object> error = new HashMap<>();

    public ApiResponse(String key,Object value) {
        this.data.put(key,value);
    }

    public ApiResponse addError(String key,Object value) {
        this.error.put(key,value);
        return this;
    }
}
