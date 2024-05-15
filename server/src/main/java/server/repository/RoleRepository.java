package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.model.Role;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findByName(String roleName);
    Role findRoleById(Integer roleId);


    List<Role> findRoleByDepartmentId(Integer id);
}
