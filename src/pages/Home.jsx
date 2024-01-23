import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { setCurrentPage } from '../redux/slices/filterSlice';
import { setCategoryId } from '../redux/slices/filterSlice';

function Home() {
  const [items, setItems] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  const [notFound, setNotFound] = React.useState(false);

  const categoryId = useSelector((state) => state.filter.categoryId);

  const pageSize = 4;
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.filter.currentPage);
  const sort = useSelector((state) => state.filter.sort);
  const searchValue = useSelector((state) => state.filter.searchValue);

  const sortBy = sort.sortProperty.replace('-', '');
  const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';

  const paginate = (items, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
  };

  const itemsCrop = paginate(items, currentPage, pageSize);

  React.useEffect(() => {
    dispatch(setCategoryId(0));
  }, [searchValue]);

  React.useEffect(() => {
    setIsLoading(true);
    setNotFound(false);
    fetch(
      `https://6554c1d563cafc694fe6e6fa.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortBy}&order=${order}&search=${searchValue}`,
    )
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else if (res.status === 404) {
          setNotFound(true);
          setItems([]);
          throw Error('Error 404 from searchValue');
        } else {
          throw Error('Error - some fetch error');
        }
      })
      .then((array) => {
        setItems(array);
        setIsLoading(false);
        dispatch(setCurrentPage(1));
      })
      .catch((error) => {
        console.log(error);
      });
    window.scrollTo(0, 0);
  }, [categoryId, dispatch, sort, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {(isLoading && !notFound) && [...new Array(10)].map((_, i) => <Skeleton key={i} />)}

        {(!isLoading && !notFound) && itemsCrop.map((obj, i) => <PizzaBlock key={i} {...obj} />)}

        {notFound && null}
      </div>
      <Pagination itemsCount={items.length} pageSize={pageSize} />
    </div>
  );
}

export default Home;
