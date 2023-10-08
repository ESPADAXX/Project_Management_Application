package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import server.model.Role;
import server.model.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);

    User findByFullName(String fullName);

    List<User> findUsersByRoleId(Integer role);

    List<User> findUsersByDepartmentId(Integer id);
}