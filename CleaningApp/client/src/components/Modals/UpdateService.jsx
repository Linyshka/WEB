import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import { updateService } from "../../http/serviceApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdateService = ({ show, onHide, service, update }) => {
  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description);
  const [price, setPrice] = useState(service.price);

  const handleUpdate = () => {

    updateService(service.id, title, description, price, service.typeId).then((data) => update(data));
    onHide();
  };

  return (
    <Modal
      open={show}
      onClose={onHide}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <form onSubmit={handleUpdate}>
          <p>
            <label>Сервис:</label>
            <br />
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </p>
          <p>
            <label>Описание:</label>
            <br />
            <textarea
              value={description}
              rows={10}
              cols={45}
              onChange={(e) => setDescription(e.target.value)}
            />
          </p>
          <p>
            <label>Цена:</label>
            <br />
            <input
              type='number'
              min={1}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </p>
          <input type='submit' value='Обновить' />
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateService;
