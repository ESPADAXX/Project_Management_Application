package server.service.impl;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import server.dto.PasswordRequest;
import server.dto.UserRequest;
import server.model.Department;
import server.model.Role;
import server.model.User;
import server.repository.DepartmentRepository;
import server.repository.RoleRepository;
import server.repository.UserRepository;
import server.service.UserService;

import java.io.IOException;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private DepartmentRepository departmentRepository;
	@Autowired
	private Validator validator;

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
	public Page<User> getPaginatedUsers(Pageable pageable){
		return  userRepository.findAll(pageable);
	}
	@Override
	public Page<User> getUsersByRole(Integer role, Pageable pageable) {
		Role roleselected = roleRepository.findRoleById(role);

		return userRepository.findUsersByRole(roleselected, pageable);
	}
	@Override
	public Page<User> getUsersByDepartment(Integer department, Pageable pageable) {
		Department departmentselected = departmentRepository.findDepartmentById(department);
		System.out.println(departmentselected);
		return userRepository.findByDepartment(departmentselected, pageable);
	}
	@Override
	public Page<User> getUsersByRoleAndDepartment(Integer role, Integer department, Pageable pageable) {
		Department departmentselected = departmentRepository.findDepartmentById(department);
		Role roleselected = roleRepository.findRoleById(role);
		return userRepository.findByRoleAndDepartment(roleselected, departmentselected, pageable);
	}

	@Override
	public User findById(Integer id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id " + id));
	}

	@Override
	public ResponseEntity<Map<String,Object>> updateUser(Integer id, @RequestBody UserRequest user) {
		Department departmentSelected=departmentRepository.findDepartmentById(user.getDepartment());
		Role roleSelected=roleRepository.findRoleById(user.getRole());
		User existingUser=userRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id " + id));
		Map<String,Object> response = new HashMap<>();
		List<Map<String,Object>> errorsList=new ArrayList<>();
		Set<ConstraintViolation<UserRequest>> violations = validator.validate(user);
		Map<String, Object> errorMap = new HashMap<>();
		if (!violations.isEmpty()) {
			for(ConstraintViolation<UserRequest> violation : violations) {
				errorMap.put(violation.getPropertyPath().toString(), violation.getMessage());
			}
			errorsList.add(errorMap);
		}
		if (!errorsList.isEmpty()){
			response.put("status",false);
			response.put("errors",errorsList);
			response.put("message","Failed to update the user. Please review the following errors.");
			return ResponseEntity.status(200).body(response);
		}
		existingUser.setId(id);
		existingUser.setFullName(user.getFullName());
		existingUser.setEmail(user.getEmail());
		existingUser.setPhone(user.getPhone());
		existingUser.setRole(roleSelected);
		existingUser.setDepartment(departmentSelected);
		userRepository.save(existingUser);
		response.put("status", true);
		response.put("message", "User Updated successfully");
		return ResponseEntity.ok(response);
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

	@Override
	public ResponseEntity<Map<String, Object>> changePassword(PasswordRequest formData) {
		Map<String, Object> response= new HashMap<>();
		User existingUser=userRepository.findUsersById(formData.getId());
        List<Map<String,Object>> errorsList=new ArrayList<>();
        Set<ConstraintViolation<PasswordRequest>> violations = validator.validate(formData);
        Map<String, Object> errorMap = new HashMap<>();
        if (!violations.isEmpty()) {
            for(ConstraintViolation<PasswordRequest> violation : violations) {
                errorMap.put(violation.getPropertyPath().toString(), violation.getMessage());
            }
            errorsList.add(errorMap);
        }

        if (!errorsList.isEmpty()){
            response.put("status",false);
            response.put("errors",errorsList);
            response.put("message","Failed to update the password. Please review the following errors.");
            return ResponseEntity.status(200).body(response);
        }
		else if (existingUser != null && BCrypt.checkpw(formData.getOldPassword(), existingUser.getPassword())) {
            existingUser.setPassword(BCrypt.hashpw(formData.getNewPassword(), BCrypt.gensalt()));
            response.put("status", true);
            response.put("message", "Password Updated successfully");
			userRepository.save(existingUser);
            return ResponseEntity.ok().body(response);
        }
			errorMap.put("oldPassword","Invalid Password");
			errorsList.add(errorMap);
			response.put("status", false);
			response.put("errors",errorsList);
			response.put("message", "Failed to update the password. Please review the following errors.");
			return ResponseEntity.ok().body(response);

	}


	@Override
	public ResponseEntity<Map<String, Object>> changePhoto(Integer id, MultipartFile file) throws IOException {
		Map<String, Object> response = new HashMap<>();
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id " + id));
		user.setPhoto(file.getBytes());
		userRepository.save(user);
		response.put("status",true);
		response.put("message","the image was upload");
		return ResponseEntity.status(200).body(response);
	}


	public byte[] getUserPhoto(Integer id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id " + id));
		return user.getPhoto();
	}


}
