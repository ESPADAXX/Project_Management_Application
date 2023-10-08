package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.model.Role;
import server.model.User;
import server.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping
	public ResponseEntity<List<User>> findAll() {
		List<User> users = userService.findAll();
		return ResponseEntity.ok(users);
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> findById(@PathVariable Integer id) {
		User user = userService.findById(id);
		return ResponseEntity.ok(user);
	}

	@PostMapping
	public ResponseEntity<String> addUser(@RequestBody User user) {
		return userService.addUser(user);
	}


	@PutMapping("/{id}")
	public ResponseEntity<String> updateUser(@PathVariable Integer id, @RequestBody User user) {
		return userService.updateUser(id, user);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
		return userService.deleteUser(id);

	}
	@PostMapping("/roleToUser")
	public void addRoleToUser(@RequestBody String role,@RequestBody String userName) {
		userService.addRoleToUser(userName,role);
	}

	@GetMapping("/role/{id}")
	public List<User> usersByRole(@PathVariable Integer id){
		return userService.findUsersByRoleId(id);
	}
	@GetMapping("/Department/{id}")
	public List<User> usersByDepartment(@PathVariable Integer id){
		return userService.findUsersByDepartmentId(id);
	}
}

