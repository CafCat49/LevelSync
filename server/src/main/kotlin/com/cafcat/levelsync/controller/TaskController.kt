package com.cafcat.levelsync.controller

import com.cafcat.levelsync.model.Task
import com.cafcat.levelsync.repository.TaskRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = ["http://localhost:5173"]) // Allow React to call this API
class TaskController(private val taskRepository: TaskRepository) {
    
    // GET all tasks
    @GetMapping
    fun getAllTasks(): List<Task> = taskRepository.findAll()
    
    // GET single task by ID
    @GetMapping("/{id}")
    fun getTaskById(@PathVariable id: Long): ResponseEntity<Task> {
        val task = taskRepository.findById(id)
        return if (task.isPresent) {
            ResponseEntity.ok(task.get())
        } else {
            ResponseEntity.notFound().build()
        }
    }
    
    // POST create new task
    @PostMapping
    fun createTask(@RequestBody task: Task): ResponseEntity<Task> {
        val savedTask = taskRepository.save(task)
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask)
    }
    
    // PUT update existing task
    @PutMapping("/{id}")
    fun updateTask(@PathVariable id: Long, @RequestBody updatedTask: Task): ResponseEntity<Task> {
        return if (taskRepository.existsById(id)) {
            val task = updatedTask.copy(id = id)
            ResponseEntity.ok(taskRepository.save(task))
        } else {
            ResponseEntity.notFound().build()
        }
    }
    
    // DELETE task
    @DeleteMapping("/{id}")
    fun deleteTask(@PathVariable id: Long): ResponseEntity<Void> {
        return if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id)
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
}