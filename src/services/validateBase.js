const validateBase = (base, color) => (base === "hex" && typeof color === "string") || (base ==="rgb" && typeof color === "object");

const convertColor = (base, color) => {
    let answer;
    switch (base) {
        case "hex":
            answer = `#${color.r.toString(16)}${color.g.toString(16)}${color.b.toString(16)}`
            break;
        case "rgb":
            answer = {
                r: parseInt(color.slice(1,3), 16),
                g: parseInt(color.slice(3,5), 16),
                b: parseInt(color.slice(5), 16),
                a: 0
            }
            break;
        default:
            break;
    }
    return answer;
}

export {validateBase, convertColor};