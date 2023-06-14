import "../../Assets/css/Login.css";
import React, { useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPenFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import Addbook from "./AddBook";
import { deleteBook, fetchBook } from "../../store/actions/bookAction";
import FilterAuthor from "./FilterAuthor";

const FatchBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error } = useSelector((state) => ({
    data: state.book.bookData,
    error: state.book.error,
  }));
  const [allData, setAllData] = useState(data);
  const [show, setShow] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editData, setEditData] = useState({});
  const [searchParams] = useSearchParams();

  const itemsPerPage = 6;
  const getPage = searchParams.get("page");
  const search = searchParams.get("search");
  const AuthorId = searchParams.get("author");
  const [currentPage, setCurrentPage] = useState(getPage || 1);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setEditData({});
  };

  const fetchDataParams = () => {
    try {
      const response = dispatch(
        fetchBook(currentPage, itemsPerPage, AuthorId, search)
      );
      const promise1 = Promise.resolve(response);
      promise1.then((value) => {
        setAllData(value.data.data.totalDocs);
      });
    } catch (error) {}
  };

  useEffect(() => {
    fetchDataParams();
  }, [dispatch, currentPage, itemsPerPage, AuthorId, search]);

  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    searchParams.set("search", searchValue);
    navigate(`?${searchParams.toString()}`);
  };

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
        fetchDataParams();
      }
    });
  }

  const handleUpdate = (element) => {
    setEditData(element);
    handleShow();
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="Search_form mb-5 ">
        <section className="row ms-3 mt-2 ">
          <div className="col col-6 col-lg-6 col-xxl-4 ">
            <h3 className="heading">Transfer Users</h3>
            <p>Select one or more that you want to transfer</p>
          </div>
          <div className="col-6 col-lg-5 col-xxl-5 mt-4 ">
            <input
              name="search"
              id="search"
              type="text"
              size="40"
              value={search || ""}
              className="border p-2 search shadow-05"
              placeholder=" &#128270;"
              onChange={handleSearch}
            />
          </div>
        </section>
        <div className="text-end ">
          <FilterAuthor />
          <Addbook
            editData={editData}
            data={data}
            setEditData={setEditData}
            show={show}
            handleClose={handleClose}
            handleShow={handleShow}
            setIsAdding={setIsAdding}
            fetchDataParams={fetchDataParams}
          />
        </div>
        <div className="table_ mt-3 ms-4 me-4 ">
          <table cellPadding="20px" align="center">
            <thead>
              <tr className="heading">
                <td className="table_td">Author Id</td>
                <td className="table_td">Author Name</td>
                <td className="table_td">Book Name</td>
                <td className="table_td">LaunchDate</td>
                <td className="table_td">Genre</td>
                <td className="table_td">Sales</td>
                <td className="table_td">Description</td>
                <td className="table_td">Edit</td>
                <td className="table_td">Delete</td>
              </tr>
            </thead>
            <tbody>
              {data.map((element, index) => (
                <tr key={index}>
                  <td className=" ms-5 text-secondary" >{element.author_id._id}</td>
                  <td className="ms-5 text-secondary">{element.author_id.name}</td>
                  <td className="text-secondary" >{element.name}</td>
                  <td className=" ms-5 text-secondary">{element.launch_date}</td>
                  <td className=" ms-5 text-secondary">{element.genre}</td>
                  <td className=" ms-5 text-secondary">{element.number_of_sales}</td>
                  <td className=" ms-5 text-secondary">{element.description}</td>
                  <td>
                    <button
                      className="btn border"
                      onClick={() => handleUpdate(element)}
                    >
                      <BsFillPenFill />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="btn border"
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationControl
            page={currentPage}
            between={3}
            limit={itemsPerPage}
            total={allData}
            changePage={(page) => {
              setCurrentPage(page);
              searchParams.set("page", page);
              navigate(`?${searchParams.toString()}`);
            }}
            ellipsis={3}
            className="pagination-control "
          />
        </div>
      </div>
    </>
  );
};

export default FatchBook;
