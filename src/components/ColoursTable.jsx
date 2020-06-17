import React, { useState, useEffect, useRef } from "react";
import TableElement from "./TableElement";
import styles from "./Table.module.css";
import setInLs from "../services/setInLs";

const ColorsTable = ({ colours, deleteColour, editRow, setData }) => {
  const [elements, setElements] = useState(colours);
  const [dragging, setDragging] = useState(false);

  const dragItem = useRef();
  const dragNode = useRef();

  useEffect(() => {
    setElements(colours);
  }, [colours]);

  const handleDragStart = (event, idx) => {
    dragItem.current = idx;
    dragNode.current = event.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const handleDragEnter = (event, idx) => {
    const currentItem = dragItem.current;
    if (event.target !== dragNode.current) {
      setElements((prev) => {
        let newElements = JSON.parse(JSON.stringify(prev));
        newElements.splice(idx, 0, newElements.splice(currentItem, 1)[0]);
        dragItem.current = idx;
        setInLs(newElements);
        return newElements;
      });
    }
  };

  const getStyles = (idx) => {
    const currentItem = dragItem.current;
    return idx === currentItem ? `${styles.dnd}` : `${styles.row}`;
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.header}>Name</th>
          <th className={styles.header}>Type</th>
          <th className={styles.header}>Colour</th>
          <th className={styles.header}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {elements.length > 0 ? (
          elements.map((colour, idx) => (
            <TableElement
              data={colour}
              key={colour.id}
              idx={idx}
              deleteColour={deleteColour}
              editRow={editRow}
              handleDragStart={handleDragStart}
              handleDragEnter={handleDragEnter}
              getStyles={getStyles}
              isDrag={dragging}
            />
          ))
        ) : (
          <tr>
            <td colSpan={4}>No colors. How about adding some?</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ColorsTable;
