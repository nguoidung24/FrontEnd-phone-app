import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaClipboardCheck } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { url } from "../../Url/Url.js"
const schema = yup.object({
    name: yup.string().required("Tên không được để trống"),
    phone: yup.string().required("Số điện thoại không được trống")
        .length(10, "Số điện thoại bao gồm 10 số")
        .typeError("Số điện thoại phải là số"),
    more: yup.string().required("không được để trống"),
    tinh: yup.string().matches(/^(?!-- Tỉnh --$).*$/, "Vui lòng chọn tỉnh"),
    huyen: yup.string().matches(/^(?!-- Huyện --$).*$/, "Vui lòng chọn huyện"),
    xa: yup.string().matches(/^(?!-- Xã --$).*$/, "Vui lòng chọn xã"),
});
function CustomerInfo() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [address, setAddress] = useState({
        tinh: [],
        huyen: [],
        xa: []
    });
    useEffect(() => {
        const fetchTinh = async () => {
            const fetchData = await axios.get("https://provinces.open-api.vn/api/");
            setAddress({
                ...address,
                tinh: fetchData.data
            })
        };
        fetchTinh();
    }, [])
    const hendleTinhChange = async (e) => {
        const fetchHuyen = await axios.get("https://provinces.open-api.vn/api/d/");
        const dataHuyen = fetchHuyen.data.filter(item => item.province_code == e.target.value.split("/")[0]);
        setAddress({
            ...address,
            huyen: dataHuyen
        })
    }
    const hendleHuyenChange = async (e) => {
        const fetchXa = await axios.get("https://provinces.open-api.vn/api/w/");
        const dataXa = fetchXa.data.filter(item => item.district_code == e.target.value.split("/")[0]);
        setAddress({
            ...address,
            xa: dataXa
        })
    }
    const cart = useSelector(state => state.cartList.cartList);
    const handleOnSubmit = async (data) => {
        const today = new Date();
        const user = await localStorage.getItem("user");
        const orderProductId = await (Math.floor(((today.getFullYear() + today.getMonth() + 1 + today.getDate() + today.getHours() + today.getMinutes() + today.getMilliseconds()) / 100) + Math.random() * 99999));
        let totalAmountCart = 0;
        await cart.forEach((element) => {
            totalAmountCart += element.totalAmount;
        })
        const customerId = await JSON.parse(user).id;
        await axios.post(`${url}api/OrderProducts`, {
            "orderProductId": orderProductId,
            "customerId": customerId,
            "orderDate": today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            "totalAmount": await (totalAmountCart + 30000),
            "address": `${data.name}/${data.phone}/${data.tinh.split("/")[1]}/${data.huyen.split("/")[1]}/${data.xa.split("/")[1]}/${data.more}`,
            "statusOrderId": 0
        })
        let orderProductDetail = [];
        await cart.forEach(element => {
            const orderProductIdPost = orderProductId;
            const productId = element.product.productId;
            const price = element.product.price;
            const quantity = element.quantity;
            orderProductDetail.push({
                orderProductId: orderProductIdPost,
                productId,
                price,
                quantity
            })
        });
        axios.post(`${url}api/OrderProductDetails/Many`, orderProductDetail)
        toast.success("Đã yều cầu đặt hàng");
    }
    return (
        <>
            <p className='text-center pb-1'>Thông tin khách hàng</p>
            <p className='text-center pb-2 italic'>(Thanh toán khi nhận hàng)</p>
            <form onSubmit={handleSubmit(handleOnSubmit)} className='grid grid-cols-1'>
                <div className=' text-yellow-600'>
                    <label className="form-control w-full max-w-xs">
                        <input
                            {...register("name")}
                            type="text" placeholder="Họ tên" className="input placeholder:text-yellow-600 placeholder:italic input-bordered w-full max-w-xs" />
                        <div className="label">
                            <span className="label-text-alt text-red-600">{errors.name?.message}</span>
                        </div>
                    </label>
                </div>
                <div className=' text-yellow-600'>
                    <label className="form-control w-full max-w-xs">
                        <input
                            {...register("phone")}
                            type="text" placeholder="Số điện thoại" className="input placeholder:text-yellow-600 placeholder:italic input-bordered w-full max-w-xs" />
                        <div className="label">
                            <span className="label-text-alt text-red-600">{errors.phone?.message}</span>
                        </div>
                    </label>
                </div>
                <label className="form-control text-yellow-600 w-full max-w-xs">
                    <select {...register("tinh")}
                        onChange={hendleTinhChange}
                        className="select select-bordered"
                        defaultValue={"-- Tỉnh --"}
                    >
                        <option disabled >-- Tỉnh --</option>
                        {
                            address.tinh?.map((item, index) => (
                                <option value={`${item.code}/${item.name}`} key={index} >{item.name}</option>
                            ))
                        }

                    </select>
                    <div className="label">
                        <span className="label-text-alt text-red-600">{errors.tinh?.message}</span>
                    </div>
                </label>
                <label className="form-control text-yellow-600 w-full max-w-xs">
                    <select {...register("huyen")}
                        onChange={hendleHuyenChange}
                        className="select select-bordered"
                        defaultValue={"-- Huyện --"}
                    >
                        <option disabled>-- Huyện --</option>
                        {
                            address.huyen?.map((item, index) => (
                                <option value={`${item.code}/${item.name}`} key={index} >{item.name}</option>
                            ))
                        }
                    </select>
                    <div className="label">
                        <span className="label-text-alt text-red-600">{errors.huyen?.message}</span>
                    </div>
                </label>
                <label className="form-control text-yellow-600 w-full max-w-xs">
                    <select {...register("xa")} className="select select-bordered" defaultValue={"-- Xã --"}>
                        <option disabled >-- Xã --</option>
                        {
                            address.xa?.map((item, index) => (
                                <option value={`${item.code}/${item.name}`} key={index} >{item.name}</option>
                            ))
                        }
                    </select>
                    <div className="label">
                        <span className="label-text-alt text-red-600">{errors.xa?.message}</span>
                    </div>
                </label>
                <div className=' text-yellow-600'>
                    <label className="form-control w-full max-w-xs">
                        <input {...register("more")} type="text" placeholder="Số nhà, đường..." className="input placeholder:text-yellow-600 placeholder:italic input-bordered w-full max-w-xs" />
                        <div className="label">
                            <span className="label-text-alt text-red-600">{errors.more?.message}</span>
                        </div>
                    </label>
                </div>
                <div className='w-full text-center pt-4'>
                    <button className='btn px-8 bg-black glass'>
                        <FaClipboardCheck />
                        Đặt Hàng
                    </button>
                </div>
            </form>
        </>
    );
}

export default CustomerInfo;