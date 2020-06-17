const getFromLs = data =>  data.split("@").map(elem => JSON.parse(elem));

export default getFromLs;