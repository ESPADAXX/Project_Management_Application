package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.model.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findByName(String roleName);
}
