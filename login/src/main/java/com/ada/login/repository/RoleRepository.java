package com.ada.login.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ada.login.models.ERole;
import com.ada.login.models.Rolle;
@Repository
public interface RoleRepository extends JpaRepository<Rolle, Long> {
    Optional<Rolle> findByRollenname(ERole name);
}