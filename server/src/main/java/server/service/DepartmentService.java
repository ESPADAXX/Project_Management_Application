package server.service;

import org.springframework.http.ResponseEntity;
import server.model.Department;

import java.util.List;

public interface DepartmentService {
    ResponseEntity<String> addDepartment(Department department);

    List<Department> findAllDepartments();

    Department findDepartmentById(Integer id);

    ResponseEntity<String> updateDepartment(Integer id, Department department);

    ResponseEntity<String> deleteDepartment(Integer id);
}

