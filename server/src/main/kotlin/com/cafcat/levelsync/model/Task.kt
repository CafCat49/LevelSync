package com.cafcat.levelsync.model

import jakarta.persistence.*

@Entity
@Table(name = "tasks")
data class Task(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    
    val title: String,
    val description: String? = null,
    val category: String = "general",
    val completed: Boolean = false,
    val xpValue: Int = 10,
    val dueTime: String? = null,
    val recurring: Boolean = false,
    val userId: Long = 0
)