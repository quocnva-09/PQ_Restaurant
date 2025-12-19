import React, { useEffect, useState } from 'react';
import OrderService from '../../services/OrderSevice';
import { useUserContext } from '../../context/UserContext';
import { myAssets } from '../../assets/assets';
import { toast } from 'react-toastify';

function ViewOrder() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { formatCurrency, navigate } = useUserContext();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await OrderService.findAllOrders();
                setOrders(data.result || []);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleStatusChange = async (order, newStatus) => {
        try {
            const request = {
                note: order.note,
                orderDate: order.orderDate,
                status: newStatus, // Giá trị mới từ <select>
                totalMoney: order.totalMoney,
                shippingMethod: order.shippingMethod,
                trackingNumber: order.trackingNumber,
                paymentMethod: order.paymentMethod,
                active: order.active,
                userId: order.userId,
                address: {
                    phoneNumber: order.address.phoneNumber,
                    email: order.address.email,
                    city: order.address.city,
                    district: order.address.district,
                    ward: order.address.ward,
                    street: order.address.street,
                    streetNumber: order.address.streetNumber,
                    addressNote: order.address.addressNote
                },
                orderDetails: order.orderDetails.map(detail => ({
                    price: detail.price,
                    numProducts: detail.numProducts,
                    totalMoney: detail.totalMoney,
                    size: detail.size,
                    productId: detail.product.id
                }))
            };

            console.log(request);
            // Gọi service cập nhật
            await OrderService.updateOrder(order.id, request);
            
            // Cập nhật lại state local để UI hiển thị giá trị mới ngay lập tức
            setOrders(prevOrders => 
                prevOrders.map(o => o.id === order.id ? { ...o, status: newStatus } : o)
            );

            toast.success("Cập nhật trạng thái thành công!");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.");
            console.error(error);
        }
    };
    const handleDeleteOrder = async (orderId) => {
        const isConfirm = window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng #${orderId} không? Hành động này không thể hoàn tác.`);
        
        if (isConfirm) {
            try {
                await OrderService.deleteOrder(orderId);
                setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
                toast.success("Xóa đơn hàng thành công");
            } catch (error) {
                console.error("Lỗi khi xóa đơn hàng:", error);
                toast.error("Không thể xóa đơn hàng. Vui lòng thử lại sau.");
            }
        }
    };

    if (loading) return <div className="p-10 text-center text-xl">Đang tải dữ liệu...</div>;

    return (
        <div className='md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] overflow-y-scroll w-full lg:w-11/12 bg-primary shadow rounded-xl'>
            {/* All Orders */}
            <div className='bg-primary'>
                {orders.map((order) => (
                    <div key={order.id} className='bg-white p-2 mt-3 rounded-2xl'>
                        <div className='flex flex-row justify-between items-center gap-4 mb-3 p-2'>
                            <div className='flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                                {/* Order Items */}
                                {order.orderDetails.slice(0, 6).map((item, idx) => (
                                    <div key={idx} className='text-gray-700 border-gray-100 pr-2'>
                                        <div className='flex gap-x-3'>
                                            <div className='flexCenter bg-primary rounded-xl'>
                                                <img 
                                                    src={myAssets[item.product.productImage]} 
                                                    alt={item.product.name} 
                                                    className='max-h-20 max-w-20 object-contain' 
                                                />
                                            </div>
                                            <div className='block w-full'>
                                                <h5 className='uppercase line-clamp-1'>{item.product.name}</h5>
                                                <div className='flex flex-wrap gap-3 max-sm:gap-y-1 mt-1'>
                                                    <div className='flex items-center gap-x-2'>
                                                        <h5 className='text-sm font-medium'>Price:</h5>
                                                        <p>{formatCurrency(item.price)}</p>
                                                    </div>
                                                    <div className='flex items-center gap-x-2'>
                                                        <h5 className='text-sm font-medium'>Quantity:</h5>
                                                        <p>{item.numProducts}</p>
                                                    </div>
                                                    <div className='flex items-center gap-x-2'>
                                                        <h5 className='text-sm font-medium'>Size:</h5>
                                                        <p>{item.size}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Button OrderDetail & Delete */}
                            <div className='flex flex-col gap-2 flex-shrink-0 min-w-[120px]'>
                                <button 
                                    onClick={() => navigate(`/order-detail/${order.id}`)}
                                    className='px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-700 transition-all shadow-sm'
                                >
                                    Order Detail
                                </button>
                                <button 
                                    onClick={() => handleDeleteOrder(order.id)}
                                    className='w-full px-4 py-2 bg-red-600 text-white text-[11px] font-bold uppercase rounded-lg hover:bg-red-700 transition-all shadow-sm'
                                >
                                    Delete
                                </button>
                                {order.orderDetails.length > 6 && (
                                    <h5 
                                    onClick={() => navigate(`/order-detail/${order.id}`)}
                                    className='text-[10px] md:text-[11px] text-gray-400 italic font-medium mt-1'>
                                        (More {order.orderDetails.length - 6} items...)
                                    </h5>
                                )}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-t border-gray-300 pt-3'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center gap-x-2'>
                                    <h5 className='text-sm font-medium'>OrderId:</h5>
                                    <p className='text-gray-400 text-sm break-all'>#{order.id}</p>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='flex items-center gap-x-2'>
                                        <h5 className='text-sm font-medium'>Customer:</h5>
                                        <p className='text-gray-400 text-sm break-all'>
                                            {order.address.user.fullName}
                                        </p>
                                        <div className='flex items-center gap-x-2'>
                                            <h5 className='text-sm font-medium'>Phone:</h5>
                                            <p className='text-gray-400 text-sm'>{order.address.phoneNumber}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='flex items-center gap-x-2'>
                                        <h5 className='text-sm font-medium'>Address:</h5>
                                        <p className='text-gray-400 text-sm break-all'>{order.address.fullAddress}</p>
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='flex items-center gap-x-2'>
                                        <h5 className='text-sm font-medium'>Payment Status:</h5>
                                        <p className='text-gray-400 text-sm break-all'>
                                            {order.status === "PAID" ? "Done" : "Pending"}
                                        </p>
                                        <div className='flex items-center gap-x-2'>
                                            <h5 className='text-sm font-medium'>Method:</h5>
                                            <p className='text-gray-400 text-sm'>{order.paymentMethod}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='flex items-center gap-x-2'>
                                        <h5 className='text-sm font-medium'>Date:</h5>
                                        <p className='text-gray-400 text-sm '>
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className='flex items-center gap-x-2'>
                                        <h5 className='text-sm font-medium'>Amount:</h5>
                                        <p className='text-gray-400 text-sm'>{formatCurrency(order.totalMoney)}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='flex items-center gap-x-2'>
                                <h5 className='text-sm font-medium'>Status:</h5>
                                <select 
                                    value={order.status} 
                                    onChange={(e) => handleStatusChange(order, e.target.value)}
                                    className='ring-1 ring-slate-900/5 rounded bg-primary text-sm font-semibold p-1'
                                >
                                    <option value="PENDING">PENDING</option>
                                    <option value="ACCEPTED">ACCEPTED</option>
                                    <option value="DENIED">DENIED</option>
                                    <option value="NOT_PAY">NOT_PAY</option>
                                    <option value="PAID">PAID</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewOrder;