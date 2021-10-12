import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import "../../styles/plant-identify.css";

function PIDetailsModal({ name, desc, synonyms, taxonomy, authority, common_names }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="bg-col-primary pi-modal-btn" onClick={handleShow}>
        Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
                  <Modal.Title className="pi-mt">{name}</Modal.Title>
                  {authority}
        </Modal.Header>
        <Modal.Body className="pi-mb">
          <h5>Common Names</h5>
                  {common_names?.map(cn => (
                      <div key={cn} className="pi-mb-cn">{cn}</div>
                  ))}
        </Modal.Body>
    
        <Modal.Body className="pi-mb" >
          <h5>Description</h5>
          <div className="pi-mb-desc">{desc}</div>
        </Modal.Body>
        <Modal.Body className="pi-mb">
          <h5>Taxonomy</h5>
                  <div className="pi-mb-tax">
                      <div><span>Kingdom: </span>{taxonomy.kingdom}</div>
                      <div><span>Phylum: </span>{taxonomy.phylum}</div>
                      <div><span>Class: </span>{taxonomy.class}</div>
                      <div><span>Order: </span>{taxonomy.order}</div>
                      <div><span>Family: </span>{taxonomy.family}</div>
                      <div><span>Genus: </span>{taxonomy.genus}</div>
                  </div>
        </Modal.Body>
        
        <Modal.Body className="pi-mb">
          <h5>Synonyms</h5>
                  {synonyms?.map(syn => (
                      <div className="pi-mb-syn" key={syn}>{syn}</div>
                  ))}
        </Modal.Body>
        
        <Modal.Footer>        
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default PIDetailsModal
