package server.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.dto.LoginRequest;
import server.dto.UserResponse;
import server.model.User;
import server.service.AuthService;


@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    private ResponseEntity<String> register(@RequestBody User user){
        return authService.register(user);
    }

    @PostMapping("/login")
    private ResponseEntity<UserResponse> login(@RequestBody LoginRequest loginRequest){
        return authService.login(loginRequest);
    }
}
