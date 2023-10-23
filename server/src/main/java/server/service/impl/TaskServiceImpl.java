package server.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import server.dto.TaskCountDto;
import server.model.Task;
import server.repository.TaskRepository;
import server.service.TaskService;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public ResponseEntity<String> addTask(Task task) {
        taskRepository.save(task);
        return ResponseEntity.status(HttpStatus.CREATED).body("Task added successfully");
    }

    @Override
    public List<Task> findAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task findTaskById(Integer id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid task id " + id));
    }

    @Override
    public ResponseEntity<String> updateTask(Integer id, Task task) {
        taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid task id " + id));
        task.setId(id);
        taskRepository.save(task);
        return ResponseEntity.ok("Task updated successfully");
    }

    @Override
    public ResponseEntity<String> deleteTask(Integer id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid task id " + id));

        taskRepository.delete(task);
        return ResponseEntity.ok("Task deleted successfully");
    }

    @Override
    public List<Task> findTasksByUserId(Integer id) {
        return null;
    }


    @Override
    public List<Task> findUndoneTasksSortedByEndDateAndUserId(Integer id) {
        return taskRepository.findUndoneTasksSortedByEndDateAndUserId(id);
    }

    @Override
    public List<TaskCountDto> findTasksGroupedByDepartment() {
        return taskRepository.findTasksGroupedByDepartment();
    }

    @Override
    public List<Task> findTasksByProjectId(Integer id) {
        return taskRepository.findTasksByProjectId(id);
    }
}

