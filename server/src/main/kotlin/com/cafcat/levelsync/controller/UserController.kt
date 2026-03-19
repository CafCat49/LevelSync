package com.cafcat.levelsync.controller

import com.cafcat.levelsync.model.User
import com.cafcat.levelsync.repository.UserRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = ["http://localhost:5173", "https://levelsync-frontend.onrender.com"])
class UserController(private val userRepository: UserRepository) {

    // GET current user (creates one if none exists)
    @GetMapping("/current")
    fun getCurrentUser(): ResponseEntity<User> {
        val user = userRepository.findAll().firstOrNull() 
            ?: userRepository.save(User(username = "User", password = "password", email = "email@example.com"))
        return ResponseEntity.ok(user)
    }

    // GET single user by ID
    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: Long): ResponseEntity<User> {
        val user = userRepository.findById(id)
        return if (user.isPresent) {
            ResponseEntity.ok(user.get())
        } else {
            ResponseEntity.notFound().build()
        }
    }

    // PUT update existing user
    @PutMapping("/{id}")
    fun updateUser(@PathVariable id: Long, @RequestBody updatedUser: User): ResponseEntity<User> {
        return if (userRepository.existsById(id)) {
            val user = updatedUser.copy(id = id)
            ResponseEntity.ok(userRepository.save(user))
        } else {
            ResponseEntity.notFound().build()
        }
    }
}