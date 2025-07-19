import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">
          Добро пожаловать в Task Manager
        </h1>
        <p className="text-gray-600 mb-6">
          Управляйте своими задачами легко и удобно
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Войти
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 bg-gray-200 text-indigo-600 rounded-lg hover:bg-gray-300 transition"
          >
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
