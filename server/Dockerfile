FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy gradle files
COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts .
COPY settings.gradle.kts .

# Copy source code
COPY src src

# Make gradlew executable
RUN chmod +x gradlew

# Build the application
RUN ./gradlew build -x test

# Run the application
CMD ["java", "-jar", "build/libs/levelsync-0.0.1-SNAPSHOT.jar"]