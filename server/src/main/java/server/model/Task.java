package server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotEmpty(message = "the title must not be empty")
    private String title;

    @NotEmpty(message = "the description must not be empty")
    @Size(message = "The description field must be between 10 and 255 characters.")
    private String description;

    @NotNull(message = "choose a user")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull(message = "the End Date must not be empty")
    private Date dateFin;
    @NotNull(message = "the End Date must not be empty")
    private Date dateDebut;

    @NotEmpty(message = "choose a status")
    private String status;

    @NotNull(message = "choose a project")
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;


    @NotNull(message = "choose a department")
    @ManyToOne
    @JoinColumn(name = "departement_id")
    private Department department;

    public Task(String title, String description, Date dateFin, Date dateDebut, String status, User user, Project project, Department department) {
        this.title = title;
        this.description = description;
        this.user = user;
        this.dateFin = dateFin;
        this.dateDebut = dateDebut;
        this.status = status;
        this.project = project;
        this.department = department;
    }
}