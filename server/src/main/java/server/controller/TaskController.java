package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.dto.TaskCountDto;
import server.model.Task;
import server.service.TaskService;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

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
    public ResponseEntity<String> addTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateTask(@PathVariable Integer id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Integer id) {
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
}

