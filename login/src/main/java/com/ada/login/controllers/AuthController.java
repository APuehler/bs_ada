package com.ada.login.controllers;

import com.ada.login.models.Benutzer;
import com.ada.login.models.Rolle;
import com.ada.login.payload.request.LoginRequest;
import com.ada.login.payload.request.SignupRequest;
import com.ada.login.payload.response.MessageResponse;
import com.ada.login.payload.response.UserInfoResponse;
import com.ada.login.repository.RoleRepository;
import com.ada.login.repository.UserRepository;
import com.ada.login.security.jwt.JwtUtils;
import com.ada.login.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
        String role = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).findFirst().get();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new UserInfoResponse(userDetails.getId(),
                        userDetails.getEmail(),
                        role));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }
        // Create new user's account
        Benutzer benutzer = new Benutzer(
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                Rolle.fromNameToId(signUpRequest.getRole()));
        String strRole = signUpRequest.getRole();
        if (strRole == null) {
            strRole = "user";
        }
        benutzer.setRoleID(Rolle.fromNameToId(strRole));
        userRepository.save(benutzer);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("You've been signed out!"));
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateUser(HttpServletRequest request) {
        String jwt = jwtUtils.getJwtFromCookies(request);
        if (jwtUtils.validateJwtToken(jwt)) {
            return ResponseEntity.ok(new MessageResponse("User Authorized!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("User not Authorized!"));
        }
    }
}
