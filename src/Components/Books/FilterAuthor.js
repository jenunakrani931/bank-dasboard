import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchauthor } from "../../store/actions/authorAction";

function FilterAuthor() {
  const [show, setShow] = useState(false);
  const [author, setauthor] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { data } = useSelector((state) => ({
    data: state.author.author,
  }));
  useEffect(() => {
    if (show) {
      dispatch(fetchauthor());
    }
  }, [dispatch, show, author]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleauthorSearch = async (e) => {
    const AuthorId = e.target.value;
    searchParams.set("author", AuthorId);
    navigate(`?${searchParams.toString()}`);
    setauthor(AuthorId);
    handleClose();
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow} className="me-3 shadow-05">
        search Author
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="heading">Filter Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {data &&
              data.map((element) => (
                <div key={element._id}>
                  <label
                    htmlFor={element._id}
                    className={`col-6 fs-5 pt-3 ${
                      author === element._id ? "text-dark" : "text-secondary"
                    }`}
                  >
                    {element.name}
                  </label>
                  <input
                    type="radio"
                    id={element._id}
                    name="author"
                    value={element._id}
                    checked={author === element._id}
                    onChange={handleauthorSearch}
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
                name="author"
                value=""
                checked={!author}
                onChange={handleauthorSearch}
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
export default FilterAuthor;
