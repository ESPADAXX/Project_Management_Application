package server.service.impl;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import server.model.Project;
import server.repository.ProjectRepository;
import server.service.ProjectService;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private Validator validator;

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public ResponseEntity<Map<String, Object>> addProject(Project project) {
        Map<String,Object> response = new HashMap<>();
        List<Map<String,Object>> errorsList=new ArrayList<>();
        Set<ConstraintViolation<Project>> violations = validator.validate(project);
        Map<String, Object> errorMap = new HashMap<>();
        if (!violations.isEmpty()) {
            for(ConstraintViolation<Project> violation : violations) {
                errorMap.put(violation.getPropertyPath().toString(), violation.getMessage());
            }
            LocalDate dateDebut = project.getDateDebut().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            LocalDate dateFin = project.getDateFin().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

            if (dateDebut.getDayOfMonth() == dateFin.getDayOfMonth()) {
                errorMap.put("date", "the dates are the same");
            }
                errorsList.add(errorMap);
        }

        if (!errorsList.isEmpty()){
            response.put("status",false);
            response.put("errors",errorsList);
            response.put("message","Failed to add your project. Please review the following errors.");
            return ResponseEntity.status(200).body(response);
        }
        projectRepository.save(project);
        response.put("status", true);
        response.put("message", "Project added successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Override
    public List<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project findProjectById(Integer id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid project id " + id));
    }

    @Override
    public ResponseEntity<Map<String, Object>>updateProject(Integer id, Project project) {
        Project existingProject =projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid project id " + id));
        Map<String,Object> response = new HashMap<>();
        List<Map<String,Object>> errorsList=new ArrayList<>();
        Set<ConstraintViolation<Project>> violations = validator.validate(project);
        Map<String, Object> errorMap = new HashMap<>();
        if (!violations.isEmpty()) {
            for(ConstraintViolation<Project> violation : violations) {
                errorMap.put(violation.getPropertyPath().toString(), violation.getMessage());
            }
            LocalDate dateDebut = project.getDateDebut().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            LocalDate dateFin = project.getDateFin().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

            if (dateDebut.getDayOfMonth() == dateFin.getDayOfMonth()) {
                errorMap.put("date", "the dates are the same");
            }
            errorsList.add(errorMap);
        }

        if (!errorsList.isEmpty()){
            response.put("status",false);
            response.put("errors",errorsList);
            response.put("message","Failed to update your project. Please review the following errors.");
            return ResponseEntity.status(200).body(response);
        }
        existingProject.setId(project.getId());
        existingProject.setTitle(project.getTitle());
        existingProject.setDescription(project.getDescription());
        existingProject.setDateDebut(project.getDateDebut());
        existingProject.setDateFin(project.getDateFin());
        existingProject.setPrice(project.getPrice());
        existingProject.setClient(project.getClient());

        projectRepository.save(existingProject);
        response.put("status", true);
        response.put("message", "Project Updated successfully");
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String,Object>> deleteProject(Integer id) {
        Map<String,Object> response= new HashMap<>();
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid project id " + id));

        projectRepository.delete(project);
        response.put("message","Deleted successfully");
        response.put("status",true);
        return ResponseEntity.ok(response);
    }


    public List<Project> findProjectByDate() {
        return projectRepository.findProjectByDateFinBeforeEnd();
    }
}
