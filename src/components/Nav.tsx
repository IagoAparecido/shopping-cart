type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

function Nav({ viewCart, setViewCart }: PropsType) {
  const button = viewCart ? (
    <button onClick={() => setViewCart(false)}>Ver Produtos</button>
  ) : (
    <button onClick={() => setViewCart(true)}>Ver Carrinho</button>
  );

  const content = <nav className="nav">{button}</nav>;

  return content;
}

export default Nav;
