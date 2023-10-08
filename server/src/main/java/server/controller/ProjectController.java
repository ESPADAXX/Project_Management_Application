package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.model.Project;
import server.service.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/")
    public ResponseEntity<List<Project>> findAllProjects() {
        List<Project> projects = projectService.findAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> findProjectById(@PathVariable Integer id) {
        Project project = projectService.findProjectById(id);
        return ResponseEntity.ok(project);
    }

    @PostMapping("/")
    public ResponseEntity<String> addProject(@RequestBody Project project) {
        return projectService.addProject(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProject(@PathVariable Integer id, @RequestBody Project project) {
        return projectService.updateProject(id, project);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Integer id) {
        return projectService.deleteProject(id);
    }
}

