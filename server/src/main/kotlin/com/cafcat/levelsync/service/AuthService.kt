package com.cafcat.levelsync.service

import com.cafcat.levelsync.dto.AuthRequest
import com.cafcat.levelsync.dto.AuthResponse
import com.cafcat.levelsync.dto.LoginRequest
import com.cafcat.levelsync.exception.InvalidCredentialsException
import com.cafcat.levelsync.exception.UserAlreadyExistsException
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
        if (userRepository.findByEmail(request.email) != null) {
            throw UserAlreadyExistsException("Email already registered")
        }

        val user: User = User(
            username = request.username,
            email = request.email,
            password = passwordEncoder.encode(request.password)
        )

        val savedUser = userRepository.save(user)
        val userId = savedUser.id!!
        val token = jwtUtil.generateToken(savedUser.email, userId)

        return AuthResponse(
            token = token,
            username = savedUser.username,
            userId = userId
        )
    }

    fun login(request: LoginRequest): AuthResponse {
        val user = userRepository.findByEmail(request.email)
            ?: throw InvalidCredentialsException("Invalid email or password")

        if (!passwordEncoder.matches(request.password, user.password)) {
            throw InvalidCredentialsException("Invalid email or password")
        }

        val userId = user.id!!
        val token = jwtUtil.generateToken(user.email, userId)

        return AuthResponse(
            token = token,
            username = user.username,
            userId = userId
        )
    }
}