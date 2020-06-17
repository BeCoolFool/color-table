import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import styles from "./Form.module.css";
import { validateBase, convertColor } from "../services/validateBase";

const EditColourForm = ({ setEditing, currentColour, updateColour }) => {
  const [colour, setColour] = useState(currentColour);
  const [colorPicker, showColorPicker] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setColour((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateBase(colour.base, colour.colour)
      ? updateColour(colour.id, colour)
      : updateColour(colour.id, {
          ...colour,
          colour: convertColor(colour.base, colour.colour),
        });
  };

  const handleColourChange = (color) => {
    setColour((prev) => ({ ...prev, colour: color[colour.base] }));
  };

  useEffect(() => {
    setColour(currentColour);
  }, [currentColour]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>Name</label>
      <input
        className={styles.input}
        type="text"
        name="name"
        placeholder="button colour"
        value={colour.name}
        onChange={handleInputChange}
        required
      />
      <label className={styles.label}>Type</label>
      <input
        className={styles.input}
        type="text"
        name="type"
        placeholder="side"
        value={colour.type}
        onChange={handleInputChange}
        required
      />
      <label className={styles.label}>Color</label>
      <button
        onClick={() => showColorPicker((prev) => !prev)}
        type="button"
        className={styles.modal}
      >
        {colorPicker ? "Close colorpicker" : "Open colorpicker"}
      </button>
      {colorPicker ? (
        <React.Fragment>
          <div>
            <input
              type="radio"
              name="base"
              value="rgb"
              id="rgb"
              onChange={handleInputChange}
              required
              defaultChecked={colour.base === "rgb"}
            />
            <label htmlFor="rgb" className={styles.label}>
              RGB
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="base"
              value="hex"
              id="hex"
              onChange={handleInputChange}
              defaultChecked={colour.base === "hex"}
            />
            <label htmlFor="hex" className={styles.label}>
              HEX
            </label>
          </div>
          <SketchPicker onChange={handleColourChange} color={colour.colour} />
        </React.Fragment>
      ) : null}
      <div className={styles.btns}>
        <button className={styles.btn} type="submit">
          Update
        </button>
        <button
          onClick={() => {
            setEditing(false);
          }}
          className={styles.btn}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditColourForm;
