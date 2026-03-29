import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function OrderDetails() {

    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {

        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(
                    `http://localhost:5000/api/orders/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                setOrder(res.data.order);
                setItems(res.data.items);

            } catch (err) {
                console.error(err);
            }
        };

        fetchOrder();

    }, [id]);

    return (
        <div style={{ padding: 20 }}>
            <h2>Order Details</h2>

            {order && (
                <>
                    <p><b>Customer:</b> {order.customer_name}</p>
                    <p><b>Total:</b> ${order.total_price}</p>
                </>
            )}

            <h3>Items</h3>

            {items.map((item) => (
                <div key={item.id}>
                    Product ID: {item.product_id} | Qty: {item.quantity}
                </div>
            ))}
        </div>
    );
}

export default OrderDetails;