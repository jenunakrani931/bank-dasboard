import { useParams,useNavigate } from "react-router-dom";
import Header from "../Components/Header";
export default function ManageUsers() {
  const nameM =  "Manage Users";
  const titleM = "Manage and organize your users";

  const navigate = useNavigate();
  const { val } = useParams();

  function hndlVal(e) {
    navigate(`/manage-users/${e.target.value}`);
  }
  return (
    <div className="row bg-gary">
      <Header nameM={nameM} titleM={titleM} />
      <div className="col col-lg-6 col-sm-12 ">
        <div>mange user</div>
      </div>
      <div className="col col-lg-6 col-sm-12 ">
      <input value={val} onChange={hndlVal} className="p-2"/>
      </div>
    </div>
  );
}
