import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { Pagination } from "@mui/material";

import "./Pages.css";

const Pages = observer(() => {
  const { service } = useContext(Context);
  const pageCount = Math.ceil(service.totalService / service.limit);

  return (
    <Pagination
      color='primary'
      count={pageCount}
      page={service.page}
      onChange={(_, num) => service.setPage(num)}
    />
  );
});

export default Pages;
