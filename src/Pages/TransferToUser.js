import { useState } from "react";
import Header from "../Components/Header";
import { useSearchParams, useNavigate } from "react-router-dom";
export default function TransferToUser() {
  const nameD = "Transfer to Users";
  const titleD = "Transfers balance to your users";

  const navigate = useNavigate();
  const [search, setsearch] = useSearchParams();
  const [data, setdata] = useState(search.get("query"));

    function hndlChnage(e) {
      navigate(`/transfer-to-user/${e.target.value}`);
      setdata(e.target.value);
      setsearch({
        query: e.target.value,
      });
    }
  return (
    <div className="row bg-gary">
      <Header nameD={nameD} titleD={titleD} />
      <div className="col col-lg-6 col-sm-12 ">
        <div>Transfer_to_user</div>
      </div>
      <div className="col col-lg-6 col-sm-12 ">
      <input value={data || ''} onChange={hndlChnage} className="p-2" placeholder="useSearchParams"/>
      </div>
    </div>
  );
}
