import React, { useId, useState, useTransition, useRef, useMemo } from "react";

const SearchBar = () => {
  const id = useId();
  const inputRef = useRef();

  const [searchInput, setSearchInput] = useState("");
  const [players, setPlayers] = useState(
    JSON.parse(sessionStorage.getItem("players"))
  );
  const [isPending, startTransition] = useTransition();

  function handleSearchInputChange(e) {
    startTransition(() => {
      setSearchInput(e.target.value);
    });
  }

  function onSubmit(e) {
    e.prevenDefault();
    const value = inputRef.current.value;
  }

  const filteredPlayers = useMemo(
    () =>
      players
        ? Object.keys(players).reduce((res, key) => {
            res[key] = players[key].filter(
              function (player) {
                if (
                  this.count < 5 &&
                  player.full_name
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
                ) {
                  this.count++;
                  return true;
                }
                return false;
              },
              { count: 0 }
            );
            return res;
          }, {})
        : null,
    [players, searchInput]
  );

  return (
    <>
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <input
          id={id}
          type="search"
          placeholder="Search"
          aria-label="Search"
          ref={inputRef}
          value={searchInput}
          onChange={handleSearchInputChange}
          className="form-control"
        />

        <button htmlFor={id} className="btn btn-dark">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </form>
      {searchInput === "" ? null : isPending ? (
        <div style={{ position: "absolute" }}>Loading...</div>
      ) : (
        <div
          style={{
            position: "absolute",
            backgroundColor: "gray",
            borderRadius: "5px",
            border: "2px black solid",
          }}
        >
          {filteredPlayers
            ? Object.keys(filteredPlayers).map((key) => (
                <div
                  style={{
                    border: "5px black solid",
                  }}
                  key={key}
                >
                  <div
                    style={{
                      color: "black",
                      backgroundColor: "white",
                      textAlign: "center",
                    }}
                  >
                    {key.toUpperCase()}
                  </div>
                  <div style={{ padding: "0 1vw" }}>
                    {filteredPlayers[key].map((player) => (
                      <div key={player.id}>
                        <a>{player.name}</a>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : null}
        </div>
      )}
    </>
  );
};

export default SearchBar;
