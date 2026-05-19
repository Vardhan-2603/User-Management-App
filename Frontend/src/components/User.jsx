import { useLocation, Link, useNavigate } from "react-router";
import { useState } from "react";

function User() {
  let { state } = useLocation();
  let navigate = useNavigate();
  let [deleting, setDeleting] = useState(false);

  if (!state?.user) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-gray-500 mb-6">User details not found.</p>
        <Link to="/users-list" className="text-blue-600 hover:underline">Back to Users List</Link>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setDeleting(true);
    try {
      let res = await fetch(`https://user-management-app-nfdh.onrender.com/user-api/user/${state.user._id}`, {
        method: "DELETE"
      });
      if (res.status === 200) {
        navigate("/users-list");
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting user");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    navigate("/edit-user", { state: { user: state.user } });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-100 mt-10 relative">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-4xl font-bold mb-4 shadow-inner">
          {state.user.name?.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-3xl font-bold text-gray-800">{state.user.name}</h1>
        <p className="text-lg text-gray-500">{state.user.email}</p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <p className="text-sm font-semibold text-gray-500 mb-1">Date of Birth</p>
          <p className="text-lg text-gray-800">
            {state.user.dateofBirth ? new Date(state.user.dateofBirth).toLocaleDateString() : 'Not provided'}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <p className="text-sm font-semibold text-gray-500 mb-1">Mobile Number</p>
          <p className="text-lg text-gray-800">{state.user.mobileNumber || 'Not provided'}</p>
        </div>
      </div>

      <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={handleEdit}
          className="flex-1 bg-white border-2 border-blue-600 text-blue-600 font-semibold py-2 rounded-xl hover:bg-blue-50 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      <div className="mt-6 text-center">
        <Link to="/users-list" className="text-gray-500 font-medium hover:text-gray-800 transition-colors text-sm">
          &larr; Back to all users
        </Link>
      </div>
    </div>
  );
}

export default User;