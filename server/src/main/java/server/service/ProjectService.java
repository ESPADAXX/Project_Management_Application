package server.service;

import org.springframework.http.ResponseEntity;
import server.model.Project;

import java.util.List;
import java.util.Map;

public interface ProjectService {
    ResponseEntity<Map<String, Object>> addProject(Project project);

    List<Project> findAllProjects();

    Project findProjectById(Integer id);

    ResponseEntity<Map<String, Object>> updateProject(Integer id, Project project);

    ResponseEntity<String> deleteProject(Integer id);

     List<Project> findProjectByDate();
}
