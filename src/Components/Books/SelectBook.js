import "../../Assets/css/Login.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPenFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteBook, fetchBook, handleSearch, searchBook } from "../../store/actions/bookAction";
import AddBook from "./AddBook";
const SelectBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error } = useSelector((state) => ({
    data: state.book.bookData,
    error: state.book.error,
  }));
  const [show, setShow] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editData, setEditData] = useState({});
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setEditData({});
  };

  useEffect(() => {
    // dispatch(fetchBook());
  }, [dispatch]);
  function handleDelete(_id) {
    Swal.fire({
      title: ` you want to delete data `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBook(_id));
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
        // dispatch(fetchBook());
      }
    });
  }
  const handleUpdate = (element) => {
    setEditData(element);
    handleShow();
  };
  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    searchParams.set("search", searchValue);
    navigate(`?${searchParams.toString()}`);
    dispatch(searchBook(searchValue))
  };
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  return (
    <>
      <div className="Search_form mb-5">
        <section className="row ms-3 mt-2">
          <div className="col col-6 col-lg-6 col-xxl-4 ">
            <h3 className="heading">Transfer Users</h3>
            <p>Select one or more that you want to transfer</p>
          </div>
          <div className="col-6 col-lg-5 col-xxl-5 mt-4">
            <input
              name="search"
              id="search"
              type="text"
              size="40"
              value={search || ""}
              className="border p-2 search"
              placeholder=" &#128270; search data with Book and Author name"
              onChange={handleSearch}
            />
          </div> 
        </section>
        <div className="text-end">
          <AddBook
            editData={editData}
            data={data}
            setEditData={setEditData}
            show={show}
            handleClose={handleClose}
            handleShow={handleShow}
            setIsAdding={setIsAdding}
          />
        </div>
        <div className="table_ mt-3 ms-4 me-4">
          <table cellPadding="20px" align="center">
            <thead>
              <tr className="heading">
                <td className="table_td">author_id</td>
                <td className="table_td">author name</td>
                <td className="table_td">Name</td>
                <td className="table_td">launch_date</td>
                <td className="table_td">genre</td>
                <td className="table_td">number_of_sales</td>
                <td className="table_td">Description</td>
                <td className="table_td">Update</td>
                <td className="table_td">Delete</td>
              </tr>
            </thead>
            <tbody>
              {data.map((element, index) => (
                <tr key={index}>
                  <td className="text-secondary ms-5"> {element.author_id._id}</td>
                  <td className="ms-5">{element.author_id.name}</td>
                  <td>{element.name}</td>
                  <td className="text-secondary ms-5">{element.launch_date}</td>
                  <td className="text-secondary ms-5">{element.genre}</td>
                  <td className="text-secondary ms-5">
                    {element.number_of_sales}
                  </td>
                  <td className="text-secondary ms-5">{element.description}</td>
                  <td>
                    <button
                      variant="primary"
                      onClick={() => handleUpdate(element)}
                    >
                      <BsFillPenFill />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(element._id)}>
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SelectBook;
