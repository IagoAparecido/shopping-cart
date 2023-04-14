import { ChangeEvent, ReactElement, memo } from "react";
import { CartItemType } from "../context/CartProvider";
import { ReducerAction } from "../context/CartProvider";
import { ReducerActionType } from "../context/CartProvider";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

function CartLineItem({ item, dispatch, REDUCER_ACTIONS }: PropsType) {
  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url)
    .href;
  console.log(img);

  const lineTotal: number = item.qty * item.price;

  const highestQty: number = 20 > item.qty ? 20 : item.qty;

  const optionValues: number[] = [...Array(highestQty).keys()].map(
    (i) => i + 1
  );

  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });

  const content = (
    <li className="cart_item">
      <img src={img} alt={item.name} className="cart_img" />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Price Per Item">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.price)}
      </div>

      <label htmlFor="itemQty" className="offscreen">
        Quantidade de itens
      </label>
      <select
        name="itemQty"
        id="itemQty"
        className="cart_select"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQty}
      >
        {options}
      </select>

      <div className="cart_item-subtotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(lineTotal)}
      </div>

      <button
        className="cart_button"
        aria-label="Remove Item From Cart"
        title="Remove Item From Cart"
        onClick={onRemoveFromCart}
      >
        X
      </button>
    </li>
  );

  return content;
}

function areItemsEqual(
  { item: prevItem }: PropsType,
  { item: nextItem }: PropsType
) {
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
    );
  });
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(
  CartLineItem,
  areItemsEqual
);

export default MemoizedCartLineItem;