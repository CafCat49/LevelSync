package com.cafcat.levelsync.service

import com.cafcat.levelsync.dto.AuthRequest
import com.cafcat.levelsync.dto.LoginRequest
import com.cafcat.levelsync.exception.InvalidCredentialsException
import com.cafcat.levelsync.exception.UserAlreadyExistsException
import com.cafcat.levelsync.model.User
import com.cafcat.levelsync.repository.UserRepository
import com.cafcat.levelsync.security.JwtUtil
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito.*
import org.springframework.security.crypto.password.PasswordEncoder
import java.time.LocalDateTime

class AuthServiceTest {

    private lateinit var userRepository: UserRepository
    private lateinit var passwordEncoder: PasswordEncoder
    private lateinit var jwtUtil: JwtUtil
    private lateinit var authService: AuthService

    @BeforeEach
    fun setup() {
        userRepository = mock(UserRepository::class.java)
        passwordEncoder = mock(PasswordEncoder::class.java)
        jwtUtil = mock(JwtUtil::class.java)
        authService = AuthService(userRepository, passwordEncoder, jwtUtil)
    }

    @Test
    fun `register should create new user successfully`() {
        // Given
        val request = AuthRequest(
            username = "testuser",
            email = "test@example.com",
            password = "password123"
        )

        val savedUser = User(
            id = 1L,
            username = "testuser",
            email = "test@example.com",
            password = "hashedPassword",
            createdAt = LocalDateTime.now()
        )

        `when`(userRepository.findByEmail(request.email)).thenReturn(null)
        `when`(passwordEncoder.encode(request.password)).thenReturn("hashedPassword")
        `when`(userRepository.save(any(User::class.java))).thenReturn(savedUser)
        `when`(jwtUtil.generateToken(savedUser.email, savedUser.id!!)).thenReturn("mock-jwt-token")

        // When
        val response = authService.register(request)

        // Then
        assertNotNull(response)
        assertEquals("mock-jwt-token", response.token)
        assertEquals("testuser", response.username)
        assertEquals(1L, response.userId)
        verify(userRepository).save(any(User::class.java))
    }

    @Test
    fun `register should throw UserAlreadyExistsException when email exists`() {
        // Given
        val request = AuthRequest(
            username = "testuser",
            email = "test@example.com",
            password = "password123"
        )

        val existingUser = User(
            id = 1L,
            username = "existinguser",
            email = "test@example.com",
            password = "hashedPassword",
            createdAt = LocalDateTime.now()
        )

        `when`(userRepository.findByEmail(request.email)).thenReturn(existingUser)

        // When/Then
        assertThrows<UserAlreadyExistsException> {
            authService.register(request)
        }
    }

    @Test
    fun `login should return token for valid credentials`() {
        // Given
        val request = LoginRequest(
            email = "test@example.com",
            password = "password123"
        )

        val user = User(
            id = 1L,
            username = "testuser",
            email = "test@example.com",
            password = "hashedPassword",
            createdAt = LocalDateTime.now()
        )

        `when`(userRepository.findByEmail(request.email)).thenReturn(user)
        `when`(passwordEncoder.matches(request.password, user.password)).thenReturn(true)
        `when`(jwtUtil.generateToken(user.email, user.id!!)).thenReturn("mock-jwt-token")

        // When
        val response = authService.login(request)

        // Then
        assertNotNull(response)
        assertEquals("mock-jwt-token", response.token)
        assertEquals("testuser", response.username)
        assertEquals(1L, response.userId)
    }

    @Test
    fun `login should throw InvalidCredentialsException for wrong password`() {
        // Given
        val request = LoginRequest(
            email = "test@example.com",
            password = "wrongpassword"
        )

        val user = User(
            id = 1L,
            username = "testuser",
            email = "test@example.com",
            password = "hashedPassword",
            createdAt = LocalDateTime.now()
        )

        `when`(userRepository.findByEmail(request.email)).thenReturn(user)
        `when`(passwordEncoder.matches(request.password, user.password)).thenReturn(false)

        // When/Then
        assertThrows<InvalidCredentialsException> {
            authService.login(request)
        }
    }

    @Test
    fun `login should throw InvalidCredentialsException for non-existent email`() {
        // Given
        val request = LoginRequest(
            email = "nonexistent@example.com",
            password = "password123"
        )

        `when`(userRepository.findByEmail(request.email)).thenReturn(null)

        // When/Then
        assertThrows<InvalidCredentialsException> {
            authService.login(request)
        }
    }
}