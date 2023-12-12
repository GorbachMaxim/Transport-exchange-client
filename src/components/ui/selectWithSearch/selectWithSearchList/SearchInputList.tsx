import React, { PureComponent } from 'react';

import styles from '../SearchInput.module.scss';
import City from '../../../../core/types/city';

interface SearchInputListProps {
  cities: City[];
  onCityClick: (city: City) => void;
}

class SearchInputList extends PureComponent<SearchInputListProps> {
  render() {
    const { cities, onCityClick } = this.props;

    return (
      <ul className={`${styles.searchList} scrollBar`}>
        {cities.map((city) => (
          <li
            key={city.name}
            className={styles.listItem}
            onClick={() => onCityClick(city)}
          >
            {city.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default SearchInputList;
