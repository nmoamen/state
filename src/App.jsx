
import { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import Swal from "sweetalert2";

export default function App() {
  const nameInput = useRef();
  const priceInput = useRef();
  const qtyInput = useRef();

  const [editIndex, seteditIndex] = useState(null);

  const [products, setproducts] = useState([
    { name: "iphone x", price: 400, pty: 3 },
    { name: "iphone 11", price: 450, pty: 5 },
    { name: "iphone 12", price: 500, pty: 8 },
    { name: "iphone 13", price: 600, pty: 15 },
    { name: "iphone 14", price: 650, pty: 10 },
    { name: "iphone 15", price: 700, pty: 20 },
    { name: "iphone 16", price: 800, pty: 25 },
    { name: "iphone 17", price: 900, pty: 30 },
    { name: "iphone 18", price: 1000, pty: 40 },
  ]);

  const savePhone = () => {
    let newPhone = {
      name: nameInput.current.value,
      price: priceInput.current.value,
      pty: qtyInput.current.value,
    };

    let copy = [...products];

    if (editIndex !== null) {
      copy[editIndex] = newPhone;
      seteditIndex(null);
    } else {
      copy.push(newPhone);
    }

    setproducts(copy);
    document.getElementById("my_modal_5").close();
  };

  const deletePhone = (index) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-error",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const copy = [...products];
          copy.splice(index, 1);
          setproducts(copy);

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your product is safe :)",
            icon: "error",
          });
        }
      });
  };

  const editPhone = (index) => {
    seteditIndex(index);

    nameInput.current.value = products[index].name;
    priceInput.current.value = products[index].price;
    qtyInput.current.value = products[index].pty;

    document.getElementById("my_modal_5").showModal();
  };

  return (
    <div
      className=" w-full h-dvh overflow-auto flex justify-center"
      data-theme="light"
    >
      <div className="container flex flex-col gap-4">
        <h1 className="bg-gray-800 py-4 text-white text-2xl text-center">
          My products
        </h1>

        <button
          className="btn btn-primary w-50"
          onClick={() => {
            seteditIndex(null);
            nameInput.current.value = "";
            priceInput.current.value = "";
            qtyInput.current.value = "";
            document.getElementById("my_modal_5").showModal();
          }}
        >
          Add new phone
        </button>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Phone</h3>
            <div className="modal-action">
              <div method="dialog" className="w-full flex flex-col gap-4">
                <input
                  ref={nameInput}
                  className="input w-full"
                  type="text"
                  placeholder="enter phone name"
                />
                <input
                  ref={priceInput}
                  className="input w-full"
                  type="text"
                  placeholder="enter phone price"
                />
                <input
                  ref={qtyInput}
                  className="input w-full"
                  type="text"
                  placeholder="enter phone qty"
                />
                <div className="w-full flex justify-between">
                  <button
                    onClick={() => {
                      seteditIndex(null);
                      document.getElementById("my_modal_5").close();
                    }}
                    className="btn btn-error"
                  >
                    Close
                  </button>
                  <button
                    id="saveBtn"
                    className="btn btn-success"
                    onClick={() => {
                      savePhone();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </dialog>

        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>product name</th>
              <th>product price</th>
              <th>product qty</th>
            </tr>
          </thead>
          <tbody>
            {products.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el.name}</td>
                  <td>{el.price} USD</td>
                  <td>{el.pty}</td>
                  <td>
                    <button
                      onClick={() => {
                        deletePhone(index);
                      }}
                      className="btn btn-error"
                    >
                      Delete <FaTrash />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        editPhone(index);
                      }}
                      className="btn btn-warning"
                    >
                      Edit <MdEditSquare />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
