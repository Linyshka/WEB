import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Filters from "../../components/Filters";

import "./Services.css";
import ServiceList from "../../components/ServiceList";
import { Context } from "../..";
import { getServices } from '../../http/serviceApi';
import Pages from '../../components/Pages';

const Services = observer(() => {
  const { service } = useContext(Context);

  useEffect(() => {
    getServices(service.page, service.limit, service.query, service.sortItem, service.sortOrder).then((data) => {
        service.setServices(data.rows);
      service.setTotalService(data.count)});
  }, [service, service.page, service.query, service.priceAsc, service.priceDesc, service.nameAsc, service.nameDesc]);

  return (
    <div className='container services-container'>
      <Filters />
      <ServiceList />
      <Pages />
    </div>
  );
});

export default Services;
