const createElement = (arr) => {
    const  htmlElements = arr.map((el)=> `<span class="btn">${el}</span>`);
    console.log(htmlElements.join(" "));
};
const synonyms= ["syss", "syss", "syss"];
createElement(synonyms);