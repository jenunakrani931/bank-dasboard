import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import {
  createCategory,
  updateCategory,
} from "../../store/actions/categoryAction";
const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name Required"),
});
const AddCategory = ({
  editData,
  setEditData,
  show,
  handleClose,
  handleShow,
}) => {
  const { categoryData } = useSelector((state) => ({
    categoryData: state.category.categoryData,
  }));
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    Swal.fire({
      title: editData?._id
        ? `Edit Data: ${JSON.stringify(values.name)}`
        : `Add Data: ${JSON.stringify(values.name)}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: editData?._id
        ? `"Yes, Edit this!",`
        : `"Yes, Add it!",`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (editData?._id) {
          const isCategoryExisting = categoryData.some(
            (category) => category.name === values.name
          );
          if (isCategoryExisting) {
            alert("Category already exists.");
          } else {
            dispatch(updateCategory(values));
            setEditData({});
            handleClose();
          }
        } else {
          const isCategoryExisting = categoryData.some(
            (category) => category.name === values.name
          );
          if (isCategoryExisting) {
            alert("Category already exists.");
          } else {
            await dispatch(createCategory(values));
            handleClose();
          }
        }
        setTimeout(() => {
          handleClose();
        }, 2000);
        const isCategoryExisting = categoryData.some(
          (category) => category.name === values.name
        );
        if (!isCategoryExisting) {
          Swal.fire(
            editData?._id ? `Data Edit successfully` : `Data Added successfully`
          );
        }
      }
      console.log(categoryData);
      console.log(values.name);
    });
    handleClose();
  };
  return (
    <>
      <Button variant="warning" onClick={handleShow} className="shadow-05 me-4">
        Add Category
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className=" boder-white">
          <Modal.Title>
            <h2 className="heading">
              {editData?._id ? "Edit Category" : "Add Category"}
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=" boder-white">
          <Formik
            initialValues={{
              id: editData?._id ? editData?._id : null,
              name: editData?.name ? editData.name : "",
            }}
            enableReinitialize
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              values,
              handleBlur,
              handleSubmit,
              handleChange,
            }) => (
              <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="text-secondary">
                  Name
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  value={values.name}
                  placeholder=" Name of Category"
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e)}
                  className={`form-control p-2  ${
                    errors.name ? "is-invalid" : ""
                  }`}
                />
                {errors.name && touched.name && (
                  <p className="text-danger">{errors.name}</p>
                )}
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
                    className="bg-warning text-dark col-6 border-0 p-2"
                  >
                    {editData._id ? `Edit category data` : `Add category Data`}
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

export default AddCategory;
