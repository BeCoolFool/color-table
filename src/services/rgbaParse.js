const rgbaParse = rgba => {
    const {r, g ,b, a} = rgba;
    return a === 0 ? `R: ${r}, G: ${g}, B: ${b}` : `R: ${r}, G: ${g}, B: ${b}, A: ${a}`;
}

export default rgbaParse;