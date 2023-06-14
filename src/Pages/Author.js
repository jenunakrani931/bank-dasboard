import FatchAuthore from "../Components/Author/FatchAuthor";
import Header from "../Components/Header";

export default function Author() {
  const nameI = "Author Details";
  const titleI = "Manage Author";
  return (
    <>
      <div className="row bg-gary">
        <Header nameI={nameI} titleI={titleI} />
        <div className="col col-lg-6 col-sm-12 ">
          <div className="header_user">Author</div>
        </div>
        <div className="col col-lg-12 col-md-12 col-xl-12">
          <FatchAuthore/>
        </div>
      </div>
    </>
  );
}
