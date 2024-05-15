package server.controller;
import jakarta.websocket.server.PathParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import server.dto.PasswordRequest;
import server.dto.UserRequest;
import server.model.Task;
import server.model.User;
import server.service.UserService;

import java.io.IOException;
import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:8081")
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
	public ResponseEntity<Map<String,Object>> updateUser(@PathVariable Integer id, @RequestBody UserRequest user) {
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

	@GetMapping("/department")
	public List<User> usersByDepartment(
			@RequestParam(required = false, name = "id") Integer id
	){
		if(id!=null){
			return userService.findUsersByDepartmentId(id);
		}
		return userService.findAll();
	}

	@GetMapping("/page")
	public Page<User> getPaginatedUsers(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(required = false) Integer role,
			@RequestParam(required = false) Integer department
	) {
		PageRequest pageRequest = PageRequest.of(page, size);

		if (role != null && department != null) {
			return userService.getUsersByRoleAndDepartment(role, department, pageRequest);
		} else if (role != null) {
			return userService.getUsersByRole(role, pageRequest);
		} else if (department != null) {
			return userService.getUsersByDepartment(department, pageRequest);
		} else {
			return userService.getPaginatedUsers(pageRequest);
		}
	}
	@PostMapping("/password")
	public ResponseEntity<Map<String,Object>> changeUserPassword(@RequestBody PasswordRequest formData){

		return userService.changePassword(formData);
	}
	@PostMapping("/image/{id}")
	public ResponseEntity<Map<String,Object>> changePhoto(@RequestParam("photo") MultipartFile photo, @PathVariable Integer id)throws IOException{
		System.out.println(photo);
		return userService.changePhoto(id,photo);
	}
	@GetMapping("image/{id}")
	public ResponseEntity<byte[]> getPhoto(@PathVariable Integer id) {
		byte[] photo = userService.getUserPhoto(id);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_JPEG);
		return new ResponseEntity<>(photo, headers, HttpStatus.OK);
	}
}

