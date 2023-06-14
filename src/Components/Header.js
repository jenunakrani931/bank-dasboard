import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Overlay } from "react-bootstrap";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";

export default function Header(props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const { data } = useSelector((state) => state.auth);

  const handleOverlayToggle = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="header">
        <div className="d-flex justify-content-between mt-5">
          <div className="ms-5">
            <h3 className="heading">{props.nameD}</h3>
            <h3 className="heading">{props.nameI}</h3>
            <h3 className="heading">{props.nameC}</h3>
            <h3 className="heading">{props.nameM}</h3>
            <h3 className="heading">{props.nameT}</h3>
            <h3 className="heading">{props.nameH}</h3>
            <p className="text-secondary">{props.titleM}</p>
            <p className="text-secondary">{props.titleC}</p>
            <p className="text-secondary">{props.titleD}</p>
            <p className="text-secondary">{props.titleI}</p>
            <p className="text-secondary">{props.titleT}</p>
            <p className="text-secondary">{props.titleH}</p>
          </div>
          <div className="d-flex mt-3 me-5">
            <div className="p-4">
              <img
                className="notification"
                src={require("../Assets/images/notification.png")}
                alt="playstore_image"
              />
              <Button
                variant=""
                ref={target}
                onClick={handleOverlayToggle}
                className="rounded-circle"
              >
                <img
                  className="notification"
                  src={require("../Assets/images/person.png")}
                  alt="playstore_image"
                />
              </Button>
            </div>
            <Overlay target={target.current} show={show} placement="bottom">
              {({ placement, arrowProps, show: _show, popper, ...props }) => (
                <div
                  {...props}
                  style={{
                    position: "absolute",
                    width:"250px",
                    backgroundColor: "#034b5e",
                    padding: "5px 15px",
                    color: "white",
                    borderRadius: 3,
                    boxShadow:"5px 5px 20px #093845",
                    ...props.style,
                  }}  
                >
                  <div>
                    <h5>Profile</h5> <hr/>
                  </div>
                  <div>
                    <p>Name: {data.name}</p>
                    <p>Email: {data.email}</p>
                  </div>
                </div>
              )}
            </Overlay>
          </div>
        </div>
      </div>
    </>
  );
}
