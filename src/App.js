import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import AddColourForm from './components/AddColourForm'
import ColorsTable from './components/ColoursTable'
import EditColourForm from './components/EditColourForm';
import setInLs from './services/setInLs';
import getFromLs from './services/getFromLs';


const App = () => {

  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const initialFormState = { id: null, name: "", type: "", colour: "", base: "" }
  const [currentColour, setCurrentColour] = useState(initialFormState)

  const handleAddColour = (colour) => {
    setData(prev => {
      setInLs([...prev, {...colour, id: `${Date.now()}${colour.name}${colour.type}`}]);
      return [...prev, {...colour, id: `${Date.now()}${colour.name}${colour.type}`}];
    })
  }

  const handleDeleteColour = (id) => {
    setEditing(false);
    const newArray = data.filter(elem => elem.id !== id);
    setData(newArray);
    newArray.length !== 0 ? setInLs(newArray) : localStorage.removeItem('data');
  }

  const updateColour = (id, updatedColour) => {
    setEditing(false)
    const newArray = data.map(colour => (colour.id === id ? updatedColour : colour));
    setData(newArray)
    setInLs(newArray);
  }

  const editRow = colour => {
    setEditing(true);
    setCurrentColour({ id: colour.id, name: colour.name, type: colour.type, colour: colour.colour, base: colour.base})
  }

  useEffect(() => {
    if(localStorage.hasOwnProperty("data")){
      setData(getFromLs(localStorage.getItem("data")));
    } else {
      setData([]);
    }
  }, [])


  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.control}>
          {editing ? (
          <React.Fragment>
            <h2 className={styles.header}>Edit color</h2>
            <EditColourForm  
              editing={editing}
              setEditing={setEditing}
              currentColour={currentColour}
              updateColour={updateColour}
            />
          </React.Fragment>) : (
          <React.Fragment>
            <h2 className={styles.header}>Add color</h2>
            <AddColourForm addColour={handleAddColour}/>
          </React.Fragment>
          )}
        </div>
        <div className={styles.data}>
          <h2 className={styles.header}>View colors</h2>
          <ColorsTable colours={data} deleteColour={handleDeleteColour} editRow={editRow} setData={setData} editing={editing}/>
        </div>
      </div>
    </div>
  )
}


export default App;
