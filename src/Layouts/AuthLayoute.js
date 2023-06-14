import {
  BsFillArrowLeftCircleFill,
  BsArrowRightCircleFill,
} from "react-icons/bs";
import {Outlet } from "react-router-dom";

export default function AuthLayoute({ meta }) {
  return (
    <>
      {/* {
  !token ?  */}
      <div className="container-fluid">
        <div className="row form-bg-clr">
          <div className=" col-lg-7 col-md-12 ">
            <Outlet />
          </div>
          <div className=" col-lg-5 col-md-12 aed_bg-clr ">
            <div className=" mt-5">
              <h1 className="text-white ms-5 line-height_aed">
                Getting Easier Pay for Any Transfer
                <p className="text-warning">with IbankCare</p>
              </h1>

              <p className="text-white ms-5 install_  mt-4">
                Install Ibankcare application right now!
              </p>
              <div className="d-flex">
                <img
                  className="btn w-25 ms-5 "
                  src={require("../Assets/images/image(1).png")}
                  alt="playstore_image"
                />
                <img
                  className="btn w-25 ms-2 "
                  src={require("../Assets/images/image(2).png")}
                  alt="playstore_image"
                />
              </div>
              <div>
                <p className="text-white btn ms-5 mt-3">
                  <BsFillArrowLeftCircleFill />
                </p>
                <p className="text-white btn mt-3">
                  <BsArrowRightCircleFill className="text-secondary" />
                </p>
              </div>
              <div>
                <img
                  className="phone_img"
                  src={require("../Assets/images/image_wlogo.png")}
                  alt="phone"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* : Navigate('/product') } */}
    </>
  );
}
