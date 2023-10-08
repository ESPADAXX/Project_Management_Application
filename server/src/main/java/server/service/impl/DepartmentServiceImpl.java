package server.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import server.model.Department;
import server.repository.DepartmentRepository;
import server.service.DepartmentService;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public ResponseEntity<String> addDepartment(Department department) {
        departmentRepository.save(department);
        return ResponseEntity.status(HttpStatus.CREATED).body("Department added successfully");
    }

    @Override
    public List<Department> findAllDepartments() {
        return departmentRepository.findAll();
    }

    @Override
    public Department findDepartmentById(Integer id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid department id " + id));
    }

    @Override
    public ResponseEntity<String> updateDepartment(Integer id, Department department) {
        departmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid department id " + id));
        department.setId(id);
        departmentRepository.save(department);
        return ResponseEntity.ok("Department updated successfully");
    }

    @Override
    public ResponseEntity<String> deleteDepartment(Integer id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid department id " + id));

        departmentRepository.delete(department);
        return ResponseEntity.ok("Department deleted successfully");
    }
}
