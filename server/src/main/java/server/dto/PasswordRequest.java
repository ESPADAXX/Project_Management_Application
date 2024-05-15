package server.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class PasswordRequest {
    Integer id;

    @NotEmpty(message = "You must insert a password")
    String oldPassword;

    @NotEmpty(message = "You must insert a new password")
    String newPassword;

    @NotEmpty(message = "You must confirm the new password")
    String confirmPassword;

    @AssertTrue(message = "New password and confirm password do not match")
    public boolean isPasswordMatching() {
        // Add custom validation logic here to check if newPassword and confirmPassword are equal
        return newPassword != null && newPassword.equals(confirmPassword);
    }
}
