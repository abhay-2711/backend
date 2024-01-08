const gfName = "MissRandom";
const gfName2 = "MissRandom2";
const gfName3 = "MissRandom3";

const generateLovePercent = () => {
    // return `${Math.floor(Math.random()*100)}%`;
    return `${~~(Math.random()*100)}%`
}

module.exports = {generateLovePercent,gfName, gfName2, gfName3};