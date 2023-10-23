package server.service.impl;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import server.dto.LoginRequest;
import server.dto.LoginResponse;
import server.dto.RegisterRequest;
import server.dto.UserResponse;
import server.model.User;
import server.repository.UserRepository;
import server.service.AuthService;
import org.springframework.security.crypto.bcrypt.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public ResponseEntity<Map<String, String>> register(RegisterRequest user) {
        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null) {
            Map<String, String> response = new HashMap<>();
            response.put("email", "The email is already in use.");

            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        if (!Objects.equals(user.getPassword(), user.getConfirmationPassword())){
            Map<String,String> response = new HashMap<>();
            response.put("confirmationPassword","Password and confirmation password do not match.");

            return ResponseEntity.status(400).body(response);

        }
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());

        User newUser = new User(user.getFullName(), user.getEmail(), hashedPassword);

        userRepository.save(newUser);

        Map<String,String> response = new HashMap<>();
        response.put("message","registered succesfully");
        return ResponseEntity.ok().body(response);
    }

    @Override
    public ResponseEntity<LoginResponse> login(LoginRequest loginRequest) {
        User existingUser = userRepository.findByEmail(loginRequest.getEmail());

        if (existingUser != null && BCrypt.checkpw(loginRequest.getPassword(), existingUser.getPassword())) {
            String message= "Login successful";
            LoginResponse res= new LoginResponse(message,existingUser);
            return ResponseEntity.ok().body(res);
        }else {
            String message= "Email or password is incorrect";
            LoginResponse res= new LoginResponse(message,null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);

        }
    }

}
