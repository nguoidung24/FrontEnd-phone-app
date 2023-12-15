import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { url } from "../Url/Url.js"

const schema = yup.object({
    phone: yup.string().required("Số điện thoại không được để trống"),
    name: yup.string().required("Họ tên không được để trống"),
    password: yup.string()
        .required("Mật khẩu không được để trống")
        .min(8, 'Mật khẩu tối thiểu 8 ký tự.')
        .matches(/[a-zA-Z0-9]/, 'Mật khẩu chỉ bao gồm số, chữ cái in thường và in hoa.'),
    rePassword: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')

});

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [loadding, setLoadding] = useState(false);
    const nav = useNavigate()
    const handleOnsSubmit = async (data) => {
        setLoadding(true);
        const request = {
            "customerId": 0,
            "customerName": data.name,
            "accont": data.phone,
            "password": data.password,
            "email": "string",
            "address": "string",
            "phoneNumber": data.phone,
            "dateOfBirth": "2023-12-13T09:43:22.115Z"
          }
        
        const result = await axios.post(`${url}api/Customers`, request);
        if (result.data.status == 1) {
            toast.success(result.data.description)
        } else {
            toast.warning(result.data.description);
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
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium  ">Số điện thoại</label>
                                        <input {...register("phone")} type="text" className=" border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+84 987654321" />
                                        <p className='text-end text-red-600'>
                                            <small className='italic'>{errors.phone?.message}</small>
                                        </p>
                                    </div>
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium  ">Họ và tên</label>
                                        <input {...register("name")} type="text" className=" border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nguyễn Văn A" />
                                        <p className='text-end text-red-600'>
                                            <small className='italic'>{errors.name?.message}</small>
                                        </p>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium  ">Password</label>
                                        <input {...register("password")} type="password"  placeholder="••••••••••••" className=" border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        <p className='text-end text-red-600'>
                                            <small className='italic'>{errors.password?.message}</small>
                                        </p>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium  ">Nhập lại Password</label>
                                        <input {...register("rePassword")} type="password"  placeholder="••••••••••••" className=" border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        <p className='text-end text-red-600'>
                                            <small className='italic'>{errors.rePassword?.message}</small>
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Bạn quên mật khẩu?</a>
                                    </div>
                                    <button type="submit" className="w-full btn  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng ký</button>
                                    <p className="text-sm font-light ">
                                        Bạn đã có tài khoản? <Link to={"/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng nhập</Link>
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

export default Register;