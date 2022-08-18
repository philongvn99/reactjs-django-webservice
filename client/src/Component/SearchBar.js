import React, { useId, useState, useTransition } from "react";

const SearchBar = () => {
  const id = useId();
  const [searchInput, setSearchInput] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSearchInputChange(e) {
    startTransition(() => {
      setSearchInput(e.target.value);
    });
  }

  return (
    <>
      <form style={{ display: "flex" }}>
        <input
          id={id}
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={searchInput}
          onChange={handleSearchInputChange}
          className="form-control"
        />

        <label htmlFor={id} className="btn btn-dark">
          <i className="fa fa-search" aria-hidden="true"></i>
        </label>
      </form>
      {searchInput === "" ? null : isPending ? (
        <div style={{ position: "absolute" }}>Loading...</div>
      ) : (
        <div style={{ position: "absolute" }}>Haha</div>
      )}
    </>
  );
};

export default SearchBar;
