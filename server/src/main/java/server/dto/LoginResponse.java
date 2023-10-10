package server.dto;

import lombok.Data;
import server.model.User;
@Data
public class LoginResponse {
    private String message;
    private User user;

    public LoginResponse(String message, User user) {
        this.message = message;
        this.user = user;
    }

}
