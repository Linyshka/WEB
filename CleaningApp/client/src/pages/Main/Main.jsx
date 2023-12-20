import React, { useEffect, useState } from "react";
import { Slider } from "../../components/Slider/Slider";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import { getIp, getJoke } from "../../http/api/api";
import { getLastNew } from '../../http/newsApi';
import { NEWSDETAIL_ROUTE } from '../../utils/constants';

const Main = () => {
  const [timezone, setTimezone] = useState();
  const [lastNew, setLastNew] = useState([]);
  const [shortdDescription, setShortDescription] = useState();
  const navigate = useNavigate();
  const [joke, setJoke] = useState();

  const currentDate = (currentDateTime) => {
    const day = currentDateTime.getDate();
    const month = currentDateTime.getMonth();
    const year = currentDateTime.getFullYear();
    return `${day}.${month + 1}.${year}`;
  };

  useEffect(() => {
    try {
      getIp()
        .then((response) => setTimezone(response.timezone))
        .catch((error) => console.log(error));
      getJoke().then((response) => {
        setJoke(response.setup + " " + response.punchline);
      });
    } catch (err) {
      console.log("failed");
    }
  }, []);

  useEffect(() => {
    getLastNew().then((response) => {
      setLastNew(response);
      setShortDescription(response.description.slice(0, 200));
    });
  }, []);

  return (
    <div>
      <div className='container timezone-container'>
        <p className='timezone-start'>{timezone}</p>
        <p className='timezone-end'>{currentDate(new Date())}</p>
      </div>
      <div className='container timezone-container'>
        <p className='timezone-start'>Шутка:</p>
        <p className='timezone-end'>{joke}</p>
      </div>
      <Slider />
      <div className='container lastNew-container'>
        <h2>{lastNew.title}</h2>
        <p>{shortdDescription}...</p>
        <button onClick={() => navigate(NEWSDETAIL_ROUTE + "/" + lastNew.id)}>Чиать дальше</button>
      </div>
    </div>
  );
};

export default Main;
