import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const schema = yup.object({
    account: yup.string().required("Tên tài khoản không được để trống"),
    password: yup.string().required("Mật khẩu không được để trống")
});

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [loadding, setLoadding] = useState(false);
    const nav = useNavigate()
    const handleOnsSubmit = async (data) => {
        setLoadding(true);
        const result = await axios.post('https://dungtamtithoo-001-site1.itempurl.com/api/Customers/login', {
            account: data.account,
            password: data.password
        })
        if (result.data.result == "success") {
            const info = {
                id: result.data.id,
                name: result.data.name
            }
            localStorage.setItem("user", JSON.stringify(info));
            nav("/")
        } else {
            toast.warning("Tài khoản hoặc mật khẩu không chính xác !", {
            });
        }
        setLoadding(false);
    }
    return (
        <div>
            {!loadding
                ? <section className="">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <Link to={"/"} className="flex items-center mb-6 text-2xl font-semibold ">
                            <div className="navbar-center">
                                <p className="btn uppercase font-mono btn-ghost text-xl">Điện Thoại Việt Trì</p>
                            </div>
                        </Link>
                        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl text-center font-bold leading-tight tracking-tight  md:text-2xl ">
                                    Đăng nhập tài khoản
                                </h1>
                                <form onSubmit={handleSubmit(handleOnsSubmit)} className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium  ">Số điện thoại</label>
                                        <input {...register("account")} type="text" className=" border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+84 987654321" />
                                        <p className='text-end text-red-600'>
                                            <small className='italic'>{errors.account?.message}</small>
                                        </p>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium  ">Password</label>
                                        <input type="password" {...register("password")} placeholder="••••••••••••" className=" border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        <p className='text-end text-red-600'>
                                            <small className='italic'>{errors.password?.message}</small>
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded  focus:ring-3 focus:ring-primary-300  dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember" className="">Nhớ mật khẩu</label>
                                            </div>
                                        </div>
                                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Bạn quên mật khẩu?</a>
                                    </div>
                                    <button type="submit" className="w-full btn  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng nhập</button>
                                    <p className="text-sm font-light ">
                                        Bạn không có tài khoản? <Link to={"/register"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng ký</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                : <div
                    style={{ zIndex: "99", backgroundColor: "rgba(0,0,0,.6)" }}
                    className='w-screen h-screen fixed top-0 left-0 flex justify-center items-center'>
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            }

        </div>
    )
}

export default Login;