package com.ada.fileupload.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ada.fileupload.model.FileDB;
@Repository
public interface FileDBRepository extends JpaRepository<FileDB, Long> {
}
