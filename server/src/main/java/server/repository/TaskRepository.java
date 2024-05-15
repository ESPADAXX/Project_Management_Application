package server.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.dto.TaskCountDto;
import server.model.Department;
import server.model.Project;
import server.model.Task;


import java.util.List;


public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findTasksByDepartmentId(Integer Id);
    Page<Task> findTasksByStatus(String status, Pageable pageable);
    Page<Task> findByDepartment(Department department, Pageable pageable);
    Page<Task> findByProject(Project project, Pageable pageable);
    Page<Task> findByStatusAndDepartment(String status, Department department, Pageable pageable);
    Page<Task> findByStatusAndProject(String status, Project project, Pageable pageable);
    List<Task> findTasksByUserId(Integer Id);


    @Query("SELECT t FROM Task t WHERE t.status <> 'Done' AND t.user.id=:id ORDER BY t.dateFin ASC ")
    List<Task> findUndoneTasksSortedByEndDateAndUserId(Integer id);
    @Query("SELECT NEW server.dto.TaskCountDto(COUNT(t.id), d.name, t.status) FROM Task t JOIN t.department d GROUP BY t.department.id, t.status")
    List<TaskCountDto> findTasksGroupedByDepartment();
    List<Task> findTasksByProjectId(Integer id);
}
