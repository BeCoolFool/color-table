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
}) => {
  const { name, type, colour, id } = data;

  const handleClick = () => {
    let answer = window.confirm("You sure you want to delete this colour?");
    if (answer) {
      deleteColour(id);
    }
  };

  return (
    <tr
      draggable
      onDragStart={(event) => handleDragStart(event, idx)}
      onDragEnter={isDrag ? (event) => handleDragEnter(event, idx) : null}
      className={isDrag ? getStyles(idx) : `${styles.row}`}
    >
      <td>{name}</td>
      <td>{type}</td>
      <td>{typeof colour === "object" ? rgbaParse(colour) : colour}</td>
      <td>
        <button
          onClick={() => editRow({ id, name, type, colour })}
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
