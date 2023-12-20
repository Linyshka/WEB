import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../..";
import NewItem from './NewItem';
import './NewsList.css';

const NewsList = observer(() => {
  const { news } = useContext(Context);

  return (
    <div className='services'>
      {news.news.map((n) => (
        <NewItem key={n.id} currentNew={n} />
      ))}
    </div>
  );
});

export default NewsList;
