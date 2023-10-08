package server.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import server.model.Project;
import server.repository.ProjectRepository;
import server.service.ProjectService;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public ResponseEntity<String> addProject(Project project) {
        projectRepository.save(project);
        return ResponseEntity.status(HttpStatus.CREATED).body("Project added successfully");
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
    public ResponseEntity<String> updateProject(Integer id, Project project) {
        projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid project id " + id));
        project.setId(id);
        projectRepository.save(project);
        return ResponseEntity.ok("Project updated successfully");
    }

    @Override
    public ResponseEntity<String> deleteProject(Integer id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid project id " + id));

        projectRepository.delete(project);
        return ResponseEntity.ok("Project deleted successfully");
    }
}
