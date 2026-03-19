package com.cafcat.levelsync.dto

data class AuthResponse(
    val token: String,
    val username: String,
    val userId: Long
)