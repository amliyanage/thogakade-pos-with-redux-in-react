import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {getAllItems} from "../reducers/itemReducer.ts";
import {AppDispatch} from "../../store/store.tsx";
import {getAllCustomers} from "../reducers/customerReducer.ts";
import {Item} from "../models/Item.ts";
import {CustomerModel} from "../models/Customer.ts";
import {OrderDetails} from "../models/OrderDetails.ts";
import {Order} from "../models/Order.ts";
import {saveOrder} from "../reducers/orderReducer.ts";

function PlaceOrder() {
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [selectedItem, setSelectedItem] = useState<Item>(null)
  const [orderItems, setOrderItems] = useState<any[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch<AppDispatch>()

  const items : Item[] = useSelector((state: any) => state.item)

  useEffect(() => {
    dispatch(getAllItems())
    dispatch(getAllCustomers())
  }, []);

  const customers : CustomerModel[] = useSelector((state: any) => state.customer)

  const handleItemSelect = (itemId: string) => {
    const item = items?.find((item) => item.id === itemId)
    setSelectedItem(item as Item)
    setQuantity(1)
  }

  const handleAddToCart = () => {
    if (!selectedItem) return
    if (quantity < 1) {
      alert("Quantity must be at least 1")
      return
    }
    if (quantity > selectedItem.qty) {
      alert("Insufficient stock available!")
      return
    }

    const existing = orderItems.find(
        (orderItem) => orderItem.id === selectedItem.id
    )
    if (existing) {
      alert("Item already added to the order!")
      return
    }

    const newOrderItem = {
      ...selectedItem,
      quantity,
      total: selectedItem.price * quantity
    }

    setOrderItems([...orderItems, newOrderItem])
    // setSelectedItem(null)
    setQuantity(1)
    calculateTotal([...orderItems, newOrderItem])
  }

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      alert("Quantity must be at least 1")
      return
    }

    const findedItem: any = items.find(
        (orderItem) => orderItem.id === itemId
    )
    if (quantity > findedItem?.quantity) {
      alert("Insufficient stock available!")
      return
    }

    const updatedItems = orderItems.map((orderItem) =>
        orderItem.item_id === itemId
            ? { ...orderItem, quantity, total: orderItem.price * quantity }
            : orderItem
    )
    setOrderItems(updatedItems)
    calculateTotal(updatedItems)
  }

  const handleRemoveItem = (itemId: string) => {
    const updatedItems = orderItems.filter(
        (orderItem) => orderItem.item_id !== itemId
    )
    setOrderItems(updatedItems)
    calculateTotal(updatedItems)
  }

  const handlePlaceOrder = () => {
    if (!selectedCustomer) {
      alert("Please select a customer!")
      return
    }
    if (orderItems.length === 0) {
      alert("Add at least one item to the order!")
      return
    }

    const orderId = crypto.randomUUID();

    const orderDetails : OrderDetails[] = orderItems.map((orderItem : Item) => {
      return new OrderDetails(
          crypto.randomUUID(),
          orderId,
          orderItem.id,
          orderItem.qty,
          orderItem.price
      )
    })

    const order = new Order(orderId, selectedCustomer, orderDetails)

    dispatch(saveOrder(order))
    alert("Order placed successfully!")
    resetForm()

  }

  const resetForm = () => {
    setSelectedCustomer("")
    setOrderItems([])
    setTotalPrice(0)
  }

  const calculateTotal = (items: any[]) => {
    const total = items.reduce(
        (acc, curr) => acc + curr.quantity * curr.price,
        0
    )
    setTotalPrice(total)
  }

  return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Place Order</h2>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Select Customer</label>
          <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="border p-2 rounded w-full"
          >
            <option value="">-- Select Customer --</option>
            {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Select Item</label>
          <select
              onChange={(e) => handleItemSelect(e.target.value)}
              className="border p-2 rounded w-full"
          >
            <option value="">-- Select Item --</option>
            {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - ${item.price}
                </option>
            ))}
          </select>
        </div>

        {selectedItem && (
            <div className="border p-4 mt-4 rounded">
              <h4 className="font-bold text-lg">Item Details</h4>
              <p>Name: {selectedItem.name}</p>
              <p>Price: ${selectedItem.price}</p>
              <p>Stock: {selectedItem.qty}</p>
              <label className="block mt-2">Enter Quantity:</label>
              <input
                  type="number"
                  value={quantity}
                  min="1"
                  max={selectedItem.qty}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border p-2 rounded w-20"
              />
              <button
                  onClick={handleAddToCart}
                  className="bg-blue-500 text-white p-2 rounded mt-2"
              >
                Add to Cart
              </button>
            </div>
        )}

        {orderItems.length > 0 && (
            <table className="min-w-full table-auto border-collapse mt-4">
              <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Item Name</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
              </thead>
              <tbody>
              {orderItems.map((orderItem) => (
                  <tr key={orderItem.item_id}>
                    <td className="border px-4 py-2">{orderItem.name}</td>
                    <td className="border px-4 py-2">
                      ${orderItem.price}
                    </td>
                    <td className="border px-4 py-2">
                      <input
                          type="number"
                          value={orderItem.quantity}
                          min="1"
                          max={orderItem.stock}
                          className="w-16 border p-1 rounded"
                          onChange={(e) =>
                              handleQuantityChange(
                                  orderItem.item_id,
                                  parseInt(e.target.value)
                              )
                          }
                      />
                    </td>
                    <td className="border px-4 py-2">
                      ${(orderItem.quantity * orderItem.price)}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                          onClick={() => handleRemoveItem(orderItem.item_id)}
                          className="bg-red-500 text-white p-2 rounded-lg"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        )}

        <div className="mt-4 font-bold text-xl">
          Total: ${totalPrice.toFixed(2)}
        </div>

        <div className="flex justify-end mt-6">
          <button
              onClick={handlePlaceOrder}
              className="bg-green-500 text-white p-2 rounded"
          >
            Place Order
          </button>
        </div>
      </div>
  )
}

export default PlaceOrder