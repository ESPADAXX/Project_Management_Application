package server.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import server.model.User;
import server.service.UserService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

	private final UserService userService;
	public UserController(UserService userService) {
		this.userService = userService;
	}



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
	public ResponseEntity<String> updateUser(@PathVariable Integer id, @RequestBody User user , @RequestBody MultipartFile file) throws IOException {
		return userService.updateUser(id, user,file);

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

