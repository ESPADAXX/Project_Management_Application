package server.service;

import org.springframework.http.ResponseEntity;
import server.model.Role;

import java.util.List;

public interface RoleService {
    ResponseEntity<String> addRole(Role role);

    List<Role> findAllRoles();

    Role findRoleById(Integer id);

    ResponseEntity<String> updateRole(Integer id, Role role);

    ResponseEntity<String> deleteRole(Integer id);

    List<Role> findRoleByDepartmentId(Integer id);
}
