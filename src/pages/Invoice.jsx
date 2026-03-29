import { useParams } from "react-router-dom";

function Invoice() {

  const { id } = useParams();

  return (
    <div style={{ padding: 20 }}>
      <h2>Invoice</h2>
      <p>Order ID: {id}</p>

      <button onClick={() => window.print()}>
        Print Invoice
      </button>
    </div>
  );
}

export default Invoice;