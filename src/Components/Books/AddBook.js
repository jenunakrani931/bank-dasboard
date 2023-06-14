import { useDispatch } from "react-redux";
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { createBook, updateBook } from "../../store/actions/bookAction";

const SignupSchema = Yup.object().shape({
  author_id: Yup.string().required("author id is important if you add book"),
  name: Yup.string().required("book Name Required"),
  launch_date: Yup.string().required("required Launch date"),
  genre: Yup.string().required("genre Required"),
  number_of_sales: Yup.number().required("number of sales Required"),
  description: Yup.string().required("description Required"),
});
const Addbook = ({
  editData,
  setEditData,
  show,
  handleClose,
  handleShow,
  setIsAdding,
  fetchDataParams
}) => {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    setIsAdding(true);
    if (editData?._id) {
      await dispatch(updateBook(values));
      setEditData({});
      fetchDataParams()
    } else {
      await dispatch(createBook(values));
      fetchDataParams()
    }
    Swal.fire({
      icon: "success",
      title: editData?._id
        ? `book edited successfully`
        : `book added successfully`,
      showConfirmButton: false,
      timer: 2000,
    });
    handleClose();
  };
  return (
    <>
      <Button variant="warning" onClick={handleShow} className="me-4 shadow-05">
        Add Data
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="boder-white">
          <Modal.Title>
            <h2 className="heading">
              {editData?._id ? "Edit book" : "Add book"}
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="boder-white">
          <Formik
            initialValues={{
              id: editData?._id ? editData?._id : "",
              author_id: editData?.author_id?._id
                ? editData?.author_id?._id
                : "",
              name: editData?.name ? editData?.name : "",
              launch_date: editData?.launch_date ? editData?.launch_date : "",
              genre: editData?.genre ? editData?.genre : "",
              number_of_sales: editData?.number_of_sales
                ? editData.number_of_sales
                : "",
              description: editData?.description ? editData.description : "",
            }}
            enableReinitialize
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              values,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <label htmlFor="author_id" className="text-secondary mb-2">
                  author_id
                </label>
                {editData?.author_id?._id ? (
                  <input
                    name="author_id"
                    id="author_id"
                    readOnly
                    value={values.author_id}
                    onBlur={handleBlur}
                    placeholder="author_id"
                    onChange={handleChange}
                    className={`form-control p-2 ${
                      errors.author_id ? "is-invalid" : ""
                    }`}
                  />
                ) : (
                  <input
                    name="author_id"
                    id="author_id"
                    value={values.author_id}
                    onBlur={handleBlur}
                    placeholder="author_id"
                    onChange={handleChange}
                    className={`form-control p-2 ${
                      errors.author_id ? "is-invalid" : ""
                    }`}
                  />
                )}

                {errors.author_id && touched.author_id && (
                  <p className="text-danger">{errors.author_id}</p>
                )}
                <br />
                <label htmlFor="name" className="text-secondary mb-2">
                  Name
                </label>
                <input
                  name="name"
                  id="name"
                  value={values.name}
                  onBlur={handleBlur}
                  placeholder="name"
                  onChange={handleChange}
                  className={`form-control p-2 ${
                    errors.name ? "is-invalid" : ""
                  }`}
                />
                {errors.name && touched.name && (
                  <p className="text-danger">{errors.name}</p>
                )}
                <br />
                <label
                  htmlFor="launch_date"
                  className="mt-3 text-secondary mb-2"
                >
                  Launch Date
                </label>
                <input
                style={{width:"170px"}}
                  type="date"
                  name="launch_date"
                  id="launch_date"
                  value={values.launch_date}
                  placeholder="launch_date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.launch_date ? "is-invalid" : ""
                  }`}
                />
                {errors.launch_date && touched.launch_date && (
                  <p className="text-danger">{errors.launch_date}</p>
                )}
                <br />
                <select
                  name="genre"
                  value={values.genre}
                  onChange={handleChange}
                  className="p-2 border mt-2 mb-2"
                  onBlur={handleBlur}
                  style={{ display: "block" }}
                >
                  <option value="" label="Select a genre">
                    Select a genre
                  </option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Crime and mystery">Crime and mystery</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Historical">Historical</option>
                  <option value="Horror">Horror</option>
                  <option value="Romance">Romance</option>
                  <option value="Satire">Satire</option>
                  <option value="Science fiction">Science fiction</option>
                  <option value="Thriller">Thriller</option>
                </select>
                {errors.genre && touched.genre && (
                  <p className="text-danger">{errors.genre}</p>
                )}
                <label htmlFor="number_of_sales" className="mt-4">number_of_sales</label>
                <input
                  name="number_of_sales"
                  type="number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.number_of_sales}
                  className={`form-control  ${errors.number_of_sales}`}
                />
                {errors.number_of_sales && touched.number_of_sales && (
                  <p id="error-=message" className="text-danger">
                    {errors.number_of_sales}
                  </p>
                )}
                <br />
                <label htmlFor="description">description</label>
                <textarea
                  name="description"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  className={`form-control ${errors.description}`}
                />
                {errors.description && touched.description && (
                  <p id="error-=message" className="text-danger">
                    {errors.description}
                  </p>
                )}
                <br />
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="col-6 border-0 p-2 bg-warning text-dark"
                  >
                    {editData._id ? `Edit Book` : `Add Book`}
                  </Button>
                </Modal.Footer>
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Addbook;
