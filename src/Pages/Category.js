import SelectCategory from "../Components/Category/SelectCategory";
import Header from "../Components/Header";

export default function Category() {
  const nameC = "Category";
  const titleC = "List of all Category";

  return (
    <div className="row bg-gary">
      <Header nameM={nameC} titleM={titleC} />
      <div className="col col-lg-12 col-md-12 col-xl-12">
        <SelectCategory />
      </div>
    </div>
  );
}
