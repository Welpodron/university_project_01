import React, { useState } from "react";
import Button from "react-bootstrap/Button";

// import Login from "../login/Login";

function Header() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <header className="container mb-4">
      <div className="">
        <Button
          type="button"
          variant="primary"
          onClick={() => setModalShow(true)}
        >
          Войти
        </Button>
        {/* <Login show={modalShow} /> */}
      </div>
    </header>
  );
}

export default Header;
