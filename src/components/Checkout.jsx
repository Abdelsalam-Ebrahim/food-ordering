import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Modal from "./UI/Modal";
import { Cartcontext } from "../store/CartContext";
import Input from "./UI/Input";
import { UserProgessContext } from "../store/UserProgessContext";
import { useActionState } from "react";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import toast from "react-hot-toast";
// import Toaster, { toast } from "react-hot-toast";


const requestConfig = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};

const Checkout = () => {

  const { items, clearCart } = useContext(Cartcontext);
  const { progress, hideCheckout } = useContext(UserProgessContext)
  const {
    data,
    error,
    sendRequest,
    clearData,
    // isLoading,
  } = useHttp('http://localhost:3000/orders', requestConfig);
  
  
  const totalPrice = items.reduce((totalP, item) => totalP + item.quantity * item.price, 0);
  
  async function checkoutAction(e, formData) {
    const customerData = Object.fromEntries(formData.entries());

    await sendRequest(JSON.stringify({
      order: {
        items,
        customer: customerData
      }
    }));

    return customerData;
  }

  function handleFinish() {
    toast.success('Order Submitted Successfully',
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      },
    );

    hideCheckout();
    clearCart();
    clearData();
  }

  const [, formAction, isSending] = useActionState(checkoutAction, null);
  
  let actions = (
    <>
      <button className="text-button" type="button" onClick={hideCheckout}>Close</button>
      <button className="button">Sumbit Order</button>
    </>
  );

  if(isSending) {
    actions = <span>Sending order data...</span>;
  }

  if(data && !error) {
    return (
      <>
        <Modal open={progress === 'checkout'} onClose={handleFinish}>
          <h2>Success!</h2>
          <p>Your order was submitted successfully</p>
          <p>We will get back to you with more details via email within the next few minutes.</p>
          <p className="modal-actions">
            <button className="button" onClick={handleFinish}>Okay</button>
          </p>
        </Modal>
        {/* { toast.success('Added Successfully') }
        <Toaster postion='top-center'  /> */}
      </>
    )
  }

  return (
    <Modal open={progress === 'checkout'} onClose={progress === 'checkout' ? hideCheckout : null}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalPrice)} </p>

        <Input id="name"  type="text" label="Full Name" />
        <Input id="email"  type="email" label="E-Mail Address" />
        <Input id="street"  type="text" label="Street" />
        <div className="control-row">
          <Input id="postal-code"  type="text" label="Postal Code" />
          <Input id="city"  type="text" label="City" />
        </div>

        {error && <Error title="Failed to sumbit order" message={error} />}

        <p className="modal-actions"> {actions} </p>

      </form>
    </Modal>
  )
}

export default Checkout;
