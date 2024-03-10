// App.js
import React, { useEffect, useState } from "react";
import Header from "./component/Header";
import Search from "./component/Search";
import NoteList from "./component/NoteList";
import "bootstrap/dist/css/bootstrap.min.css";
import { nanoid } from "nanoid";
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Load dark mode state from local storage
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);

    // Load notes from local storage
    const savedNotes = JSON.parse(localStorage.getItem("ann")) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    // Save dark mode state to local storage whenever it changes
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleData = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem("ann", JSON.stringify(newNotes));
  };

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    handleData(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    handleData(newNotes);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleMode={() => setDarkMode((prevMode) => !prevMode)} />
        <Search handleSearchNote={setSearchText} />
        <NoteList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
