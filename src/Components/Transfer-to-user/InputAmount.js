import { Formik } from "formik";
export default function InputAmount() {
  return (
    <>
      <div className="input_amount ms-3 me-5">
        <div className="mb-4">
          <h3 className="heading">Input Amount</h3>
          <p>Only selected users will be receive this balance</p>
        </div>
        <div>
          <Formik
            initialValues={{
              amount: "",
              checkedbtn: "false",
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
              <form onSubmit={handleSubmit} id="form">
                <label htmlFor="amount" className="mb-2 text-secondary">
                  Amount
                </label>
                <input
                  name="amount"
                  type="text"
                  placeholder="Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.amount}
                  className={`form-control ${
                    errors.amount ? "is-invalid" : ""
                  } padding`}
                />
                {errors.amount && touched.amount && (
                  <p id="error-=message" className="text-danger">
                    {errors.amount}
                  </p>
                )}
                <br/>
                <input
                  type="checkbox"
                  onChange={handleChange}
                />
                <label htmlFor="checkedbtn" className="ms-3 text-secondary mb-3"> Are you sure transfer to this users ?</label>
                {errors.checkedbtn && touched.checkedbtn && (
                  <p id="error-=message" className="text-danger">
                    {errors.checkedbtn}
                  </p>
                )}
                <button
                  type="submit"
                  className="col-12 bg-warning text-white padding border-0 rounded"
                >   
                  Transfer
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
