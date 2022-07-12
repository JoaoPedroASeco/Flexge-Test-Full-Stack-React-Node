import { Router } from "express"
// Controllers import
import { UserController } from "./app/controllers/User/UserController"
import { StudentController } from "./app/controllers/Student/StudentController"
import { AuthenticateUserController } from "./app/controllers/UserAuth/UserAuthController"
// Middleware import
import { ensureAuthenticated } from "./app/middleware/ensureAuthenticated"
// Instance Controllers
const userController = new UserController()
const studentController = new StudentController()
const authenticateUserController = new AuthenticateUserController()

const router = Router()

// Routes
  // Users
  router.post('/create-user', userController.create)
  router.post('/login', authenticateUserController.login)

  // Students
  router.post('/student', ensureAuthenticated, studentController.create)
  router.put('/student', ensureAuthenticated, studentController.edit)
  router.delete('/student', ensureAuthenticated, studentController.delete)
  router.get('/student', ensureAuthenticated, studentController.list)

export default router