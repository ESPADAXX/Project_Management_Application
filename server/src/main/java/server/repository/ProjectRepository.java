package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
}
