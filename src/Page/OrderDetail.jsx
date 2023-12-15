import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { url } from "../Url/Url.js";
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function OrderDetail() {
    const { state } = useLocation();
    const [orderData, setOrderData] = useState([]);

    const nav = useNavigate();
    useEffect(() => {
        const ftechData = async () => {
            const data = await axios.get(`${url}api/OrderProductDetails/${state.orderProductId}`);
            setOrderData(data.data);
        }
        ftechData();
    }, [])
    const deleteOrder = async (id) => {
        const data = await axios.delete(`${url}api/OrderProducts/${id}`)
        if (data.data == "success") {
            nav("/account");
            toast.success("Hủy thành công !");
        }
        else
            toast.warning("Hủy không thành công !");
    }
    const hendelDeleteClick = async (id) => {
        Swal.fire({
            title: `Bạn có muốn hủy đơn hàng này ?`,
            showDenyButton: true,
            confirmButtonColor: "green",
            denyButtonColor: "orange",
            confirmButtonText: 'Có',
            icon: "question",
            background: "#000",
            denyButtonText: 'Không',
            customClass: {
                actions: 'my-actions',
                confirmButton: 'order-1 text-green-500',
                denyButton: 'order-2',
                icon: "w-16 h-16",
                title: "text-base",
            },

        }).then((result) => {
            if (result.isConfirmed) {
                deleteOrder(id);
            }
        })
    }
    const handleEvalueClick = async (id) => {

        Swal.fire({
            title: "Đánh giá sản phẩm",
            input: "range",
            inputAttributes: {
                autocapitalize: "off",
                min: 1,
                max: 5,
                step: 1,
            },
            confirmButtonColor:"green",
            width:"300px",
            customClass:{
                title:"text-base",
                confirmButton:"py-1",
                cancelButton:"py-1"
            },
            inputValue: 5,
            showCancelButton: true,
            confirmButtonText: "Gửi",
            showLoaderOnConfirm: true,
            preConfirm: async (value) => {
                try {
                    const data = await axios.post(`${url}api/Evaluates`, {
                        "productId": id,
                        "customerId": state.customerId,
                        "rating": Number(value)
                    });
                    if (data.data.status != 0) {
                        toast.success(data.data.description);
                    } else {
                        toast.warning(data.data.description);
                    }
                } catch (error) {
                    Swal.showValidationMessage(`
                  Request failed: ${error}
                `);
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {});
    }
    return (
        <div className='min-h-[50vh]'>
            <div className="overflow-x-auto">
                <table className="table text-center lg:w-3/4 mx-auto">

                    <thead>
                        <tr>
                            <th></th>
                            <th className='text-start'>Giá</th>
                            <th>Số lượng</th>
                            <th></th>
                            {state.statusOrderId == 1
                                && <th></th>
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {orderData.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <figure className='w-10 lg:w-16 mx-auto'>
                                        <img
                                            src={`${url}product/img/${item.products.productId}/thumbnail.png`}
                                            alt="Avatar Tailwind CSS Component" />
                                    </figure>
                                    <p className='font-bold truncate text-center ps-2 py-1'>
                                        {item.products.productName}
                                    </p>
                                </td>
                                <td className='text-start'>
                                    <p className='truncate'>
                                        {item.products.price.toLocaleString('vi-VN', {
                                            currency: 'VND',
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 2
                                        })}
                                        <sup>&nbsp;vnđ</sup>
                                    </p>
                                </td>
                                <td>
                                    <span>
                                        {item.orderDetail.quantity}
                                    </span>
                                </td>
                                {state.statusOrderId == 1
                                    && <td>
                                        <button
                                            onClick={() => handleEvalueClick(item.products.productId)}
                                            className='px-2 py-3 badge font-bold badge-success hover:scale-95 rounded text-[12px]'>
                                            Đánh giá
                                        </button>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
                {state.statusOrderId == 0
                    && <div className='w-full text-end pe-8'>
                        <button
                            onClick={() => hendelDeleteClick(state.orderProductId)}
                            className='btn mt-3 '
                        >
                            Hủy đơn hàng
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}

export default OrderDetail;