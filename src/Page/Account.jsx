import React, { useEffect, useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import axios from 'axios';
import { FaRegEye } from "react-icons/fa";
import { Link } from 'react-router-dom';

const tabs = [
    "Đang Giao",
    "Đang Chờ",
    "Đã Giao"
]
function Account() {
    const userInfo = localStorage.getItem("user");
    const [tabActive, setTabActive] = useState(1);
    const handleTabClick = (index) => {
        setTabActive(index)
    }
    const [dataUser, setDataUser] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const user = await localStorage.getItem("user");
            const idUser = await JSON.parse(user).id;
            const data = await axios.get(`https://dungtamtithoo-001-site1.itempurl.com/api/OrderProducts/CID/${idUser}`);
            let dataTable = [];
            if (tabActive == 2) {
                dataTable = data.data.filter(d => d.o.statusOrderId == 1 || d.o.statusOrderId == -1);
            } else if (tabActive == 1) {
                dataTable = data.data.filter(d => d.o.statusOrderId == 0);
            }
            else {
                dataTable = data.data.filter(d => d.o.statusOrderId == 2);
            }
            setDataUser(dataTable);
        }
        fetchData();
    }, [tabActive])
    return (
        <div>
            <p className=''>
                <FaRegUserCircle className='mx-auto lg:text-7xl text-5xl' />
            </p>
            <p className='text-center py-4 text-xl'>
                {JSON.parse(userInfo).name}
            </p>
            <p className='text-center'>
                Số điện thoại: 0 ****** 321
            </p>
            {/* <p className='text-center'>
                Mật khẩu: *********
                <button className='ms-2 hover:text-orange-700'><CiEdit /></button>
            </p> */}
            <div className='w-full mt-6'>
                <div role="tablist" className="tabs tabs-bordered lg:w-2/4 mx-auto">
                    {
                        tabs.map((item, index) => (
                            <a
                                onClick={() => handleTabClick(index)}
                                key={index}
                                role="tab"
                                className={`tab hover:font-bold ${tabActive == index && "tab-active"}`}>
                                {item}
                            </a>)
                        )
                    }
                </div>
            </div>
            <div className='w-full lg:mt-9 mt-3'>
                <div className="overflow-x-auto">
                    <table className="table text-center lg:table-md table-sm table-zebra">
                        <thead>
                            <tr>
                                <th>Ngày</th>
                                <th>Tổng tiền</th>
                                <th>Địa chỉ</th>
                                <th>Giao</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataUser?.map((item, index) => (
                                    <tr style={{ fontSize: "12px" }} key={index}>
                                        <th>{item.o.orderDate.split('T')[0]}</th>
                                        <th>{item.o.totalAmount.toLocaleString('vi-VN', {
                                            currency: 'VND',
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 2
                                        })}<sup>&nbsp;vnđ</sup></th>
                                        <th>{`Anh, chị ${item.o.address.split("/")[0]}, Số điện thoại ${item.o.address.split("/")[1]} - ${item.o.address.split("/")[2]} - ${item.o.address.split("/")[3]} - ${item.o.address.split("/")[4]} - Số nhà, đường... ${item.o.address.split("/")[5]}`}</th>
                                        <th>
                                            <span className={`rounded px-1 ${item.o.statusOrderId == 1 && " text-success"} ${item.o.statusOrderId == -1 && " text-red-600"}`}>
                                                {item.description}
                                            </span>
                                        </th>
                                        <th>
                                            <Link
                                                state={{...item.o}}
                                                to={"/orderdetail"}
                                                className='hover:text-red-700 text-lg'>
                                                <FaRegEye />
                                            </Link>
                                        </th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
}

export default Account;