import React from 'react';
import { Link } from 'react-router';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-blue-50 rounded-3xl shadow-sm border border-blue-100 mt-10">
      <h1 className="text-5xl font-bold text-blue-900 mb-6 text-center">
        User Management System
      </h1>
      <p className="text-xl text-blue-700 mb-10 max-w-2xl text-center leading-relaxed px-4">
        A simple and efficient way to manage your users. You can easily add new
        users to the system, view the complete list of registered users, and
        manage their details seamlessly.
      </p>
      <div className="flex gap-6">
        <Link
          to="/add-user"
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          Add New User
        </Link>
        <Link
          to="/users-list"
          className="bg-white text-blue-700 border-2 border-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors shadow-md hover:shadow-lg"
        >
          View Users
        </Link>
      </div>
    </div>
  );
}

export default Home;