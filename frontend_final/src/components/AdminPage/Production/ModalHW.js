import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalHW = (props) => {
  const [show, setShow] = useState(props.show);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        className="modal-user"
        onHide={props.onHide}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="title">Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="create-form">
            <div className="row mb-4">
              <div className="col">
                <div className="form-outline">
                  <input
                    type="text"
                    id="form6Example1"
                    className="form-control"
                  />
                  <label className="form-label" for="form6Example1">
                    Product Name
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-outline">
                  <select className="select w-100">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">Five</option>
                    <option value="6">Six</option>
                    <option value="7">Seven</option>
                    <option value="8">Eight</option>
                  </select>
                  <label className="form-label" for="inlineFormSelectPref">
                    Category
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className=""
            variant="primary"
            onClick={(e) => handleCreateFood(e)}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalHW;
