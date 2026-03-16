package com.cafcat.levelsync.model

import java.time.LocalDateTime
import jakarta.persistence.*

@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    
    val username: String = "User",
    val createdAt: LocalDateTime = LocalDateTime.now()
)