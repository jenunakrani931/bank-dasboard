import "../../Assets/css/Login.css";
import React, { useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPenFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterCateModal from "./FilterCateModal";
import Swal from "sweetalert2";
import AddProduct from "./AddProduct";
import { deleteProduct, fetchData } from "../../store/actions/productAction";

const Tableform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error } = useSelector((state) => ({
    data: state.product.data,
    error: state.product.error,
  }));
  const [allData, setAllData] = useState(data);
  const [show, setShow] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editData, setEditData] = useState({});
  const [searchParams] = useSearchParams();

  const getPage = searchParams.get("page");
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(getPage || 1);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setEditData({});
  };

  const categoryId = searchParams.get("category");
  const search = searchParams.get("search");
  const fetchDataParams = async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(
        fetchData(currentPage, itemsPerPage, categoryId, search)
      );
      console.log(response);

      setAllData(response.totalDocs);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchDataParams();
  }, [dispatch, currentPage, itemsPerPage, categoryId, search]);

  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    searchParams.set("search", searchValue);
    navigate(`?${searchParams.toString()}`);
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Delete Confirmation",
      text: "Are you sure you want to delete this data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(_id));
        Swal.fire("successfully delete data");
        fetchDataParams();
      }
    });
  };
  const handleUpdate = (element) => {
    setEditData(element);
    handleShow();
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
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
              placeholder=" &#128270;"
              onChange={handleSearch}
            />
          </div>
        </section>
        <div className="text-end">
          <FilterCateModal
            setAllData={setAllData}
            itemsPerPage={itemsPerPage}
            fetchDataWithParams={fetchDataParams}
          />
          <AddProduct
            editData={editData}
            data={data}
            setEditData={setEditData}
            show={show}
            handleClose={handleClose}
            handleShow={handleShow}
            setIsAdding={setIsAdding}
            fetchDataWithParams={fetchDataParams}
          />
        </div>
        <div className="table_ mt-3 ms-4 me-4">
          <table cellPadding="20px" align="center">
            <thead>
              <tr className="heading">
                <td className="table_td">Name</td>
                <td className="table_td">description</td>
                <td className="table_td">category</td>
                <td className="table_td">color</td>
                <td className="table_td">price</td>
                <td className="table_td">quantity</td>
                <td className="table_td">Update</td>
                <td className="table_td">Delete</td>
              </tr>
            </thead>
            <tbody>
              {data.map((element, index) => (
                <tr key={index}>
                  <td>{element.name}</td>
                  <td className="text-secondary ms-5">{element.description}</td>
                  <td>{element.category ? element.category.name : "null"}</td>
                  <td>{element.color}</td>
                  <td>{element.price}</td>
                  <td>{element.quantity}</td>
                  <td>
                    <button
                      variant="primary"
                      onClick={() => handleUpdate(element)}
                      className="btn border text-secondary"
                    >
                      <BsFillPenFill />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="btn border text-secondary"
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
              const searchData = searchParams.get("search");
              const categoryId = searchParams.get("category");
              navigate(`?${searchParams.toString()}`);
              dispatch(fetchData(page, itemsPerPage, categoryId, searchData));
            }}
            ellipsis={3}
            className="pagination-control"
          />
        </div>
      </div>
    </>
  );
};

export default Tableform;
