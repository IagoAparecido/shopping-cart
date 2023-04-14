import Nav from "./Nav";
import useCart from "../hooks/useCart";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

function Header({ viewCart, setViewCart }: PropsType) {
  const { totalItems, totalPrice } = useCart();

  const content = (
    <header className="header">
      <div className="header_title-bar">
        <h1>Acme Co.</h1>
        <div className="header_price-box">
          <p>Total de items: {totalItems}</p>
          <p>Preço total: {totalPrice}</p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  );
  return content;
}

export default Header;
