import { useDispatch } from "react-redux";
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { createauthor, updateauthor } from "../../store/actions/authorAction";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name Required"),
  birthDate: Yup.string().required("birthDate category"),
  country: Yup.string().required("country Required"),
});
const AddAuthor = ({
  editData,
  setEditData,
  show,
  handleClose,
  handleShow,
  setIsAdding,
}) => {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    setIsAdding(true);
    if (editData?._id) {
      
      await dispatch(updateauthor(values));
      setEditData({});
      handleClose();
    } else {
      await dispatch(createauthor(values));
    }
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: editData?._id
        ? `author edited successfully`
        : `author added successfully`,
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
              {editData?._id ? "Edit author" : "Add author"}
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="boder-white">
          <Formik
            initialValues={{
              id: editData?._id ? editData?._id : null,
              name: editData?.name ? editData?.name : "",
              birthDate: editData?.birthDate ? editData?.birthDate : "",
              country: editData?.country ? editData?.country : "",
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
                <select
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  className="p-2 border mt-2 mb-2"
                  onBlur={handleBlur}
                  style={{ display: "block" }}
                >
                  <option value="" label="Select a country">
                    Select a country
                  </option>
                  <option value="India">India</option>
                  <option value="U.K">U.K</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="France">France</option>
                  <option value="U.S">U.S</option>
                </select>
                {errors.country && touched.country && (
                  <p className="text-danger">{errors.country}</p>
                )}
                <label
                  htmlFor="birthDate"
                  className="mt-3 text-secondary mb-2"
                >
                  birthDate
                </label>
                <input type="date"
                  name="birthDate"
                  id="birthDate"
                  value={values.birthDate}
                  placeholder="birthDate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.birthDate ? "is-invalid" : ""
                  }`}
                />
                {errors.birthDate && touched.birthDate && (
                  <p className="text-danger">{errors.birthDate}</p>
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
                    {editData._id ? `Edit Author` : `Add Author`}
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
export default AddAuthor;
