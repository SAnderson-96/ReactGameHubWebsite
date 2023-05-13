import React from "react";
interface Props {
  cartItemsCount: number;
}
function NavBar({ cartItemsCount }: Props) {
  return <div>NavBar: {cartItemsCount}</div>;
}

export default NavBar;
