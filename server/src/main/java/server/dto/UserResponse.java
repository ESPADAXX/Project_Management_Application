package server.dto;

import lombok.Data;
import server.model.User;
@Data
public class UserResponse {
    private User user;
    private String message;


    public UserResponse(User user, String message) {
        this.user = user;
        this.message = message;
    }

}