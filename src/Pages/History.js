import Header from "../Components/Header";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
export default function History() {
  const nameH = "Transfer Users to Users";
  const titleH =
    "see history a transfer from user to user and from admin to users";
  const navigate = useNavigate();
  const { state } = useLocation();
  const [Data, setData] = useState(state);
  function hndlChnage(e) {
    setData(e.target.value);
  }
  function newState(e) {
    e.preventDefault();
    navigate(`/history`, { state: Data });
  }
  return (
    <div className="row bg-gary">
      <Header nameH={nameH} titleH={titleH} />
      <div className="col col-lg-6 col-sm-12 ">
        <div className="header_user">History</div>
      </div>
      <div className="col col-lg-6 col-5 col-sm-12 ">
        <form onSubmit={newState}>
          <input
            value={Data}
            onChange={hndlChnage}
            className="p-2 border-0"
          />
          <button className="p-2 btn rounded-0 bg-warning ">Change State</button>
        </form>
      </div>
    </div>
  );
}
