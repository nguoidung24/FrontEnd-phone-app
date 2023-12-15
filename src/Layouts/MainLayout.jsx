import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function MainLayout({ children }) {
    let nav = useNavigate();
    const [infoUser, setInfoUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const user = await localStorage.getItem('user');
            if (!infoUser)
                setInfoUser(user)
        }
        getUser();
    }, [])
    const handleCartClick = () => {
        if (!infoUser)
            nav("/login")
        else
            nav("/cart", {
                state: {
                    id: JSON.parse(infoUser).id,
                }
            })

    }
    const handleLogOutClick = () => {
        const logOut = async () => {
            await localStorage.clear();
            setInfoUser(null)
            toast.warn("Đã đăng xuất !")
            nav("/")
        }
        if (infoUser)
            Swal.fire({
                title: `Bạn có muốn đăng xuất khỏi ${JSON.parse(infoUser).name} ?`,
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
                    logOut();
                }
            })
        else
            toast.warn("Bạn chưa đăng nhập")
    }
    return (
        <div  className=''>
            <div className="navbar bg-base-100 sticky top-0 left-0 z-50">
                <div className="navbar-start">
                    <div className="drawer-start drawer">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer-4" className="hover:cursor-pointer drawer-button">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu min-h-full w-80 bg-base-200 px-2 py-4 text-base-content">
                                <ul className="menu bg-base-200 w-full rounded-box">
                                    <li>
                                        <Link to={"/"}>
                                            <IoHomeOutline size={20} />
                                            Trang Chủ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/account"}>
                                            <FaRegUserCircle size={20} />
                                            {infoUser ? JSON.parse(infoUser).name : "Tài Khoản"}
                                        </Link>
                                    </li>
                                    <li>
                                        <a onClick={handleLogOutClick}>
                                            <CiLogout size={20} />
                                            Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="navbar-center">
                    <Link to={"/"}>
                        <p className="btn uppercase font-mono btn-ghost text-xl">Điện Thoại Việt Trì</p>
                    </Link>
                </div>
                <div className="navbar-end">
                    <button onClick={handleCartClick} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            {/* <span className="badge badge-sm indicator-item">0</span> */}
                        </div>
                    </button>
                </div>
            </div>
            <div className='p-2'>
                {children}
            </div>
            <footer className="footer p-10 bg-base-200 text-base-content mt-9">
                <aside>
                    <span className="animate-spin"><svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg></span>
                    <p className="font-bold text-lg">Điện Thoại Việt Trì.</p>
                    <p>Cung cấp các dòng điện thoại chất lượng</p>
                </aside>
                <nav>
                    <header className="footer-title">Dịch vụ</header>
                    <a className="link link-hover">Các dòng điện thoại mới</a>
                    <a className="link link-hover">Giao hàng tận nơi</a>
                    <a className="link link-hover">Tìm kiếm nhanh chóng</a>
                </nav>
                <nav>
                    <header className="footer-title">Chúng tôi</header>
                    <a className="link link-hover">Liên hệ</a>
                    <a className="link link-hover">Việc làm</a>
                    <a className="link link-hover">Báo chí</a>
                </nav>
                <nav>
                    <header className="footer-title">Pháp lý</header>
                    <a className="link link-hover">Chính sách trả hàng</a>
                    <a className="link link-hover">Kiểm tra hàng</a>
                </nav>
            </footer>
        </div>
    );
}

export default MainLayout;
