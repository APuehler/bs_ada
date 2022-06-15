package com.ada.login.repository;

import java.util.Optional;

import com.ada.login.models.Benutzer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Benutzer, Long> {
    Optional<Benutzer> findByEmail(String email);
    Boolean existsByEmail(String email);
}
