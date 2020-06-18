import React from "react";
import rgbaParse from "./../services/rgbaParse";
import styles from "./Table.module.css";

const TableElement = ({
  data,
  deleteColour,
  editRow,
  handleDragStart,
  idx,
  getStyles,
  isDrag,
  handleDragEnter,
  editing,
}) => {
  const { name, type, colour, id, base } = data;

  const handleClick = () => {
    let answer = window.confirm("You sure you want to delete this colour?");
    if (answer) {
      deleteColour(id);
    }
  };

  return (
    <tr
      draggable={!editing}
      onDragStart={(event) => handleDragStart(event, idx)}
      onDragEnter={isDrag ? (event) => handleDragEnter(event, idx) : null}
      className={isDrag ? getStyles(idx) : `${styles.row}`}
    >
      <td className={styles.text}>{name}</td>
      <td className={styles.text}>{type}</td>
      <td>{typeof colour === "object" ? rgbaParse(colour) : colour}</td>
      <td>
        <button
          onClick={() => editRow({ id, name, type, colour, base })}
          className={styles.btn}
        >
          Edit
        </button>
        <button onClick={handleClick} className={styles.btn}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableElement;
