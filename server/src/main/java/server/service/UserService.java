package server.service;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import server.model.Role;
import server.model.User;

import java.io.IOException;
import java.util.List;


public interface UserService {
	ResponseEntity<String> addUser(User user);

	List<User> findAll();

	User findById(Integer id);

	ResponseEntity<String> updateUser(Integer id, @RequestBody User user, @RequestBody MultipartFile file) throws IOException;

	ResponseEntity<String> deleteUser(Integer id);
	void addRoleToUser(String userName,String roleName);

	List<User> findUsersByRoleId(Integer id);


	List<User> findUsersByDepartmentId(Integer id);
}
