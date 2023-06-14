import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { fetchCategory } from "../../store/actions/categoryAction";
import {
  createProduct,
  updatePRODUCT,
} from "../../store/actions/productAction";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name Required"),
  category: Yup.string().required("required category"),
  description: Yup.string().required("Description Required"),
  color: Yup.string().required("Color Required"),
  price: Yup.number().required("Please enter price"),
  quantity: Yup.number().required("Please enter quantity"),
});
const AddProduct = ({
  editData,
  setEditData,
  show,
  handleClose,
  handleShow,
  setIsAdding,
  fetchDataWithParams,
}) => {
  const dispatch = useDispatch();
  const { categoryData } = useSelector((state) => ({
    categoryData: state.category.categoryData,
    categoryError: state.category.categoryError,
  }));

  useEffect(() => {
    // if the value of show is greater than the existing categoryData,
    if (show > categoryData) {
      dispatch(fetchCategory());
    }
  }, [show, dispatch]);

  const handleSubmit = async (values) => {
    setIsAdding(true);
    if (editData?._id) {
      try {
        const category = categoryData.find(
          (element) => element.name === values.category
        );
        if (category) {
          const newProduct = {
            ...values,
            category: category._id,
          };
          console.log(newProduct);
          await dispatch(updatePRODUCT(newProduct));
        }
      } catch (error) {
        console.log(error);
      }
      setEditData({});
      fetchDataWithParams();
      handleClose();
    } else {
      try {
        const category = categoryData.find(
          (element) => element.name === values.category
        );
        if (category) {
          const newProduct = {
            ...values,
            category: category._id,
          };
          await dispatch(createProduct(newProduct));
          fetchDataWithParams();
          setIsAdding(false);
        } else {
          console.log("Category not found");
        }
      } catch (error) {
        console.log(error);
      }
    }
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: editData?._id
        ? `Product edited successfully`
        : `Product added successfully`,
      showConfirmButton: false,
      timer: 2000,
    });
    handleClose();
  };
  return (
    <>
      <Button variant="warning" onClick={handleShow} className="me-4">
        Add Data
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="boder-white">
          <Modal.Title>
            <h2 className="heading">
              {editData?._id ? "Edit product" : "Add product"}
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="boder-white">
          <Formik
            initialValues={{
              id: editData?._id ? editData?._id : null,
              name: editData?.name ? editData?.name : "",
              category: editData?.category?.name
                ? editData?.category?.name
                : "",
              description: editData?.description ? editData.description : "",
              color: editData?.color ? editData?.color : "",
              price: editData?.price ? editData?.price : "",
              quantity: editData?.quantity ? editData?.quantity : "",
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
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  className="p-2 border mt-2 mb-2"
                  onBlur={handleBlur}
                  style={{ display: "block" }}
                >
                  <option value="" label="Select a category">
                    Select a category
                  </option>
                  {categoryData &&
                    categoryData.map((element, index) => {
                      return (
                        <option
                          key={index}
                          value={element.id}
                          defaultValue={
                            editData?.category?.name === element.name
                          }
                        >
                          {element.name}
                        </option>
                      );
                    })}
                </select>
                {errors.category && touched.category && (
                  <p className="text-danger">{errors.category}</p>
                )}
                <label
                  htmlFor="description"
                  className="mt-3 text-secondary mb-2"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={values.description}
                  placeholder="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                />
                {errors.description && touched.description && (
                  <p className="text-danger">{errors.description}</p>
                )}
                <br />
                <label htmlFor="color" className="text-secondary mb-2">
                  Color
                </label>
                <input
                  name="color"
                  id="color"
                  value={values.color}
                  onBlur={handleBlur}
                  placeholder="Color"
                  onChange={handleChange}
                  className={`form-control p-2 ${
                    errors.color ? "is-invalid" : ""
                  }`}
                />
                {errors.color && touched.color && (
                  <p className="text-danger">{errors.color}</p>
                )}
                <br />
                <label htmlFor="price" className="mt-3 text-secondary mb-2">
                  Price
                </label>
                <input
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price"
                  value={values.price}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`form-control p-2 ${
                    errors.price ? "is-invalid" : ""
                  }`}
                />
                {errors.price && touched.price && (
                  <p className="text-danger">{errors.price}</p>
                )}
                <br />
                <label htmlFor="quantity" className="mt-3 text-secondary mb-2">
                  Quantity
                </label>
                <input
                  name="quantity"
                  id="quantity"
                  type="number"
                  value={values.quantity}
                  onBlur={handleBlur}
                  placeholder="Quantity"
                  onChange={(e) => handleChange(e)}
                  className={`form-control p-2 ${
                    errors.quantity ? "is-invalid" : ""
                  }`}
                />
                {errors.quantity && touched.quantity && (
                  <p className="text-danger">{errors.quantity}</p>
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
                    {editData._id ? `Edit Data` : `Add Data`}
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
export default AddProduct;
