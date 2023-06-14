import { BsXCircleFill } from "react-icons/bs";
export default function SelectUser() {
  return (
    <>
      <div className="select_user ms-3 me-5">
        <div className="mb-5">
            <h3 className="heading">Selected Users</h3>
            <p>Here is a list username of selected users</p>
        </div>
        <div className="table__ d-flex flex-wrap">
            <button className="border-dark btn">Kamadou Tanjiro  </button>
            <button className="border-dark btn ms-5">Robi Gojo Satorou </button>
            <button className="border-dark btn bg-warning cros">Nico Robin</button><p><BsXCircleFill  className="cros_ "/></p>
            <button className="border-dark btn ms-2">Usop Regen </button>
            <button className="border-dark btn ms-3">Luffy99</button>
        </div>
      </div>
    </>
  );
}
