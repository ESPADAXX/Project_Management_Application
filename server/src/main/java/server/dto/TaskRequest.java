package server.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import server.model.Department;
import server.model.Project;
import server.model.User;

import java.util.Date;

@Data
public class TaskRequest {

    @NotEmpty(message = "the title must not be empty")
    private String title;

    @NotEmpty(message = "the description must not be empty")
    @Size(message = "The description field must be between 10 and 255 characters.")
    private String description;

    @NotNull(message = "choose a user")
    private Integer user;

    @NotNull(message = "the End Date must not be empty")
    private Date dateFin;
    @NotNull(message = "the End Date must not be empty")
    private Date dateDebut;

    @NotEmpty(message = "choose a status")
    private String status;

    @NotNull(message = "choose a project")
    private Integer project;


    @NotNull(message = "choose a department")
    private Integer department;

    public TaskRequest(String title, String description, Integer userId, Date dateFin, Date dateDebut, String status, Integer project, Integer department) {
        this.title = title;
        this.description = description;
        this.user = userId;
        this.dateFin = dateFin;
        this.dateDebut = dateDebut;
        this.status = status;
        this.project = project;
        this.department = department;
    }
}
