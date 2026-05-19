import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";

function EditUser() {
    const { state } = useLocation();
    const user = state?.user;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);

    let navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setValue("name", user.name);
            setValue("email", user.email);
            if (user.dateofBirth) {
                // Format date for date input (YYYY-MM-DD)
                const d = new Date(user.dateofBirth);
                if (!isNaN(d.getTime())) {
                    setValue("dateofBirth", d.toISOString().split('T')[0]);
                }
            }
            setValue("mobileNumber", user.mobileNumber);
        } else {
            navigate("/users-list");
        }
    }, [user, setValue, navigate]);

    //form submit
    const onUserUpdate = async (updatedUser) => {
        setLoading(true);
        try {
            let res = await fetch(`https://user-management-app-nfdh.onrender.com/user-api/user/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            });

            if (res.status === 200) {
                //user updated, navigate to users list
                navigate("/users-list");
            } else {
                throw new Error("error occurred while updating");
            }
        } catch (err) {
            console.log(err)
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="text-center text-blue-400 text-2xl py-10"> Updating user...</p>;
    }

    if (error) {
        return <p className="text-center text-red-400 text-2xl py-10"> {error.message}</p>;
    }

    return (
        <div className="max-w-xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-100 mt-10">
            <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">Edit User</h1>
            <form onSubmit={handleSubmit(onUserUpdate)} className="flex flex-col gap-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" {...register("name")} className="border border-gray-300 w-full text-lg p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Enter full name" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" {...register("email")} className="border border-gray-300 w-full text-lg p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-100" placeholder="Enter email address" disabled />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                        type="date"
                        {...register("dateofBirth")}
                        className="border border-gray-300 w-full text-lg p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-600"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <input
                        type="number"
                        {...register("mobileNumber")}
                        className="border border-gray-300 w-full text-lg p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter mobile number"
                    />
                </div>
                <div className="flex gap-4 mt-4">
                    <button type="button" onClick={() => navigate(-1)} className="flex-1 text-xl font-semibold bg-white text-gray-600 border border-gray-300 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                        Cancel
                    </button>
                    <button type="submit" className="flex-1 text-xl font-semibold bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                        Update User
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditUser;