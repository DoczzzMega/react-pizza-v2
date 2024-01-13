import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { setCurrentPage } from '../redux/slices/filterSlice';


const paginate = (items, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;
  return [...items].splice(startIndex, pageSize);
}

function Home() {
  const [items, setItems] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  const categoryId = useSelector((state) => state.filter.categoryId);

  const pageSize = 4;
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.filter.currentPage);

  

  const itemsCrop = paginate(items, currentPage, pageSize)

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6554c1d563cafc694fe6e6fa.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }`,
    )
      .then((res) => res.json())
      .then((array) => {
        setItems(array);
        setIsLoading(false);
        dispatch(setCurrentPage(1));
      });
    window.scrollTo(0, 0);
  }, [categoryId, dispatch]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, i) => <Skeleton key={i} />)
          : itemsCrop.map((obj, i) => <PizzaBlock key={i} {...obj} />)}
      </div>
      <Pagination itemsCount={items.length} pageSize={pageSize} />
    </div>
  );
}



export default Home;
