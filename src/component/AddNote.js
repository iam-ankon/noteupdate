import React, { useState } from "react";

const AddNote = ({handleAddNote}) => {
  const [noteText, setNoteText] = useState("");
  const CharacterLimit = 200;
  const handleChangeNote = (event) => {
    if (CharacterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
  };
  const handleSave = () => {
    if (noteText.trim().length > 0) {
      handleAddNote(noteText);
      setNoteText("");
    }
  };
  return (
    <div className="note new">
      <textarea
        rows="8"
        cols="25"
        placeholder="type your Notes..."
        onChange={handleChangeNote}
        value={noteText}
      ></textarea>
      <div className="note-footer">
        <small>{CharacterLimit - noteText.length} remaining</small>
        <button className="save" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
