package server.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import server.dto.PasswordRequest;
import server.dto.UserRequest;
import server.model.User;

import java.io.IOException;
import java.util.List;
import java.util.Map;


public interface UserService {
	ResponseEntity<String> addUser(User user);

	List<User> findAll();
	Page<User> getPaginatedUsers(Pageable pageable);

	Page<User> getUsersByRole(Integer role, Pageable pageable);

	Page<User> getUsersByDepartment(Integer departmentId, Pageable pageable);

	Page<User> getUsersByRoleAndDepartment(Integer role, Integer departmentId, Pageable pageable);

	User findById(Integer id);

	ResponseEntity<Map<String,Object>> updateUser(Integer id, @RequestBody UserRequest user);

	ResponseEntity<String> deleteUser(Integer id);
	void addRoleToUser(String userName,String roleName);

	List<User> findUsersByRoleId(Integer id);


	List<User> findUsersByDepartmentId(Integer id);


	ResponseEntity<Map<String, Object>> changePassword(PasswordRequest formData);


	ResponseEntity<Map<String, Object>> changePhoto(Integer userId, MultipartFile file) throws IOException;
	byte[] getUserPhoto(Integer id);
}
