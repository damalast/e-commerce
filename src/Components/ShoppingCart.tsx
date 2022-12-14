import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { currencyFormat } from "../utilities/currencyFormat";
import { CartItem } from "./Cartitem";
import storeItems from "../data/items.json";
import { Checkout } from "./Checkout";

type ShoppingCartProps = {
    isOpen: boolean
}


export function ShoppingCart({ isOpen } : ShoppingCartProps) {
  const { closeCart, cartItems } =  useShoppingCart() 
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
            {cartItems.map(item => (
            <CartItem key={item.id} {...item } /> ))} 
            <div className="ms-auto fw-bold fs-5" >
              Total {currencyFormat(cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0)* cartItem.quantity
              }, 0)
            )}
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <Button className="w-100 bg-danger border-danger" onClick={() => Checkout()}>Complete order</Button>
              </div>
        </Stack>
          
      </Offcanvas.Body>
    </Offcanvas>
  );
}
