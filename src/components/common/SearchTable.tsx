import React, { useState, useCallback } from 'react';
import SearchIcon from '../../components/icons/SearchIcon';
interface SearchTableProps<T> {
  data: T[];
  onSearch: (filteredData: T[]) => void;
  placeholder?: string;
}

export default function SearchTable<T extends Record<string, any>>({
  data,
  onSearch,
  placeholder = "Buscar...",
}: SearchTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredData = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );

    onSearch(filteredData);
  }, [data, onSearch]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    onSearch(data);
  }, [data, onSearch]);

  return (
    <div className="search-table-container">
      <div className="search-icon-wrapper">
        <SearchIcon className="search-icon" />
      </div>
      <input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        className="search-table-input"
      />
      {searchTerm && (
        <button onClick={handleClear} className="clear-button">
        </button>
      )}
    </div>
  );
}
