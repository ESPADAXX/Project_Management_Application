package server;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import server.model.Department;
import server.model.Role;
import server.model.User;
import server.service.DepartmentService;
import server.service.RoleService;
import server.service.UserService;

@SpringBootApplication
public class TodoApplication {
    public static void main(String[] args) {
        SpringApplication.run(TodoApplication.class, args);
    }

    @Bean
    CommandLineRunner start(UserService userService, DepartmentService departmentService, RoleService roleService){
        return args -> {
//            userService.addUser(new User("Houssam Daoudi","houssam@gmail.com","$2a$12$4yMEZRrdfedeThfayCTHU.Xw5AJc5f8H0/X1dvgUK43pdXxvnzqL2","0766302100"));
//            userService.addUser(new User("Espada","Espada123@gmail.com","$2a$12$KdWzPPZVsDagRbu4CSP66u8OIW57m1KQ2k.OsgO.04g45yBKByEJ6"));
//            userService.addUser(new User("Hamza Elkhattabi","Hamza123@gmail.com","$2a$12$J1zOZ0uiq/dzqEWwlUIopOTPYm2IEIRBizdgQIBtc2grwnYWe/x0K"));
//            userService.addUser(new User("Youssef Kabil","Youssef123@gmail.com","$2a$12$SPr3WDCLpCVmFXkpbayHyOfRGMSS7lAl6xI61XZzuw07lekLZAGEe"));
//
//            departmentService.addDepartment(new Department("Development Department"));
//            departmentService.addDepartment(new Department("Design Department"));
//            departmentService.addDepartment(new Department("Infrastructure and Operations Department"));
//
//            roleService.addRole(new Role("admin"));
//            roleService.addRole(new Role("Project Manager"));
//            roleService.addRole(new Role("Full-Stack Developers"));
//            roleService.addRole(new Role("Back-End Developers"));
//            roleService.addRole(new Role("Front-End Developers"));
//            roleService.addRole(new Role("Designer"));
//            roleService.addRole(new Role("System Administrators"));
//
//            userService.addRoleToUser("Houssam Daoudi","admin");
//            userService.addRoleToUser("Hamza Elkhattabi","Full-Stack Developers");
//            userService.addRoleToUser("Espada","Designer");
//            userService.addRoleToUser("Youssef Kabil","Full-Stack Developers");
        };
    }
}
