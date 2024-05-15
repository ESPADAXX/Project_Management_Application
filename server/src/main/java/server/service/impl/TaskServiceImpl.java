package server.service.impl;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import server.dto.TaskCountDto;
import server.dto.TaskRequest;
import server.model.Department;
import server.model.Project;
import server.model.Task;
import server.model.User;
import server.repository.DepartmentRepository;
import server.repository.ProjectRepository;
import server.repository.TaskRepository;
import server.repository.UserRepository;
import server.service.TaskService;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private Validator validator;
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public ResponseEntity<Map<String,Object>> addTask(TaskRequest task) {
        Map<String,Object> response = new HashMap<>();
        List<Map<String,Object>> errorsList=new ArrayList<>();
        Set<ConstraintViolation<TaskRequest>> violations = validator.validate(task);
        Map<String, Object> errorMap = new HashMap<>();
        if (!violations.isEmpty()) {
            for(ConstraintViolation<TaskRequest> violation : violations) {
                errorMap.put(violation.getPropertyPath().toString(), violation.getMessage());
            }
            LocalDate dateDebut = task.getDateDebut().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            LocalDate dateFin = task.getDateFin().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

            if (dateDebut.getDayOfMonth() == dateFin.getDayOfMonth()) {
                errorMap.put("date", "the dates are the same");
            }
            errorsList.add(errorMap);
        }

        if (!errorsList.isEmpty()){
            response.put("status",false);
            response.put("errors",errorsList);
            response.put("message","Failed to add your task. Please review the following errors.");
            return ResponseEntity.status(200).body(response);
        }
        User userSelected=userRepository.findUsersById(task.getUser());
        Department departmentSelected=departmentRepository.findDepartmentById(task.getDepartment());
        Project projectSelected=projectRepository.findProjectById(task.getProject());
        Task newTask = new Task(task.getTitle(), task.getDescription(),task.getDateDebut() ,task.getDateFin(),task.getStatus(),userSelected,projectSelected,departmentSelected);
        taskRepository.save(newTask);
        response.put("status", true);
        response.put("message", "Task added successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Override
    public List<Task> findAllTasks() {
        return taskRepository.findAll();
    }
    @Override
    public Page<Task> getPaginatedTasks(Pageable pageable){
        return  taskRepository.findAll(pageable);
    }
    @Override
    public Page<Task> getTasksByStatus(String status, Pageable pageable) {
        return taskRepository.findTasksByStatus(status, pageable);
    }
    @Override
    public Page<Task> getTasksByDepartment(Integer department, Pageable pageable) {
        Department departmentselected = departmentRepository.findDepartmentById(department);
        System.out.println(departmentselected);
        return taskRepository.findByDepartment(departmentselected, pageable);
    }

    @Override
    public Page<Task> getTasksByProject(Integer projectId, Pageable pageable) {
        Project projectSelected = projectRepository.findProjectById(projectId);
        System.out.println(projectSelected);
        return taskRepository.findByProject(projectSelected, pageable);
    }

    @Override
    public Page<Task> getTasksByStatusAndDepartment(String status, Integer department, Pageable pageable) {
        Department departmentSelected = departmentRepository.findDepartmentById(department);
        return taskRepository.findByStatusAndDepartment(status, departmentSelected, pageable);
    }

    @Override
    public Page<Task> getTasksByStatusAndProject(String status, Integer projectId, Pageable pageable) {
        Project projectSelected = projectRepository.findProjectById(projectId);
        return taskRepository.findByStatusAndProject(status, projectSelected, pageable);
    }

    @Override
    public Task findTaskById(Integer id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid task id " + id));
    }

    @Override
    public ResponseEntity<Map<String,Object>> updateTask(Integer id, TaskRequest task) {
        Task existingTask=taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid task id " + id));
        Map<String,Object> response = new HashMap<>();
        List<Map<String,Object>> errorsList=new ArrayList<>();
        Set<ConstraintViolation<TaskRequest>> violations = validator.validate(task);
        Map<String, Object> errorMap = new HashMap<>();
        if (!violations.isEmpty()) {
            for(ConstraintViolation<TaskRequest> violation : violations) {
                errorMap.put(violation.getPropertyPath().toString(), violation.getMessage());
            }
            LocalDate dateDebut = task.getDateDebut().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            LocalDate dateFin = task.getDateFin().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

            if (dateDebut.getDayOfMonth() == dateFin.getDayOfMonth()) {
                errorMap.put("date", "the dates are the same");
            }
            errorsList.add(errorMap);
        }

        if (!errorsList.isEmpty()){
            response.put("status",false);
            response.put("errors",errorsList);
            response.put("message","Failed to update your task. Please review the following errors.");
            return ResponseEntity.status(200).body(response);
        }
        User userSelected=userRepository.findUsersById(task.getUser());
        Department departmentSelected=departmentRepository.findDepartmentById(task.getDepartment());
        Project projectSelected=projectRepository.findProjectById(task.getProject());
        existingTask.setId(id);
        existingTask.setTitle(task.getTitle());
        existingTask.setStatus(task.getStatus());
        existingTask.setDescription(task.getDescription());
        existingTask.setDateDebut(task.getDateDebut());
        existingTask.setDateFin(task.getDateFin());
        existingTask.setUser(userSelected);
        existingTask.setDepartment(departmentSelected);
        existingTask.setProject(projectSelected);

        taskRepository.save(existingTask);
        response.put("status", true);
        response.put("message", "Task Updated successfully");
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String,Object>> deleteTask(Integer id) {
        Map<String,Object> response = new HashMap<>();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid task id " + id));

        taskRepository.delete(task);
        response.put("status", true);
        response.put("message", "Task deleted successfully");
        return ResponseEntity.ok(response);
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

