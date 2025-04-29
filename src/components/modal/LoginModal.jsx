import React from "react";
import Modal from "react-bootstrap/Modal";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { Button } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { googleAuth } from "../../features/UserAxios.js";

const LoginModal = ({ show, onHide }) => {
  const responseGoogle = async (authResult) => {
    try {
      if (authResult?.code) {
        const {message,...rest} = await googleAuth(authResult.code)
        localStorage.setItem('user',JSON.stringify(rest))
      }
    } catch (error) {
      console.error("Error while req google code", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-center"
    >
      <Modal.Title className="text-end">
        <IoClose className="mx-3" onClick={onHide} />
      </Modal.Title>
      <Modal.Body className="p-5">
        <h4 className="text-center">Hi there!</h4>
        <p>
          You can Easy <strong>signup</strong> and <strong>Signin</strong>
        </p>
        <Button onClick={googleLogin}>
          Continue with Google <FcGoogle />
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <p>
          By continuing you are agreeing to our <a href="">Terms of Use</a> and{" "}
          <a href="">Privacy Policy</a>
        </p>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
