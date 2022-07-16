import { Request, Response, Router } from "express"
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
  // Database mockup
  router.get('/db-create-user-mockup', userController.createUserMockup)

  // Users
  router.post('/create-user', userController.create)
  router.post('/login', authenticateUserController.login)

  // Students
  router.post('/student', ensureAuthenticated, studentController.create)
  router.put('/student', ensureAuthenticated, studentController.edit)
  router.delete('/student', ensureAuthenticated, studentController.delete)
  router.post('/list-student', ensureAuthenticated, studentController.list)

  // Verifying session
  router.get('/session', ensureAuthenticated, (request: Request, response: Response) => {
    return response.send('authorized')
  })

export default router