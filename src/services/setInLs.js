const setInLs = data => {
    const temp = data.map(elem => JSON.stringify(elem));
    localStorage.setItem("data", temp.join("@"));
}

export default setInLs;