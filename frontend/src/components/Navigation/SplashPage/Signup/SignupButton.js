import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import SignupForm from "./SignupForm";
import "./Signup.scss";

export const SignupButton = ({ context }) => {
  const [showModal, setShowModal] = useState(false);
  const signupButtonClass = `signup-button signup-${context}`;

  return (
    <>
      <button className={signupButtonClass} onClick={() => setShowModal(true)}>
        Create account
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
};
