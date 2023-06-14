import { Formik } from "formik";
import { Link } from "react-router-dom";
import "../Assets/css/Login.css";
export default function ForgotPasswordPage() {
  return (
    <div className="container">
      <div className="row">
        <div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            enableReinitialize
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({
              errors,
              touched,
              handleChange,
              handleBlur,
              values,
              handleSubmit,
            }) => (
              <form
                onSubmit={handleSubmit}
                id="form"
                action="/product"
                className="row"
              >
                <div className=" mx-auto col-10 col-md-9 col-lg-8 ">
                  <h1 className="mb-5 heading margin-top">
                    Hi, You forgot your password?
                  </h1>
                  <label htmlFor="email" className="mb-2">
                    Email or username
                  </label>
                  <div>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email or username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }  input_`}
                    />
                    {errors.email && touched.email && (
                      <p id="error-=message" className="text-danger">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mx-auto col-10 col-md-9 col-lg-8  mt-3  bg-warning text-light btn  border-0 rounded">
                  <Link to="/product" className="text-light btn ">
                    Get Reset password link
                  </Link>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <Link to="/" className="Link d-flex  mt-4 justify-content-center">
          <p>Back to the</p>
          <h5 className="text-warning ms-3 ">Login</h5>
        </Link>
      </div>
    </div>
  );
}
