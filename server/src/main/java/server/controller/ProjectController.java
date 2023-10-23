package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.model.Project;
import server.service.ProjectService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<Project>> findAllProjects() {
        List<Project> projects = projectService.findAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> findProjectById(@PathVariable Integer id) {
        Project project = projectService.findProjectById(id);
        return ResponseEntity.ok(project);
    }

    @PostMapping(consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> addProject(@RequestBody Project project) {
        return projectService.addProject(project);
    }
    @CrossOrigin(origins = "http://localhost:8081")
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateProject(@PathVariable Integer id, @RequestBody Project project) {
        return projectService.updateProject(id, project);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Integer id) {
        return projectService.deleteProject(id);
    }

    @GetMapping("/notExpired")
    public ResponseEntity<List<Project>> findProjectNotExpired(){
        return ResponseEntity.ok(projectService.findProjectByDate());
    }
}

