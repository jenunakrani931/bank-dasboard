import Tableform from "../Components/Transfer-to-user/Tableform";
import Header from "../Components/Header";
export default function Product() {
  const nameT = "product";
  const titleT = "product acoount";
  return (
    <>
      <div>
        <div className="row bg-gary">
          <Header nameT={nameT} titleT={titleT} />
          <div className="col col-lg-12 col-md-12 col-xl-12">
            <Tableform />
          </div>
        </div>
      </div>
    </>
  );
}
