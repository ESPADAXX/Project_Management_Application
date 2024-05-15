package server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import server.model.Department;
import server.model.Role;
import server.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
    User findUsersById(Integer userId);
    User findByFullName(String fullName);
    Page<User> findUsersByRole(Role role, Pageable pageable);
    Page<User> findByDepartment(Department department, Pageable pageable);
    Page<User> findByRoleAndDepartment(Role role, Department department, Pageable pageable);
    List<User> findUsersByRoleId(Integer role);

    List<User> findUsersByDepartmentId(Integer id);
}