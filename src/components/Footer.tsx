import useCart from "../hooks/useCart";

type PropsType = {
  viewCart: boolean;
};

function Footer({ viewCart }: PropsType) {
  const { totalItems, totalPrice } = useCart();

  const year: number = new Date().getFullYear();

  const pageContent = viewCart ? (
    <p>Carrinho &copy; {year} </p>
  ) : (
    <>
      <p>Total de Itens: {totalItems}</p>
      <p>Preço Total: {totalPrice}</p>
      <p>Carrinho &copy; {year} </p>
    </>
  );

  const content = <footer className="footer">{pageContent}</footer>;

  return content;
}

export default Footer;
