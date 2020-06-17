import React, { useState } from "react";
import { SketchPicker } from "react-color";
import styles from "./Form.module.css";

const AddColourForm = ({ addColour }) => {
  const initialFormState = {
    id: null,
    name: "",
    type: "",
    colour: "",
    base: "rgb",
  };
  const [colour, setColour] = useState(initialFormState);
  const [colorPicker, showColorPicker] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setColour((prev) => ({ ...prev, [name]: value }));
  };

  const handleColourChange = (color) => {
    setColour((prev) => ({ ...prev, colour: color[colour.base] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (colour.colour) {
      addColour(colour);
      setColour(initialFormState);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>Name</label>
      <input
        className={styles.input}
        type="text"
        name="name"
        placeholder="button colour"
        value={colour.name}
        onChange={handleChange}
        required
      />
      <label className={styles.label}>Type</label>
      <input
        className={styles.input}
        type="text"
        name="type"
        placeholder="side"
        value={colour.type}
        onChange={handleChange}
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
              onChange={handleChange}
              required
              defaultChecked
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
              onChange={handleChange}
            />
            <label htmlFor="hex" className={styles.label}>
              HEX
            </label>
          </div>

          <SketchPicker onChange={handleColourChange} color={colour.colour} />
          <button className={styles.btn} type="submit">
            Add new color
          </button>
        </React.Fragment>
      ) : null}
    </form>
  );
};

export default AddColourForm;
