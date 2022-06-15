package com.ada.fileupload.service;

import java.io.IOException;
import java.util.function.Predicate;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import com.ada.fileupload.model.FileDB;
import com.ada.fileupload.repository.FileDBRepository;
@Service
public class FileStorageService {
  @Autowired
  private FileDBRepository fileDBRepository;
  public FileDB store(MultipartFile file) throws IOException {
    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
    FileDB FileDB = new FileDB(fileName, file.getContentType(), file.getBytes());
    return fileDBRepository.save(FileDB);
    
  }
  public FileDB getFile(String id) {
    long idLong = Long.parseLong(id);
    FileDB file;
    if (fileDBRepository.findById(idLong).isPresent())
       file = fileDBRepository.findById(idLong).get();
    else
      file = new FileDB("not found", "", new byte[0]);
    return file;
  }
  
  public Stream<FileDB> getAllFiles() {
    return fileDBRepository.findAll().stream();
  }
}
