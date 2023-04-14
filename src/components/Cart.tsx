import useCart from "../hooks/useCart";
import { useState } from "react";
import CartLineItem from "./CartLineItem";

function Cart() {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const pageContent = confirm ? (
    <h2>Obrigado por comprar</h2>
  ) : (
    <>
      <h2 className="offscreen">Carrinho</h2>
      <ul className="cart">
        {cart.map((item) => {
          return (
            <CartLineItem
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          );
        })}
      </ul>
      <div className="cart_totals">
        <p>Total de itens: {totalItems}</p>
        <p>Preço total: {totalPrice}</p>
        <button
          className="cart_submit"
          disabled={!totalItems}
          onClick={onSubmitOrder}
        >
          Realizar Pedido
        </button>
      </div>
    </>
  );

  const content = <main className="main main--cart">{pageContent}</main>;

  return content;
}

export default Cart;
