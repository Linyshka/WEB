import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNew } from "../../http/newsApi";

import "./NewDetail.css";
import { NEWS_ROUTE } from "../../utils/constants";

const NewsDetail = () => {
  const { id } = useParams();
  const [currentNew, setCurrentNew] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getNew(id).then((data) => setCurrentNew(data));
  }, [id]);

  return (
    <div className='container'>
      <article className='news-detail-container'>
        <img
          src={process.env.REACT_APP_API_URL + currentNew.img}
          alt='new-img'
        />
        <h3>{currentNew.title}</h3>
        <p>{currentNew.description}</p>
      </article>
      <button onClick={() => navigate(NEWS_ROUTE)}>
        Читать остальные новости
      </button>
    </div>
  );
};

export default NewsDetail;
