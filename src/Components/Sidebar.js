import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GrHomeRounded, GrTransaction, GrLogout } from "react-icons/gr";
import { CiUser } from "react-icons/ci";
import { FaUserTie } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import { BiErrorCircle, BiCategoryAlt } from "react-icons/bi";
import { RiFileHistoryLine, RiMailOpenLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function Sidebar() {
  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  const navigate = useNavigate();

  const handleLogout = ()=>{
    navigate("/")
    localStorage.removeItem('token')
  }
  return (
    <>
      <div className="sidebar">
        <div>
          <img
            className="logo mt-5 ms-4 "
            src={require("../Assets/images/logo.png")}
            alt="playstore_image"
          />
          <div>
            <ul>
              <li>
                <h5 className="heading mt-5">General</h5>
              </li>
            </ul>
            <ul className="side_text">
              <li>
                <GrHomeRounded className="ms-3 me-3 text-secondary" />{" "}
                <Link
                  to="/product?page=1&limit=6&search=&category="
                  className={"a" + (url === "/product" ? " active " : "")}
                >
                  product
                </Link>
              </li>
              <li className="mt-4">
                <BiCategoryAlt className="ms-3 me-3 text-secondary" />{" "}
                <Link
                  to="/category"
                  className={"a" + (url === "/category" ? " active " : "")}
                >
                  Category
                </Link>
              </li>
              <li className="mt-4">
                <FaUserTie className="ms-3 me-3 text-secondary" />{" "}
                <Link
                  to="/author"
                  className={"a" + (url === "/author" ? " active " : "")}
                >
                  Author
                </Link>
              </li>
              <li className="mt-4">
                <BsBook className="ms-3 me-3 text-secondary" />{" "}
                <Link
                  to="/book?page=1&limit=6&search=&author="
                  className={"a" + (url === "/book" ? " active " : "")}
                >
                  Book
                </Link>
              </li>
              <li className="mt-4">
                <CiUser className="ms-3 me-3 text-secondary" />{" "}
                <Link
                  to="/manage-users/change"
                  className={
                    "a" + (url === "/manage-users/change" ? " active" : "")
                  }
                >
                  ManageUsers
                </Link>
              </li>
              <li className="mt-4">
                <GrTransaction className="ms-3 me-3 text-secondary" />{" "}
                <Link
                  to="/transfer-to-user"
                  className={
                    "a" + (url === "/transfer-to-user" ? " active" : "")
                  }
                >
                  Transfer_to_user
                </Link>
              </li>
              <li className="mt-4">
                <p
                  onClick={() =>
                    navigate("/history", { state: "it's default value" })
                  }
                  className={"a" + (url === "/history" ? " active" : "")}
                >
                  <RiFileHistoryLine className="ms-3 me-3 text-secondary" />{" "}
                  History
                </p>
              </li>
              <li className="mt-4">
                <RiMailOpenLine className="ms-3 me-3 text-secondary" />{" "}
                <Link
                  to="/inbox"
                  className={"a" + (url === "/inbox" ? " active" : "")}
                >
                  Inbox
                </Link>
              </li>
            </ul>
            <hr className="w-75  ms-3" />
            <ul>
              <li>
                <h5 className="heading mt-3">Other</h5>
              </li>
            </ul>
            <ul>
              <li className="mt-3">
                <BiErrorCircle className="ms-3 me-3 text-secondary" />{" "}
                <Link
                  to="/product"
                  className={"a" + (url === "/product" ? " active" : "")}
                >
                  Help & Support
                </Link>
              </li>
            </ul>
            <div className="ms-5 logout d-flex">
              
              <button className="ms-3 text-secondary btn" onClick={handleLogout}> <GrLogout className="me-3"/> Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
