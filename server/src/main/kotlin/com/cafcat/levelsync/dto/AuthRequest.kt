package com.cafcat.levelsync.dto

data class AuthRequest(
    val username: String,
    val email: String,
    val password: String
)