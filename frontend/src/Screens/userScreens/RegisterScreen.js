import React, { useState } from "react";
import { motion } from "framer-motion";
import { BsEmojiLaughing } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userCredentials } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../redux/userApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [register, { isLoading, error }] = useRegisterMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  const redirect = sp.get("/redirect") || "/dashboard";

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        toast.error("password don't match");
        return;
      } else {
        const res = await register({ name, email, password }).unwrap();

        dispatch(userCredentials({ ...res }));
        toast.success("user created Succesfully");
        navigate(redirect);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto sm:px-3 md:px-0 p-2 mt-6 md:mt-12"
    >
      {/* Sign in Form Goes Here */}

      <form
        className="max-w-md mx-auto bg-white p-8  rounded shadow-lg"
        onSubmit={submitHandler}
      >
        <h1 className="text-center text-2xl font-bold">Register </h1>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-500 text-sm font-bold"
          >
            Name
          </label>
          <input
            placeholder="Enter your Name "
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-300 p-2 w-full rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-500 text-sm font-bold"
          >
            Email
          </label>
          <input
            placeholder="Enter your Email "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-300 p-2 w-full rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-500 text-sm font-bold"
          >
            password
          </label>
          <input
            type="password"
            placeholder="Enter your password "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-300 p-2 w-full rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-500 text-sm font-bold"
          >
            password
          </label>
          <input
            type="password"
            placeholder="Confirm  password "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-2 border-gray-300 p-2 w-full rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-800 p-2 px-4 text-slate-50 rounded-xl cursor-pointer
           hover:bg-slate-400 hover:text-slate-950  "
        >
          {isLoading ? <Loader /> : "Register"}
        </button>

        <div className="py-2 text-lg font-bold text-gray-4 00 cursor-pointer">
          <p>
            Already have An Account
            <Link to="/login" className="text-blue-700 ml-2 hover:underline ">
              Login
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default RegisterScreen;