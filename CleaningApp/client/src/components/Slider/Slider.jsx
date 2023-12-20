import { useEffect, useState } from "react";
import advertisment1 from "../../assets/img/advertisement.jpg";
import advertisment2 from "../../assets/img/advertisement_2.jpg";
import advertisment3 from "../../assets/img/advertisement_3.png";

export function Slider() {
  const [active, setActive] = useState(0);
  const [left, setLeft] = useState(0);
  const [items, setItems] = useState();

  useEffect(() => {
    setItems(document.querySelectorAll(".slider .list .item"));
  }, []);

  let dots = document.querySelectorAll(".slider .dots li");

  function reloadSlider() {
    const left = items[active].offsetLeft;
    setLeft(-left);

    let lastActiveDot = document.querySelector(".slider .dots li.active");
    lastActiveDot.classList.remove("active");
    dots[active].classList.add("active");
  }

  return (
    <section>
      <div className='container banner-container'>
        <div className='slider'>
          <div className='list' style={{left: `${left}px`}}>
            <div className='item'>
              <a href='https://www.ozon.ru/category/shvabry-14618/'>
                <img src={advertisment1} alt='first slide' />
              </a>
            </div>
            <div className='item'>
              <a href='https://www.ozon.ru/category/shvabry-14618/'>
                <img src={advertisment2} alt='second slide' />
              </a>
            </div>
            <div className='item'>
              <a href='https://www.ozon.ru/category/shvabry-14618/'>
                <img src={advertisment3} alt='third slide' />
              </a>
            </div>
          </div>
          <ul className='dots'>
            <li
              onClick={() => {
                setActive(0);
                reloadSlider();
              }}
              className='active'
            ></li>
            <li
              onClick={() => {
                setActive(1);
                reloadSlider();
              }}
            ></li>
            <li
              onClick={() => {
                setActive(2);
                reloadSlider();
              }}
            ></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
