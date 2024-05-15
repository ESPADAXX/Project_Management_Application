package server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//import lombok.Setter; // Import the @Setter annotation
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.Collection;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private String fullName;

	@Lob
	@Column(length = 16777215)
	private byte[] photo;


	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false)
	private String password;

	@Column(nullable = true)
	private String phone;


	@ManyToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "role_id")
	private Role role;

	@ManyToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "department_id")
	private Department department;

	public User(String fullName, String email, String password, String phone) {
		this.fullName = fullName;
		this.email = email;
		this.password = password;
		this.phone = phone;
	}

	public User(String name, String email, String hashedPassword) {
		this(name, email, hashedPassword, null);
	}

	@PrePersist
	private void prePersist() {
		email = email.toLowerCase();
	}


}