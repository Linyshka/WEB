import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import "./Filters.css";
import { Context } from "../..";

const Filters = observer(() => {
  const { service } = useContext(Context);

  const searchHandle = (e) => {
    service.setQuery(e.target.value);
  };

  return (
    <div className='filters'>
      <input
        className='search-input'
        type='text'
        placeholder='Поиск'
        onChange={(e) => searchHandle(e)}
      />
      <div className='radio-buttons'>
        <div className='radio-item'>
          <input
            type='radio'
            id='name1'
            value='name_asc'
            checked={service.nameAsc}
            onChange={(e) => {
              service.setNameAsc(true);
              service.setNameDesc(false);
              service.setPriceAsc(false);
              service.setPriceDesc(false);
              service.setSortItem("title");
              service.setSortOrder("asc")
            }}
          />
          <label for='name1'>По имени &uarr;</label>
        </div>

        <div className='radio-item'>
          <input
            type='radio'
            id='name2'
            value='name_desc'
            checked={service.nameDesc}
            onChange={(e) => {
              service.setNameAsc(false);
              service.setNameDesc(true);
              service.setPriceAsc(false);
              service.setPriceDesc(false);
              service.setSortItem("title");
              service.setSortOrder("desc")
            }}
          />
          <label for='name2'>По имени &darr;</label>
        </div>

        <div className='radio-item'>
          <input
            type='radio'
            id='price1'
            value='price_asc'
            checked={service.priceAsc}
            onChange={(e) => {
              service.setNameAsc(false);
              service.setNameDesc(false);
              service.setPriceAsc(true);
              service.setPriceDesc(false);
              service.setSortItem("price");
              service.setSortOrder("asc")
            }}
          />
          <label for='price1'>По цене &uarr;</label>
        </div>

        <div className='radio-item'>
          <input
            type='radio'
            id='price2'
            value='price_desc'
            checked={service.priceDesc}
            onChange={(e) => {
              service.setNameAsc(false);
              service.setNameDesc(false);
              service.setPriceAsc(false);
              service.setPriceDesc(true);
              service.setSortItem("price");
              service.setSortOrder("desc")
            }}
          />
          <label for='price2'>По цене &darr;</label>
        </div>
      </div>
    </div>
  );
});

export default Filters;
