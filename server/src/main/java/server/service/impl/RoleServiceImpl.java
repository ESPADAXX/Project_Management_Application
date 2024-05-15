package server.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import server.model.Role;
import server.repository.RoleRepository;
import server.service.RoleService;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public ResponseEntity<String> addRole(Role role) {
        roleRepository.save(role);
        return ResponseEntity.status(HttpStatus.CREATED).body("Role added successfully");
    }

    @Override
    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role findRoleById(Integer id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid role id " + id));
    }

    @Override
    public ResponseEntity<String> updateRole(Integer id, Role role) {
        roleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid role id " + id));
        role.setId(id);
        roleRepository.save(role);
        return ResponseEntity.ok("Role updated successfully");
    }

    @Override
    public ResponseEntity<String> deleteRole(Integer id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid role id " + id));

        roleRepository.delete(role);
        return ResponseEntity.ok("Role deleted successfully");
    }

    @Override
    public List<Role> findRoleByDepartmentId(Integer id) {
        return roleRepository.findRoleByDepartmentId(id);
    }
}
