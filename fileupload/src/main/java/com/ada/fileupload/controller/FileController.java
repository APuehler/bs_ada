package com.ada.fileupload.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.ada.fileupload.service.FileStorageService;
import com.ada.fileupload.message.ResponseFile;
import com.ada.fileupload.message.ResponseMessage;
import com.ada.fileupload.model.FileDB;

@Controller
@CrossOrigin("http://localhost:8081")
public class FileController {
	@Autowired
	private FileStorageService storageService;

	@PostMapping("/upload")
	public ResponseEntity<ResponseMessage> uploadFile(
			@RequestParam("file") MultipartFile file,
			@CookieValue(name = "ada", defaultValue = "defaultJwt") String jwtToValidate) {

	    if (isJwtValid(jwtToValidate)) {
		String message;
		try {
			storageService.store(file);
			message = "Uploaded the file successfully: " + file.getOriginalFilename();
			return ResponseEntity.status(HttpStatus.OK).header("ada", jwtToValidate).body(new ResponseMessage(message));
		} catch (Exception e) {
			message = "Could not upload the file: " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
		}
	    }
	    else {
			String message;
			message = "User not authorized!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
	    }
	}

	@GetMapping("/files")
	public ResponseEntity<List<ResponseFile>> getListFiles(@CookieValue(name = "ada", defaultValue = "defaultJwt") String jwtToValidate) {

		if (isJwtValid(jwtToValidate)) {
			List<ResponseFile> files = storageService.getAllFiles().map(dbFile -> {
				String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/files/")
						.path(String.valueOf(dbFile.getId())).toUriString();
				return new ResponseFile(dbFile.getName(), fileDownloadUri, dbFile.getType(), dbFile.getData().length);
			}).collect(Collectors.toList());
			return ResponseEntity.status(HttpStatus.OK).body(files);
		}
		else {
			List<ResponseFile> emptyList = new ArrayList<>();
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(emptyList);
		}
	}

	@GetMapping("/files/{id}")
	public ResponseEntity<byte[]> getFile(@PathVariable String id, @CookieValue(name = "ada", defaultValue = "defaultJwt") String jwtToValidate) {

		if (isJwtValid(jwtToValidate)) {
			FileDB fileDB = storageService.getFile(id);
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
					.body(fileDB.getData());
		}
		else {
			byte[] emptyByte = new byte[0];
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(emptyByte);
		}
	}

	private Boolean isJwtValid(String jwtToValidate) {
		String uri = "http://localhost:8081/api/auth/validate";
		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add("Cookie", "ada=" + jwtToValidate);

		HttpEntity<?> requestEntity = new HttpEntity(null, requestHeaders);

		ResponseEntity<?> response = restTemplate.exchange(uri, HttpMethod.GET, requestEntity, String.class);

		String answer = (String) response.getBody();
		String expectedAnswer = "{\"message\":\"User Authorized!\"}";

		return expectedAnswer.equals(answer);
	}

}