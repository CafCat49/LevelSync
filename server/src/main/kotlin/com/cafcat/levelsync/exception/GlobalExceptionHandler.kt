package com.cafcat.levelsync.exception

import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import java.time.LocalDateTime

// 1. Expanded ErrorResponse for better debugging
data class ErrorResponse(
    val message: String?,
    val status: Int,
    val timestamp: LocalDateTime = LocalDateTime.now(),
    val errors: Map<String, String>? = null // Specifically for validation errors
)

@RestControllerAdvice
class GlobalExceptionHandler {

    private val logger = LoggerFactory.getLogger(GlobalExceptionHandler::class.java)

    // 2. Handle Validation Errors (Crucial for React forms)
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationExceptions(ex: MethodArgumentNotValidException): ResponseEntity<ErrorResponse> {
        val errors = mutableMapOf<String, String>()
        ex.bindingResult.fieldErrors.forEach { error ->
            errors[error.field] = error.defaultMessage ?: "Invalid value"
        }

        return buildResponse(HttpStatus.BAD_REQUEST, "Validation failed", errors)
    }

    // 3. Existing specific exceptions (Cleaned up with a helper)
    @ExceptionHandler(UserAlreadyExistsException::class)
    fun handleUserAlreadyExists(ex: UserAlreadyExistsException) =
        buildResponse(HttpStatus.CONFLICT, ex.message)

    @ExceptionHandler(InvalidCredentialsException::class, UnauthorizedException::class)
    fun handleAuthErrors(ex: Exception) =
        buildResponse(HttpStatus.UNAUTHORIZED, ex.message)

    @ExceptionHandler(ResourceNotFoundException::class)
    fun handleResourceNotFound(ex: ResourceNotFoundException) =
        buildResponse(HttpStatus.NOT_FOUND, ex.message)

    // 4. The "Catch-All" - Now with logging!
    @ExceptionHandler(Exception::class)
    fun handleGenericException(ex: Exception): ResponseEntity<ErrorResponse> {
        // This prints the actual error to your IntelliJ/Server console
        logger.error("Internal Server Error: ", ex)

        return buildResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "An internal server error occurred. Please contact support."
        )
    }

    // Helper to keep code DRY
    private fun buildResponse(
        status: HttpStatus,
        message: String?,
        errors: Map<String, String>? = null
    ): ResponseEntity<ErrorResponse> {
        return ResponseEntity
            .status(status)
            .body(ErrorResponse(message ?: "No message available", status.value(), LocalDateTime.now(), errors))
    }
}