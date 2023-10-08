package server.service;


import org.springframework.http.ResponseEntity;
import server.model.Role;
import server.model.User;

import java.util.List;


public interface UserService {
	ResponseEntity<String> addUser(User user);

	List<User> findAll();

	User findById(Integer id);

	ResponseEntity<String> updateUser(Integer id, User user);

	ResponseEntity<String> deleteUser(Integer id);
	void addRoleToUser(String userName,String roleName);

	List<User> findUsersByRoleId(Integer id);


	List<User> findUsersByDepartmentId(Integer id);
}
