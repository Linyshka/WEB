import {useContext, useEffect} from "react";
import { Context } from '../..';
import { getNews } from '../../http/newsApi';
import NewsList from '../../components/NewsList';

const News = () => {
  const { news } = useContext(Context);

  useEffect(() => {
    getNews().then((data) => {
      news.setNews(data);
    });
  }, [news]);

  return (
    <div className='container news-container'>
      <NewsList />
    </div>
  );
}

export default News;