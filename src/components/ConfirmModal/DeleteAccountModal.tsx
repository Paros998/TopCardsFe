import React, { FC, SetStateAction } from 'react';
import { Button, Container, Modal } from "react-bootstrap";

interface DeleteAccountModalProps {
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<SetStateAction<boolean>>;
  onDeleteSubmit: () => Promise<void>;
}

const DeleteAccountModal: FC<DeleteAccountModalProps> = ( { setShowDeleteModal, onDeleteSubmit, showDeleteModal } ) => {
  return (
    <Modal
      centered
      onHide={ () => setShowDeleteModal( false ) }
      show={ showDeleteModal }
      size='lg'
      contentClassName='rounded-0 border-1 border-light bg-dark  text-light'
    >
      <Modal.Header closeButton className={ `bg-dark text-light modal-close-light` }>

        <div className={ `d-flex justify-content-center w-100` }>
          <h3>
            Confirm account delete
          </h3>
        </div>

      </Modal.Header>
      <Modal.Body as={ Container } className='position-relative d-flex justify-content-center align-items-center'>

        <Button
          className={ `ms-3 w-30` }
          variant={ "outline-light" }
          onClick={ () => setShowDeleteModal( false ) }
        >
          Cancel
        </Button>

        <Button
          className={ `ms-3 w-30` }
          variant={ "outline-danger" }
          onClick={ onDeleteSubmit }
        >
          Confirm
        </Button>

      </Modal.Body>

    </Modal>
  );
};

export default DeleteAccountModal;