package com.cafcat.levelsync.dto

data class ErrorResponse(
    val status: Int,
    val message: String?,
    val timestamp: Long = System.currentTimeMillis()
)