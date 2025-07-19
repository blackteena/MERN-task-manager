import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import api from '../api'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [editTask, setEditTask] = useState('')
  const [taskId, setTaskId] = useState(null)

  const navigate = useNavigate()

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      if (!title.trim()) {
        return
      }
      const token = localStorage.getItem('token')
      const res = await api.post('/tasks', { title },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      setTasks((prev) => [res.data.newTask, ...prev])
      setTitle('')
    }
    catch (err) {
      toast.error('Не удалось сохранить')
    }
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await api.delete(`/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setTasks((prev) => prev.filter((el) => id !== el._id))
    }
    catch (err) {
      toast.error('Не удалось удалить')
    }
  }

  const handleComplete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const res = await api.put(`/tasks/${id}`,
        {
          completed: true
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setTasks((prev) => {
        return prev.map((el) => el._id === id ? res.data.task : el)
      })
    }
    catch (err) {
      toast.error('Не удалось обновить')
    }
  }

  const handleEdit = async (e, id) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const res = await api.put(`/tasks/${id}`,
        {
          title: editTask
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setTasks(prev => prev.map(el => el._id === id ? res.data.task : el))
      setTaskId(null)
    }
    catch (err) {
      toast.error('Не удалось обновить')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await api.get('/tasks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        )
        setTasks(res.data.tasks)
      }
      catch (err) {
        toast.error('Не удалось загрузить')
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">📋 Мои задачи</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 border border-red-300 rounded px-3 py-1 hover:bg-red-50 transition"
          >
            Выйти
          </button>
        </div>

        <form onSubmit={handleCreate} className="flex gap-2 mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Новая задача..."
            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Добавить
          </button>
        </form>

        {isLoading ? (
          <p className="text-center text-gray-500">Загрузка...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-500">Нет задач</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((el) => (
              <li key={el._id} className="bg-gray-50 p-4 rounded shadow flex justify-between items-center">
                {taskId === el._id ? (
                  <form onSubmit={(e) => handleEdit(e, el._id)} className="flex-1 mr-4">
                    <input
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                      autoFocus
                      onBlur={() => {
                        setTaskId(null)
                        setEditTask('')
                      }}
                      className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </form>
                ) : (
                  <p className={`flex-1 ${el.completed ? 'line-through text-gray-400' : ''}`}>
                    {el.title}
                  </p>
                )}

                <div className="flex gap-2 ml-2">
                  {!el.completed && (
                    <button
                      onClick={() => handleComplete(el._id)}
                      className="text-green-600 hover:text-green-800 transition"
                      title="Завершить"
                    >
                      ✅
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setTaskId(el._id)
                      setEditTask(el.title)
                    }}
                    className="text-gray-500 hover:text-black transition"
                    title="Редактировать"
                  >
                    ✏
                  </button>
                  <button
                    onClick={() => handleDelete(el._id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Удалить"
                  >
                    🗑
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )

}

export default Tasks


