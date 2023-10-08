package server.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import server.model.Role;
import server.model.User;
import server.repository.RoleRepository;
import server.repository.UserRepository;
import server.service.UserService;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;

	@Override
	public ResponseEntity<String> addUser(User user) {
		userRepository.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).body("User added successfully");
	}

	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public User findById(Integer id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id " + id));
	}

	@Override
	public ResponseEntity<String> updateUser(Integer id, User user) {
		userRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id " + id));
		user.setId(id);
		userRepository.save(user);
		return ResponseEntity.ok("User updated successfully");
	}

	@Override
	public ResponseEntity<String> deleteUser(Integer id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id " + id));

		userRepository.delete(user);
		return ResponseEntity.ok("User deleted successfully");
	}

	@Override
	public void addRoleToUser(String userName, String roleName) {
		User user=userRepository.findByFullName(userName);
		Role role=roleRepository.findByName(roleName);
		user.setRole(role);
		userRepository.save(user);

	}

	@Override
	public List<User> findUsersByRoleId(Integer id) {
		return userRepository.findUsersByRoleId(id);
	}

	@Override
	public List<User> findUsersByDepartmentId(Integer id) {
		return userRepository.findUsersByDepartmentId(id);
	}
}
