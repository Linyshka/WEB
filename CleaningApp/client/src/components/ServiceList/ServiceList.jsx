import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../..";
import ServiceItem from "./ServiceItem";

import './ServiceList.css';

const ServiceList = observer(() => {
  const { service } = useContext(Context);

  return (
    <div className='services'>
      {service.services.map((s) => (
        <ServiceItem key={s.id} service={s} />
      ))}
    </div>
  );
});

export default ServiceList;
