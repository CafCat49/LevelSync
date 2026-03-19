package com.cafcat.levelsync.model

import java.time.LocalDateTime
import jakarta.persistence.*

@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    
    @Column(unique = true, nullable = false)
    val username: String,
    
    @Column(nullable = false)
    val password: String,  // Will store hashed password
    
    @Column(unique = true, nullable = false)
    val email: String,
    
    val createdAt: LocalDateTime = LocalDateTime.now()
)