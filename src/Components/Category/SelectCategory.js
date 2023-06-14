import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPenFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  deleteCategory,
  fetchCategory,
} from "../../store/actions/categoryAction";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import AddCategory from "./AddCategory";
const SelectCategory = () => {
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useSearchParams();
  const [data, setdata] = useState(search.get("query"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryData, categoryError } = useSelector((state) => ({
    categoryData: state.category.categoryData,
    categoryError: state.category.categoryError,
  }));
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setEditData("");
  };
  const featchCategory = useEffect(() => {
    dispatch(fetchCategory(deleteCategory()));
  }, [dispatch]);

  const handleUpdate = (element) => {
    setEditData(element);
    handleShow();
  };
  if (categoryError) {
    return <div>Error: {categoryError}</div>;
  }
  if (!categoryData) {
    return (
      <h1 className="text-center">
        {/* <Spinner animation="border" variant="dark" /> */}
      </h1>
    );
  }
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
        dispatch(deleteCategory(_id));
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  }
  function hndlChnage(e) {
    navigate(`/category/${e.target.value}`);
    setdata(e.target.value);
    setSearch({
      query: e.target.value,
    });
  }
  const filteredData = categoryData.filter((res) => {
    const query = search.get("query");
    if (!query) {
      console.log("not");
    } else if (res.name.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    return false;
  });

  return (
    <>
      <div className="Search_form mb-5">
        <section className="row ms-3 mt-2">
          <div className="col col-6 col-lg-6 col-xxl-4 ">
            <h3 className="heading">Category</h3>
            <p>modifay your category</p>
          </div>
          <div className="col-6 col-lg-5 col-xxl-5 mt-4">
            <input
              type="text"
              value={data || ""}
              size="40"
              className="border p-2 search shadow-05"
              placeholder=" &#128270;"
              onChange={hndlChnage}
            />
          </div>
        </section>
        <div className="text-end">
          <AddCategory
            featchCategory={featchCategory}
            editData={editData}
            show={show}
            setEditData={setEditData}
            handleClose={handleClose}
            handleShow={handleShow}
            categoryData={categoryData}
          />
        </div>
        <div className="table_ mt-3 ms-4 me-4 ">
          <table cellPadding="20px" align="center">
            <thead>
              <tr className="heading">
                <td className="table_td">Name</td>
                <td className="table_td">createdAt</td>
                <td className="table_td">updatedAt</td>
                <td className="table_td">update</td>
                <td className="table_td">delete</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0
                ? filteredData.map((element, index) => {
                    return (
                      <tr key={index}>
                        <td>{element.name}</td>
                        <td className="text-secondary ms-5">
                          {element.createdAt}
                        </td>
                        <td>{element.updatedAt}</td>
                        <td>
                          <button onClick={() => handleUpdate(element)}>
                            <BsFillPenFill />
                          </button>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(element._id)}>
                            <AiFillDelete />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : categoryData.map((element, index) => {
                    return (
                      <tr key={index}>
                        <td>{element.name}</td>
                        <td className="text-secondary ms-5">
                          {element.createdAt}
                        </td>
                        <td>{element.updatedAt}</td>
                        <td>
                          <button
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
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default SelectCategory;
