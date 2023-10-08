package server.service;

import org.springframework.http.ResponseEntity;
import server.model.Project;

import java.util.List;

public interface ProjectService {
    ResponseEntity<String> addProject(Project project);

    List<Project> findAllProjects();

    Project findProjectById(Integer id);

    ResponseEntity<String> updateProject(Integer id, Project project);

    ResponseEntity<String> deleteProject(Integer id);
}
