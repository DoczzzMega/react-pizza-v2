// import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice';

function Categories() {
  const values = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const dispatch = useDispatch()
  const categoryId = useSelector(state => state.filter.categoryId);
  


  // const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="categories">
      <ul>
        {values.map((value, index) => (
          <li key={index} onClick={() => dispatch(setCategoryId(index))} className={categoryId === index ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

