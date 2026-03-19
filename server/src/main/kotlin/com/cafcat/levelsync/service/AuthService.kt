package com.cafcat.levelsync.service

import com.cafcat.levelsync.dto.AuthRequest
import com.cafcat.levelsync.dto.AuthResponse
import com.cafcat.levelsync.dto.LoginRequest
import com.cafcat.levelsync.model.User
import com.cafcat.levelsync.repository.UserRepository
import com.cafcat.levelsync.security.JwtUtil
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtUtil: JwtUtil
) {

    fun register(request: AuthRequest): AuthResponse {
        // Check if user already exists
        if (userRepository.findByEmail(request.email) != null) {
            throw IllegalArgumentException("Email already registered")
        }
        
        // Create new user with hashed password
        val user = User(
            username = request.username,
            email = request.email,
            password = passwordEncoder.encode(request.password)
        )
        
        val savedUser = userRepository.save(user)
        val token = jwtUtil.generateToken(savedUser.email, savedUser.id!!)
        
        return AuthResponse(
            token = token,
            username = savedUser.username,
            userId = savedUser.id
        )
    }

    fun login(request: LoginRequest): AuthResponse {
        val user = userRepository.findByEmail(request.email)
            ?: throw IllegalArgumentException("Invalid email or password")
        
        if (!passwordEncoder.matches(request.password, user.password)) {
            throw IllegalArgumentException("Invalid email or password")
        }
        
        val token = jwtUtil.generateToken(user.email, user.id!!)
        
        return AuthResponse(
            token = token,
            username = user.username,
            userId = user.id
        )
    }
}