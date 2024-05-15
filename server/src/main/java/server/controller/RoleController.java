package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.model.Role;
import server.service.RoleService;

import java.util.List;

@RestController
@RequestMapping("/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping
    public ResponseEntity<List<Role>> findAllRoles() {
        List<Role> roles = roleService.findAllRoles();
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Role> findRoleById(@PathVariable Integer id) {
        Role role = roleService.findRoleById(id);
        return ResponseEntity.ok(role);
    }

    @PostMapping
    public ResponseEntity<String> addRole(@RequestBody Role role) {
        return roleService.addRole(role);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateRole(@PathVariable Integer id, @RequestBody Role role) {
        return roleService.updateRole(id, role);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRole(@PathVariable Integer id) {
        return roleService.deleteRole(id);
    }

    @GetMapping("/department/{id}")
    public  List<Role> getRoleByDepartmentId(@PathVariable Integer id){
        if (id!=null){
            return  roleService.findRoleByDepartmentId(id);
        }
        return roleService.findAllRoles();
    }
}

