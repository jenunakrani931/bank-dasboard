import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchProfile } from "../store/actions/authAction";

export default function MainLayout() {
  const { data } = useSelector((state) => ({data: state.auth.data}));
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    if (data?.name && data?.email) {
      setIsLoading(false);
    }
  }, [data]);
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <div className="row">
            <div className="col col-2 col-lg-2 col-md-3">
              <Sidebar />
            </div>
            <div className="col col-10">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
