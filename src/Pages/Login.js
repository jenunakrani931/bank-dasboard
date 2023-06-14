import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "../Assets/css/Login.css";
import { loginUser } from "../store/actions/authAction";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string().required("Email Required "),
  password: Yup.string()
    .required("password Required ")
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
});
export default function Login() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="container">
      <div className="row">
        <div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              dispatch(loginUser(values));
              token ? navigate("/product") : navigate("/");
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
                    Hi, Welcome Back Fellas!
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
                <div className="mt-3 mb-2 mx-auto col-10 col-md-9 col-lg-8   d-flex justify-content-between">
                  <label htmlFor="password">Password</label>
                  <Link to="/forgot-password" className="text-warning a">
                    Forgot Password?
                  </Link>
                </div>
                <div className="mx-auto col-10 col-md-9 col-lg-8 ">
                  <input
                    name="password"
                    type="password"
                    placeholder="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }  input_`}
                  />
                  {errors.password && touched.password && (
                    <p id="error-=message" className="text-danger">
                      {errors.password}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="mx-auto col-10 col-md-9 col-lg-8 p-3 mt-3  bg-warning text-light btn  border-0 rounded"
                >
                  Sign In
                </button>
              </form>
            )}
          </Formik>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <hr className="w-25 mt-5" />
          <h6 className=" ms-xxl-5  me-xxl-5 mt-5 Link ">Or sign in with</h6>
          <hr className="w-25 mt-5" />
        </div>
        <div className="mx-auto col-10 col-md-9 col-lg-8  mt-3  bg-light border text-secondary btn p-3 rounded">
          <div>Another Method</div>
        </div>
        <Link to="/signup" className="Link d-flex  mt-4 justify-content-center">
          <p>You dont Have an Account?</p>
          <h5 className="text-warning ms-3 ">Sign Up </h5>
        </Link>
      </div>
    </div>
  );
}
