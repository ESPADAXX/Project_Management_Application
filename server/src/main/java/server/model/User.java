package server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
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
import java.util.Collection;
import java.util.List;

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


	private String pathPic;


	@Column(nullable = false, unique = true)
	private String email;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
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