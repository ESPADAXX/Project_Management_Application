package server.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import server.dto.TaskCountDto;
import server.dto.TaskRequest;
import server.model.Department;
import server.model.Task;

import java.util.List;
import java.util.Map;

public interface TaskService {
    ResponseEntity<Map<String,Object>> addTask(TaskRequest task);

    List<Task> findAllTasks();

    Page<Task> getPaginatedTasks(Pageable pageable);

    Page<Task> getTasksByStatus(String status, Pageable pageable);

    Page<Task> getTasksByDepartment(Integer departmentId, Pageable pageable);
    Page<Task> getTasksByProject(Integer projectId, Pageable pageable);

    Page<Task> getTasksByStatusAndDepartment(String status, Integer departmentId, Pageable pageable);
    Page<Task> getTasksByStatusAndProject(String status, Integer projectId, Pageable pageable);

    Task findTaskById(Integer id);

    ResponseEntity<Map<String,Object>> updateTask(Integer id, TaskRequest task);

    ResponseEntity<Map<String,Object>> deleteTask(Integer id);
    List<Task> findTasksByUserId(Integer id);
    List<Task> findUndoneTasksSortedByEndDateAndUserId(Integer id);

    List<TaskCountDto> findTasksGroupedByDepartment();

    List<Task> findTasksByProjectId(Integer id);
}
