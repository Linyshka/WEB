import React, { useState } from 'react';
import CreateService from '../../components/Modals/CreateService';

const Admin = () => {
  const [createVisible, setCreateVisible] = useState(false);
  return (
    <div className='container'>
      <button onClick={() => setCreateVisible(true)}>Добавить сервис</button>
      <CreateService show={createVisible} onHide={() => setCreateVisible(false)} />
    </div>
  );
};

export default Admin;