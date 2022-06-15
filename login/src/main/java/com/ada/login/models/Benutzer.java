package com.ada.login.models;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.sql.Date;

@Entity
@Table(name = "benutzer",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = "email")
		})
public class Benutzer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long benutzernummer;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;
	@NotBlank
	@Size(max = 120)
	private String password;
	private long roleID;

	public Benutzer() {
	}

	public Benutzer(String email, String password, long roleID) {
		this.email = email;
		this.password = password;
		this.roleID = roleID;
	}

	public Long getBenutzernummer() {
		return benutzernummer;
	}

	public void setBenutzernummer(Long benutzernummer) {
		this.benutzernummer = benutzernummer;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public long getRoleID() {
		return roleID;
	}

	public void setRoleID(long roleID) {
		this.roleID = roleID;
	}
}
