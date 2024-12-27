import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import { LoginForm } from "./LoginForm";
import "./Login.css";

export const LoginButton = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="login-box">
      <button className="logInBtn" onClick={() => setShowModal(true)}>
        Sign in
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </div>
  );
};
