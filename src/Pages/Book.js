import FatchBook from "../Components/Books/FatchBook";
import SelectBook from "../Components/Books/SelectBook";
import Header from "../Components/Header";

export default function Book() {
  const nameI = "Book Details";
  const titleI = "Manage Books";
  return (
    <>
      <div className="row bg-gary">
        <Header nameI={nameI} titleI={titleI} />
        <div className="col col-lg-6 col-sm-12 ">
          <div className="header_user"></div>
        </div>
        <div className="col col-lg-12 col-md-12 col-xl-12">
          <FatchBook />
        </div>
      </div>
    </>
  );
}
