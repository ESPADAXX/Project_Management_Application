package server.model;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @NotEmpty(message = "the title must not be empty")
    @Column(nullable = false)
    private String title;

    @NotEmpty(message = "the description must not be empty")
    @Size(message = "The description field must be between 10 and 255 characters.")
    @Column(nullable = false,columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "the start Date must not be empty")
    private Date dateDebut = new Date();


    @NotNull(message = "the End Date must not be empty")
    private Date dateFin;


    private Integer price;

    @NotEmpty(message = "the client must not be empty")
    private String client;

    @AssertTrue(message = "the price must not be empty or zero")
    private boolean isPrice() {
        return price != null && price > 0;
    }
}
