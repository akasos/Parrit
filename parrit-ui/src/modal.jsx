import React from 'react'
import ReactDOM from 'react-dom'
import AddTeammate from "./components/addTeammate/AddTeammate";
const Modal = ({cancel}) => {
  return ReactDOM.createPortal(
      <AddTeammate cancel={cancel} />,
      document.querySelector("#modal")
  )
};

export default Modal;