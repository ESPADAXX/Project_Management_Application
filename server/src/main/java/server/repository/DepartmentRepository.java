package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.model.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {
}
