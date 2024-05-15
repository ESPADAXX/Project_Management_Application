package server.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserRequest {
    @NotEmpty(message = "the fullName must not be empty")
    String fullName;

    @NotEmpty(message = "the email must not be empty")
    String email;

    @Pattern(regexp = "^(07|06|05)\\d{8}$", message = "It should start with 07, 06, or 05 followed by 8 numbers.")
    String phone;

    @NotNull(message = "choose a department")
    Integer department;

    @NotNull(message = "choose a role")
    Integer role;
}
