import Header from "../Components/Header";

export default function Inbox() {
  const nameI = "Manage Bank Account";
  const titleI = "Manage Your Bank Account";
  return (
    <>
      <div className="row bg-gary">
        <Header nameI={nameI} titleI={titleI} />
        <div className="col col-lg-6 col-sm-12 ">
          <div className="header_user">inbox</div>
        </div>
        <div className="col col-lg-6 col-5 col-sm-12 "></div>
      </div>
    </>
  );
}
