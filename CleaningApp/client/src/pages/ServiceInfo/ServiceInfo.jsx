import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Rating, Button, Snackbar, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

import "./ServiceInfo.css";
import info_img from "../../assets/img/service_info.png";
import { deleteService, getService } from "../../http/serviceApi";
import { Context } from "../..";
import { SERVICES_ROUTE } from "../../utils/constants";
import UpdateService from "../../components/Modals/UpdateService";

const ServiceInfo = observer(() => {
  const [service, setService] = useState();
  const { id } = useParams();
  const { user } = useContext(Context);
  const [open, setOpen] = useState();
  const [message, setMessage] = useState();
  const navigation = useNavigate();
  const [updateVisible, setUpdateVisible] = useState(false);
  const [createdAt, setCreatedAt] = useState();
  const [updatedAt, setUpdatedAt] = useState();
  const [tCreatedAt, setTCreatedAt] = useState();
  const [tUpdatedAt, setTUpdatedAt] = useState();

  useEffect(() => {
    getService(id).then((service) => {
      setService(service);
      setCreatedAt(new Date(service.createdAt));
      setUpdatedAt(new Date(service.updatedAt));
      let time1 = new Date(service.createdAt).getTime();
      let time2 = time1 - (new Date()).getTimezoneOffset() * 60 * 1000;
      setTCreatedAt(new Date(time2));
      time1 = new Date(service.updatedAt).getTime();
      time2 = time1 - (new Date()).getTimezoneOffset() * 60 * 1000;
      setTUpdatedAt(new Date(time2));
    });
  }, [id]);

  const deleteHandle = async () => {
    try {
      await deleteService(id);
      navigation(SERVICES_ROUTE);
    } catch (err) {
      setOpen(true);
      setMessage(err.response.data.message);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  let ratingAvailable = true;
  return service ? (
    <div className='container serviceinfo-container'>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          elevation={6}
          variant='filled'
          onClose={handleClose}
          severity='error'
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <img src={info_img} alt='service_img' />
      <div className='service_info'>
        <h2>{service.title}</h2>
        <Rating size='large' readOnly={ratingAvailable} value='5'></Rating>
        <p className='service-info_price'>{service.price} руб.</p>
        <p className='service-info_description'>{service.description}</p>
        <div className='utc-time'>
          UTC
          <p className='utc-time-create'>Создано: {createdAt.toUTCString()}</p>
          <p className='utc-time-update'>
            Обнавлено: {updatedAt.toUTCString()}
          </p>
        </div>
        <div className='timezone-time'>
          Таймзона
          <p className='timezone-time-create'>
            Создано: {tCreatedAt.toUTCString()}
          </p>
          <p className='timezone-time-update'>
            Обнавлено: {tUpdatedAt.toUTCString()}
          </p>
        </div>
        {user.user.role === "ADMIN" && (
          <div className='service-actions'>
            <Button variant='contained' color='error' onClick={deleteHandle}>
              <DeleteIcon sx={{ fontSize: "2.5rem" }} />
            </Button>
            <Button
              variant='contained'
              color='info'
              onClick={() => setUpdateVisible(true)}
            >
              <EditIcon sx={{ fontSize: "2.5rem" }} />
            </Button>
          </div>
        )}
      </div>
      <UpdateService
        show={updateVisible}
        onHide={() => setUpdateVisible(false)}
        service={service}
        update={(service) => setService(service)}
      />
    </div>
  ) : null;
});

export default ServiceInfo;
