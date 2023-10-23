package server.service;

import org.springframework.http.ResponseEntity;
import server.dto.TaskCountDto;
import server.model.Task;

import java.util.List;

public interface TaskService {
    ResponseEntity<String> addTask(Task task);

    List<Task> findAllTasks();

    Task findTaskById(Integer id);

    ResponseEntity<String> updateTask(Integer id, Task task);

    ResponseEntity<String> deleteTask(Integer id);
    List<Task> findTasksByUserId(Integer id);
    List<Task> findUndoneTasksSortedByEndDateAndUserId(Integer id);

    List<TaskCountDto> findTasksGroupedByDepartment();

    List<Task> findTasksByProjectId(Integer id);
}
