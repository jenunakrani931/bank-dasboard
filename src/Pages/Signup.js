import React from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import { signUpUser } from "../store/actions/authAction";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name Required"),
  email: Yup.string().required("Email Required "),
  password: Yup.string()
    .required("password Required ")
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirmpassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], 'Must match "password" field value'),
});
export default function SignUpPage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    dispatch(signUpUser(values));
    console.log(user);
    navigate("/");
  };
  return (
    <div className="container-fluid">
      <div>
        <div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              // bod: "",
              // phonenumber: "",
              // province: "",
              // city: "",
              // address: "",
              password: "",
              confirmpassword: "",
            }}
            enableReinitialize
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              handleChange,
              handleBlur,
              values,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} id="form" className="row">
                <h1 className="mb-4 mx-auto col-10 col-md-9 col-lg-8 mt-5 heading ">
                  Get started
                </h1>
                <div className="mx-auto col-10 col-md-9 col-lg-8">
                  <label htmlFor="name" className="mb-2">
                    name
                  </label>
                  <div>
                    <input
                      name="name"
                      type="name"
                      placeholder="name "
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }  input_ `}
                    />
                    {errors.name && touched.name && (
                      <p id="error-=message" className="text-danger">
                        {errors.name}
                      </p>
                    )}
                  </div>
                </div>
                <br />
                <div className="mx-auto col-10 col-md-9 col-lg-8">
                  <label htmlFor="email" className="mt-4">
                    Email Address
                  </label>
                  <div>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email or Address"
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
                <br />
                {/* <div className="mx-auto col-10 col-md-5 col-lg-5 mt-3">
                  <label htmlFor="bod">Birth Date</label>
                  <div>
                    <input
                      name="bod"
                      type="Date"
                      onBlur={handleBlur}
                      value={values.bod}
                      onChange={handleChange}
                      className={`form-control ${errors.bod} input_`}
                    />
                    {errors.bod && touched.bod && (
                      <p id="error-=message" className="text-danger">
                        {errors.bod}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mx-auto col-10 col-md-5 col-lg-5 mt-3">
                  <label htmlFor="phonenumber">Phone Number</label>
                  <div>
                    <input
                      name="phonenumber"
                      type="number"
                      placeholder="phone number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phonenumber}
                      className={`form-control ${errors.phonenumber} input_`}
                    />
                    {errors.phonenumber && touched.phonenumber && (
                      <p id="error-=message" className="text-danger">
                        {errors.phonenumber}
                      </p>
                    )}
                  </div>
                </div>
                <div className=" mx-auto col-10 col-md-5 col-lg-5 mt-3">
                  <label htmlFor="province">Province</label>
                  <div>
                    <input
                      name="province"
                      type="text"
                      onBlur={handleBlur}
                      value={values.province}
                      placeholder="province"
                      onChange={handleChange}
                      className={`form-control ${errors.province} input_`}
                    />
                    {errors.province && touched.province && (
                      <p id="error-=message" className="text-danger">
                        {errors.province}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mx-auto col-10 col-md-5 col-lg-5 mt-3">
                  <label htmlFor="city">City</label>
                  <div>
                    <input
                      name="city"
                      type="text"
                      placeholder="city"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.city}
                      className={`form-control ${errors.city} input_`}
                    />
                    {errors.city && touched.city && (
                      <p id="error-=message" className="text-danger">
                        {errors.city}
                      </p>
                    )}
                  </div>
                  <br />
                </div>
                <div className="mx-auto col-10 col-md-11 col-lg-11 ">
                  <label htmlFor="address" className="mb-2">
                    Province
                  </label>
                  <div>
                    <textarea
                      name="address"
                      type="text"
                      placeholder="address "
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address}
                      className={`form-control ${
                        errors.address ? "is-invalid" : ""
                      } input_`}
                    />
                    {errors.address && touched.address && (
                      <p id="error-=message" className="text-danger">
                        {errors.address}
                      </p>
                    )}
                  </div>
                  <br />
                </div> */}
                <div className="mx-auto col-10 col-md-9 col-lg-8 mt-4">
                  <label htmlFor="Password">Password</label>
                  <div>
                    <Input.Password
                      name="password"
                      type="password"
                      placeholder="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      className="input_"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                    {errors.password && touched.password && (
                      <p id="error-=message" className="text-danger">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mx-auto col-10 col-md-9 col-lg-8 mt-4">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div>
                    <Input.Password
                      name="confirmpassword"
                      type="confirmpassword"
                      placeholder="confirmPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="input_"
                      value={values.confirmpassword}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                    {errors.confirmpassword && touched.confirmpassword && (
                      <p id="error-=message" className="text-danger">
                        {errors.confirmpassword}
                      </p>
                    )}
                  </div>
                </div>
                <br />

                <button
                  type="submit"
                  className="mx-auto col-10 col-md-9 col-lg-8  mt-5 p-3  bg-warning text-light btn  border-0 rounded "
                >
                  Sign Up
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <Link to="/" className="Link d-flex  mt-4 justify-content-center">
        <p>Back to</p>
        <h5 className="text-warning ms-3 ">Login</h5>
      </Link>
    </div>
  );
}
