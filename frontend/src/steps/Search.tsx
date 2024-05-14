import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "@uidotdev/usehooks";

import { Data } from "../types";
import { searchData } from "../services/search";

const DEBOUNCE_TIME = 300;

export const Search = ({ initialData }: { initialData: Data }) => {
  const [data, setData] = useState<Data>(initialData);
  const [search, setSearch] = useState<string>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("q") ?? "";
  });

  const debounceSearch = useDebounce(search, DEBOUNCE_TIME);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const newPathName =
      debounceSearch === "" ? window.location.pathname : `?q=${debounceSearch}`;
    window.history.pushState({}, "", newPathName);
  }, [debounceSearch]);

  useEffect(() => {
    if (!debounceSearch) {
      setData(initialData);
      return;
    }

    searchData(debounceSearch).then((response) => {
      const [err, newData] = response;
      if (err) {
        toast.error(err.message);
        return;
      }
      if (newData) setData(newData);
    });
  }, [debounceSearch, initialData]);

  const listData = (
    <div>
      <table>
        <tr>
          {Object.keys(data[0]).map((head, key) => (
            <th key={key}>{head}</th>
          ))}
        </tr>
        {data.map((row, key) => {
          return (
            <tr key={key}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.phone}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );

  return (
    <div>
      <h1>Search</h1>
      <form>
        <input
          onChange={handleSearch}
          type="search"
          placeholder="Buscar informacion..."
          defaultValue={debounceSearch}
        />
      </form>
      {listData}
    </div>
  );
};
