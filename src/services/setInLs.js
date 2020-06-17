const setInLs = data => {
    const temp = data.map(elem => JSON.stringify(elem));
    console.log(data);
    localStorage.setItem("data", temp.join("@"));
}

export default setInLs;