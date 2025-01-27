import {useEffect, useState} from "react"
import { Trash2 } from "react-feather"
import {useDispatch, useSelector} from "react-redux";
import {Item as ItemModel} from "../models/Item.ts";
import {AppDispatch} from "../../store/store.tsx";
import {deleteItem, getAllItems, saveItem, updateItem} from "../reducers/itemReducer.ts";

function Item() {

  const [itemId, setItemId] = useState("")
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const items = useSelector((state: any) => state.item)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getAllItems())
  }, [dispatch]);

  const itemSet = items.filter((items: ItemModel , index : number , self) => {
    if (index === self.findIndex((t : ItemModel) => (t.id === items.id))) {
      return items;
    }
  })

  const handleAdd = () => {
    if (!itemId || !name || !quantity || !price) {
      alert("All fields are required!")
      return
    }
    const newItem : ItemModel = new ItemModel(itemId, name, parseFloat(price), parseInt(quantity));
    dispatch(saveItem(newItem));
    resetForm()
  }

  const handleEdit = (item: ItemModel) => {
    setItemId(item.id)
    setName(item.name)
    setQuantity(item.qty.toString())
    setPrice(item.price.toString())
    setIsEditing(true)
  }

  const handleUpdate = () => {
    if (!itemId || !name || !quantity || !price) {
      alert("All fields are required!")
      return
    }
    const updateNewItem : ItemModel = new ItemModel(itemId, name, parseFloat(price), parseInt(quantity));
    dispatch(updateItem(updateNewItem));
    resetForm()
  }

  const handleDelete = (itemId: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
        dispatch(deleteItem(itemId))
    }
  }

  const resetForm = () => {
    setItemId("")
    setName("")
    setQuantity("")
    setPrice("")
    setIsEditing(false)
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="item_id"
          placeholder="Item ID"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex justify-end">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white p-2 rounded mr-2"
          >
            Add
          </button>
        )}
        {isEditing && (
          <button
            onClick={resetForm}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
      <table className="min-w-full table-auto border-collapse mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Item ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemSet.map((item : ItemModel) => (
            <tr
              key={item.id}
              onClick={() => handleEdit(item)}
              className="hover:cursor-pointer hover:bg-slate-600 hover:text-white"
            >
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.qty}</td>
              <td className="border px-4 py-2">{Number(item.price).toFixed(2)}</td>
              <td className="border px-4 py-2 text-center">
              <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(item.id)
                  }}
                  className="bg-red-500 text-white p-2 rounded-lg"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Item
