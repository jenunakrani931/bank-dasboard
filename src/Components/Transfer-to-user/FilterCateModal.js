import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../store/actions/categoryAction";
import { fetchData, setCategoryQuery } from "../../store/actions/productAction";
import { useNavigate, useSearchParams } from "react-router-dom";

function FilterCateModal({ setAllData, itemsPerPage, fetchDataWithParams }) {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { categoryData } = useSelector((state) => ({
    categoryData: state.category.categoryData,
  }));

  const currentPage = 1;
  useEffect(() => {
    if (show) {
      dispatch(fetchCategory());
    }
  }, [dispatch, show, category]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCategorySearch = async (e) => {
    const categoryId = e.target.value;
    searchParams.set("category", categoryId);
    navigate(`?${searchParams.toString()}`);
    dispatch(setCategoryQuery(categoryId));
    const response = await dispatch(
      fetchData(currentPage, itemsPerPage, categoryId)
    );
    setAllData(response.totalDocs);
    setCategory(categoryId);
    handleClose();
  };

  return (  
    <>
      <Button variant="warning" onClick={handleShow} className="me-3">
        Sort by Category
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="heading">Filter Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {categoryData &&
              categoryData.map((element) => (
                <div key={element._id}>
                  <label
                    htmlFor={element._id}
                    className={`col-6 fs-5 pt-3 ${
                      category === element._id ? "text-dark" : "text-secondary"
                    }`}
                  >
                    {element.name}
                  </label>
                  <input
                    type="radio"
                    id={element._id}
                    name="category"
                    value={element._id}
                    checked={category === element._id}
                    onChange={handleCategorySearch}
                    className="col-6 fs-5 pt-3"
                  />
                </div>
              ))}
            <div>
              <label htmlFor="all" className="col-6 fs-5 pt-3 text-secondary">
                All
              </label>
              <input
                type="radio"
                id="all"
                name="category"
                value=""
                checked={!category}
                onChange={handleCategorySearch}
                className="col-6"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default FilterCateModal;
