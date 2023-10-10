package server.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;



@Data
public class RegisterRequest {

    @Valid

    @NotEmpty(message = "Full name is required")
    private String fullName;

    @NotEmpty(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotEmpty(message = "Password is required")
    private String password;

    @NotEmpty(message = "Confirmation password is required")
    private String confirmationPassword;
    public RegisterRequest(String fullName, String email, String password, String confirmationPassword) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.confirmationPassword = confirmationPassword;
    }


}
