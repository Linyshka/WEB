import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import { createService } from "../../http/serviceApi";

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

const CreateService = ({ show, onHide }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);

  const handleCreate = () => {
    console.log(11111);
    createService({title, description, price, typeId: 1});
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
        <form onSubmit={handleCreate}>
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

export default CreateService;
