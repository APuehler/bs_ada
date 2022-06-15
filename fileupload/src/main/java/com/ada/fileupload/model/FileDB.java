package com.ada.fileupload.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.UniqueConstraint;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;


@Entity
@Table(name = "files",uniqueConstraints = @UniqueConstraint(columnNames={"name","size"}))
public class FileDB {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long uploadID;
	private String name;
	private String type;
	private int size;
	
	private long taskID;
	private long userID;
	private int points;
	private Date uploadTime;

	@Lob
	private byte[] data;

	public FileDB() {
	}

	public FileDB(String name, String type, byte[] data /*later: long taskID from frontend, String jwt from cookie for userID???*/) {
		this.name = name;
		this.type = type;
		this.data = data;
		this.size = data.length;
		this.taskID = 0;
		this.userID = 0;
		this.points = 0;
        this.uploadTime = new Date(System.currentTimeMillis());  
	}

	public int getSize() {
		return size;
	}
	
	public long getTaskID() {
		return taskID;
	}
	
	public long getUserID() {
		return userID;
	}
	
	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	public Date getUploadTime() {
		return uploadTime;
	}

	public long getId() {
		return uploadID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}
}