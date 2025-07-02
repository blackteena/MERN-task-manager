import React from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6)
})


const Register = () => {
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:4200/api/auth/register', data)
      localStorage.setItem('token', res.data.token)
      navigate('/tasks')
    }
    catch (err) {
      console.error(err)
      alert('Ошибка регистрации')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4">Регистрация</h2>
      <input type='email' placeholder='email' {...register('email')} className="w-full border px-3 py-2 rounded mb-2" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <input {...register('password')} type='password' placeholder='password' className="w-full border px-3 py-2 rounded mb-2" />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      <button type='submit' className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">Зарегистрироваться</button>
    </form>
  )
}

export default Register