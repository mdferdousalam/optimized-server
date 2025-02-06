# Optimized to reduce code

an educational institute management system using Express.js and Mongoose. They provided a user schema that's a bit cluttered with fields for all user types mixed together. The goal is to make it cleaner by separating student, teacher, and admin into their own schemas while keeping common fields in a base user model. They also want a modular structure with routes, controllers, services, repositories, and models for each module: auth, user, student, teacher, admin, income, expense, study progress, and possibly others.

First, I need to restructure the user schema. The original schema has fields for all roles, which isn't efficient. Using Mongoose discriminators makes sense here. That way, there's a base user schema with common fields, and each role (student, teacher, admin) extends it with their specific fields. This approach keeps the models DRY and organized.

Next, the directory structure. The user mentioned a layered architecture: routes, controllers, services, repositories, models. So, I'll outline folders for each module. For example, the user module will have its own model, repository, service, controller, and routes. Same for student, teacher, etc.

For the models:

- Base User Schema: Contains common fields like name, email, password, role, phone, address, etc. The role enum should include all possible roles. The discriminator key will differentiate between the user types.

- Student Schema: Extends User with fields specific to students like guardian details, class, rollNo, attendance, educationProgress, fees, etc.

- Teacher Schema: Extends User with subject, qualification, experience, salary, leave details, etc.

- Admin Schema: Might not need many extra fields beyond the base user, but could have something like permissions if needed.

Other modules like Income, Expense, EducationProgress will have their own schemas. For example, Income would track amount, source, date, etc., and reference the user who recorded it. EducationProgress would track a student's progress per subject, with dates and scores.

Now, setting up the modules:

Auth Module: Handles registration, login, password reset. Routes like /auth/register, /auth/login. The controller will interact with the user service to create users, generate tokens, etc.

User Module: CRUD operations for users. Since users can be students, teachers, or admins, the user service needs to handle creating different types using discriminators.

Student and Teacher Modules: Their own routes, controllers, services, which might extend the base user functionalities. For example, adding a student would involve creating a user with role 'student' and adding student-specific fields.

Income and Expense Modules: Manage financial records. Each would have models with fields like amount, description, date, associated user (who entered the record), and references to students or teachers if applicable.

Education Progress Module: Tracks student progress. Each entry could have a student reference, subject, date, score, comments.

Repository layer: Each model has a repository handling database operations. Services use repositories to perform CRUD, and controllers call services. This separation keeps the code clean and testable.

Routes: Each module has its own route file. For example, student routes would be in routes/student.js, with endpoints like POST /students to create a student.
