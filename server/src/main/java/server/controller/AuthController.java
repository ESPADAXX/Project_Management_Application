package server.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import server.dto.LoginRequest;
import server.dto.LoginResponse;
import server.dto.RegisterRequest;
import server.dto.UserResponse;
import server.model.User;
import server.service.AuthService;

import java.util.HashMap;
import java.util.Map;


@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    private ResponseEntity<Map<String,String>> register(@Valid @RequestBody RegisterRequest user){
        return authService.register(user);
    }

    @PostMapping("/login")
    private ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest){
        return authService.login(loginRequest);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String,String> handleValidationExceptions(MethodArgumentNotValidException ex){
        Map<String,String> erros=new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error)->{
            String fildName=((FieldError) error).getField();
            String errorMessage=error.getDefaultMessage();
            erros.put(fildName,errorMessage);
        });
        return erros;
    }
}
