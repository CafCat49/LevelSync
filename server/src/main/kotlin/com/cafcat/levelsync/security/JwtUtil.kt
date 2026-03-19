package com.cafcat.levelsync.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.stereotype.Component
import java.util.*
import javax.crypto.SecretKey

@Component
class JwtUtil {
    
    private val secretKey: SecretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256)
    private val expirationTime = 1000 * 60 * 60 * 24 // 24 hours

    fun generateToken(email: String, userId: Long): String {
        return Jwts.builder()
            .subject(email)
            .claim("userId", userId)
            .issuedAt(Date())
            .expiration(Date(System.currentTimeMillis() + expirationTime))
            .signWith(secretKey)
            .compact()
    }

    fun extractEmail(token: String): String {
        return extractClaims(token).subject
    }

    fun extractUserId(token: String): Long {
        return extractClaims(token).get("userId", java.lang.Long::class.java).toLong()
    }

    fun isTokenValid(token: String): Boolean {
        return try {
            extractClaims(token)
            true
        } catch (e: Exception) {
            false
        }
    }

    private fun extractClaims(token: String): Claims {
        return Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token)
            .payload
    }
}