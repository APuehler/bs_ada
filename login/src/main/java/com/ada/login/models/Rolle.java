package com.ada.login.models;

import javax.persistence.*;

@Entity
@Table(name = "rolle")
public class Rolle {
    @Id
    private Integer rollennummer;
    @Enumerated(EnumType.STRING)
    private ERole rollenname;

    public Rolle() {
    }

    public Rolle(Integer rollennummer, ERole rollenname) {
        this.rollennummer = rollennummer;
        this.rollenname = rollenname;
    }

    public Integer getRollennummer() {
        return rollennummer;
    }

    public void setRollennummer(Integer rollennummer) {
        this.rollennummer = rollennummer;
    }

    public ERole getRollenname() {
        return rollenname;
    }

    public void setRollenname(ERole rollenname) {
        this.rollenname = rollenname;
    }

    public static long fromNameToId(String name) {
        return switch (name) {
            case "admin" -> 1;
            case "recruiter" -> 2;
            case "communityManager" -> 3;
            case "manager" -> 4;
            default -> 5;
        };
    }

    public static String fromIdToName(long id) {
        return switch ((int) id) {
            case 1 -> "admin";
            case 2 -> "recruiter";
            case 3 -> "communityManager";
            case 4 -> "manager";
            default -> "student";
        };
    }
}