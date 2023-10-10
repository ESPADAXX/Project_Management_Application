package server.service;

import org.springframework.http.ResponseEntity;
import server.dto.LoginRequest;
import server.dto.LoginResponse;
import server.dto.RegisterRequest;
import server.dto.UserResponse;
import server.model.User;

import java.util.Map;

public interface AuthService {
    ResponseEntity<Map<String,String>> register(RegisterRequest user);

    ResponseEntity<LoginResponse>   login(LoginRequest loginRequest);
}
