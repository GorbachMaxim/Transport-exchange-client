import React, {
  ChangeEvent,
  createRef,
  KeyboardEvent,
  PureComponent,
  RefObject,
} from 'react';

import SearchIcon from '../../../assets/icons/search-icon.svg';
import SearchInputList from './selectWithSearchList/SearchInputList';

import styles from './SearchInput.module.scss';
import City from '../../../core/types/city';
import { values } from 'mobx';

interface SearchInputProps {
  cities: City[];
  onSelectCity: (city: City | null) => void;
  className?: string;
  setNotFound: (isNotFound: boolean) => void;
  text: string;
  value: string;
}

interface SearchInputState {
  selectedCity: string;
  isOpenList: boolean;
}

export class SearchInput extends PureComponent<
  SearchInputProps,
  SearchInputState
> {
  private readonly searchInputWrapper: RefObject<HTMLDivElement>;

  private readonly searchInput: RefObject<HTMLInputElement>;

  constructor(props: SearchInputProps) {
    super(props);

    this.searchInputWrapper = createRef();
    this.searchInput = createRef();
    this.state = {
      selectedCity: this.props.value,
      isOpenList: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickOutside);
    return () => document.removeEventListener('click', this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside);
  }

  public onClickOutside = (event: Event) => {
    const isClickedOutsideInputWrapper =
      !this.searchInputWrapper.current?.contains(event.target as Node);
    const isInputLostFocus =
      this.searchInput.current !== document.activeElement;

    if (isClickedOutsideInputWrapper && isInputLostFocus) {
      this.setState({
        isOpenList: false,
      });
    }
  };

  onInputCity = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      selectedCity: event.target.value,
    });
  };

  onCityClick = (city: City) => {
    const { onSelectCity, setNotFound } = this.props;

    this.setState({
      selectedCity: city.name,
    });

    this.closeList();
    setNotFound(false);
    onSelectCity(city);
  };

  onSearchClick = () => {
    const { cities, onSelectCity, setNotFound } = this.props;
    const { selectedCity } = this.state;

    const city = cities.find((cityItem) => cityItem.name === selectedCity);

    this.closeList();
    setNotFound(selectedCity.length > 0 && !city);
    onSelectCity(city || null);
  };

  onEnterClick = (event: KeyboardEvent<HTMLInputElement>) => {
    const enterKey = 'Enter';
    const isInputOnFocus = this.searchInput.current === document.activeElement;

    if (event.key === enterKey && isInputOnFocus) {
      this.searchInput.current?.blur();
      this.onSearchClick();
    }
  };

  openList = () => {
    this.setState({
      isOpenList: true,
    });
  };

  closeList = () => {
    this.setState({
      isOpenList: false,
    });
  };

  render() {
    const { selectedCity, isOpenList } = this.state;
    const { cities, className } = this.props;
    const filteredCurrencies = cities.filter((city) =>
      city.name.toLowerCase().includes(selectedCity.toLowerCase()),
    );

    return (
      <div
        className={`${styles.searchInput} ${className}`}
        ref={this.searchInputWrapper}
      >
        <div className={styles.select}>
          <input
            ref={this.searchInput}
            value={selectedCity}
            onChange={this.onInputCity}
            onFocus={this.openList}
            onKeyDown={this.onEnterClick}
            placeholder={this.props.text}
          />
          {/*<SearchIcon*/}
          {/*  data-testid='currencySearchInput'*/}
          {/*  className={styles.searchIcon}*/}
          {/*  onClick={this.onSearchClick}*/}
          {/*/>*/}
        </div>
        {isOpenList && (
          <SearchInputList
            cities={filteredCurrencies}
            onCityClick={this.onCityClick}
          />
        )}
      </div>
    );
  }
}
