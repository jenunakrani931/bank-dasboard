import "../../Assets/css/Login.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPenFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { deleteauthor, fetchauthor } from "../../store/actions/authorAction";
import AddAuthor from "./AddAuthor";
import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router-dom";

const FatchAuthore = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => ({
    data: state.author.author,
    error: state.author.error,
  }));
  const [show, setShow] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useSearchParams();
  const [datas, setdata] = useState(search.get("search"));
  const navigate = useNavigate();
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setEditData({});
  };

  useEffect(() => {
    dispatch(fetchauthor());
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
        dispatch(deleteauthor(_id));
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
        dispatch(fetchauthor());
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
  function hndlChnage(e) {
    navigate(`/category/${e.target.value}`);
    setdata(e.target.value);
    setSearch({
      query: e.target.value,
    });
  }
  const filteredData = data.filter((res) => {
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
            <h3 className="heading">Transfer Users</h3>
            <p>Select one or more that you want to transfer</p>
          </div>
          <div className="col-6 col-lg-5 col-xxl-5 mt-4">
            <input
              type="text"
              value={datas || ""}
              size="40"
              className="border p-2 search shadow-05"
              placeholder=" &#128270;"
              onChange={hndlChnage}
            />
          </div>
        </section>
        <div className="text-end">
          <AddAuthor
            editData={editData}
            data={datas}
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
                <td className="table_td">Id</td>
                <td className="table_td">Name</td>
                <td className="table_td">birthDate</td>
                <td className="table_td">country</td>
                <td className="table_td">Update</td>
                <td className="table_td">Delete</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0
                ? filteredData.map((element, index) => (
                    <tr key={index}>
                      <td>{element._id}</td>
                      <td>{element.name}</td>
                      <td className="text-secondary ms-5">
                        {element.birthDate}
                      </td>
                      <td className="text-secondary ms-5">{element.country}</td>
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
                  ))
                : data.map((element, index) => (
                    <tr key={index}>
                      <td className="text-secondary ">{element._id}</td>
                      <td >{element.name}</td>
                      <td className="text-secondary ">{element.birthDate}</td>
                      <td >{element.country}</td>
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
                          className="btn border text-secondary "
                        >
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

export default FatchAuthore;
