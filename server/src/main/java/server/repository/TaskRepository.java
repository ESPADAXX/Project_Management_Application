package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.model.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findTasksByDepartmentId(Integer Id);

}
