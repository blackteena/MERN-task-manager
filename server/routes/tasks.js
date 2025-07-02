import express from 'express'

import authMiddleware from '../middlewares/auth.js'
import {getTasksController, createTaskController, updateTaskController, deleteTaskController} from '../controllers/tasks.js'

const router = express.Router()

router.get('/', authMiddleware, getTasksController)

router.post('/', authMiddleware, createTaskController)

router.put('/:id', authMiddleware, updateTaskController)

router.delete('/:id', authMiddleware, deleteTaskController)

export default router


