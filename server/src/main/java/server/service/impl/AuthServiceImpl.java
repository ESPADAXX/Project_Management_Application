package server.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import server.dto.LoginRequest;
import server.dto.UserResponse;
import server.model.User;
import server.repository.UserRepository;
import server.service.AuthService;
import org.springframework.security.crypto.bcrypt.*;

@Service
public class AuthServiceImpl implements AuthService {
    // Simulate a database or storage for user data
//    private final Map<String, User> usersDatabase = new HashMap<>();
    @Autowired
    private UserRepository userRepository;
    @Override
    public ResponseEntity<String> register(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity.status(409).body("The email is already in use.");
        }
        // Hash the password before storing it
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());

        // Create a new user with the hashed password
        User newUser = new User(user.getFullName(), user.getEmail(), hashedPassword);

        // Store the new user in the database
        userRepository.save(newUser);

        return ResponseEntity.ok().body("registered succesfully");
    }

    @Override
    public ResponseEntity<UserResponse> login(LoginRequest loginRequest) {
        System.out.println(loginRequest.getEmail());
        User existingUser = userRepository.findByEmail(loginRequest.getEmail());

        if (existingUser != null && BCrypt.checkpw(loginRequest.getPassword(), existingUser.getPassword())) {
            UserResponse response = new UserResponse(existingUser, "Login successful");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new UserResponse(null, "Login failed"));
        }
    }


}
