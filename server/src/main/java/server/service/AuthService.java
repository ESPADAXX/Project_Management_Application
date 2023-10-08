package server.service;

import org.springframework.http.ResponseEntity;
import server.dto.LoginRequest;
import server.dto.UserResponse;
import server.model.User;

public interface AuthService {
    ResponseEntity<String> register(User user);

    ResponseEntity<UserResponse>   login(LoginRequest loginRequest);
}
