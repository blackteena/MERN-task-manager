import Task from '../models/task.js'

export const getTasksController = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id })
    res.json({ tasks })
}

export const createTaskController=async (req, res) => {
    const { title } = req.body
    try {
        const newTask = new Task({
            title,
            user: req.user.id
        })
        await newTask.save()
        res.status(201).json({ newTask })
    }
    catch (err) {
        return res.status(500).json({
            message: 'Server error'
        })
    }
}

export const updateTaskController=async (req, res) => {
    const { title, completed } = req.body
    const taskId = req.params.id
    try {
        const task = await Task.findOne({ user: req.user.id, _id: taskId })
        if (!task) {
            return res.status(404).json({
                messaage: 'Not found'
            })
        }
        task.title = title ?? task.title
        task.completed = completed ?? task.completed
        await task.save()
        return res.json({task})
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Server error'
        })
    }
}

export const deleteTaskController=async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id })
        if(!task){
            return res.status(404).json({message:'Not found'})
        }
        return res.status(204).end()
    }
    catch (err) {
        return res.status(500).json({message:'Server error'})
    }
}