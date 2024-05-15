package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.dto.TaskCountDto;
import server.dto.TaskRequest;
import server.model.Department;
import server.model.Task;
import server.service.TaskService;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/task")
public class TaskController {


    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> findAllTasks() {
        List<Task> tasks = taskService.findAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> findTaskById(@PathVariable Integer id) {
        Task task = taskService.findTaskById(id);
        return ResponseEntity.ok(task);
    }

    @PostMapping
    public ResponseEntity<Map<String,Object>> addTask(@RequestBody TaskRequest task){
        return taskService.addTask(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String,Object>> updateTask(@PathVariable Integer id, @RequestBody TaskRequest task) {
        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,Object>> deleteTask(@PathVariable Integer id) {
        return taskService.deleteTask(id);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Task>> findTaskByIdUser(@PathVariable Integer id){
        return ResponseEntity.ok(taskService.findUndoneTasksSortedByEndDateAndUserId(id));
    }
    @GetMapping("/department")
    public ResponseEntity<List<TaskCountDto>> findTasksGroupedByDepartment(){
        return ResponseEntity.ok(taskService.findTasksGroupedByDepartment());
    }
    @GetMapping("/project/{id}")
    public ResponseEntity<List<Task>> findTasksByProjectId(@PathVariable Integer id){
        return ResponseEntity.ok(taskService.findTasksByProjectId(id));
    }

    @GetMapping("/page")
    public Page<Task> getPaginatedTasks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Integer project,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer department
    ) {
        PageRequest pageRequest = PageRequest.of(page, size);

        if (status != null && department != null) {
            return taskService.getTasksByStatusAndDepartment(status, department, pageRequest);
        }else if (status != null && project != null) {
            return taskService.getTasksByStatusAndProject(status, project, pageRequest);
        } else if (status != null) {
            return taskService.getTasksByStatus(status, pageRequest);
        } else if (department != null) {
            return taskService.getTasksByDepartment(department, pageRequest);
        }else if (project != null) {
            return taskService.getTasksByProject(project, pageRequest);
        } else {
            return taskService.getPaginatedTasks(pageRequest);
        }
    }
}

