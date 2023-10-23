package server.repository;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.dto.TaskCountDto;
import server.model.Task;

import java.util.List;
import java.util.Objects;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findTasksByDepartmentId(Integer Id);

    List<Task> findTasksByUserId(Integer Id);

    @Query("SELECT t FROM Task t WHERE t.status <> 'Done' AND t.user.id=:id ORDER BY t.dateFin ASC ")
    List<Task> findUndoneTasksSortedByEndDateAndUserId(Integer id);
    @Query("SELECT NEW server.dto.TaskCountDto(COUNT(t.id), d.name, t.status) FROM Task t JOIN t.department d GROUP BY t.department.id, t.status")
    List<TaskCountDto> findTasksGroupedByDepartment();
    List<Task> findTasksByProjectId(Integer id);
}
