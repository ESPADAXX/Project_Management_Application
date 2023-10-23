package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.model.Project;
import java.util.List;
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    @Query("SELECT p from Project p WHERE p.dateFin>CURRENT_DATE")
    List<Project> findProjectByDateFinBeforeEnd();
}
