const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displayLesson(json.data));
};

const loadLevelWord = (id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then((data) => displayLevelWord(data.data));
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";




    words.forEach((word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
          <div class="px-4 py-10 space-y-4 text-center bg-white shadow-md rounded-xl">
    <h2 class="text-3xl font-bold text-gray-800">${word.word}</h2>
    <p class="font-semibold">Meaning /Pronounciation</p>
    <div class="text-2xl font-medium font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
    <div class="flex items-center justify-between">
      <button class="btn bg-[#1491ff10] hover:bg-[#1491ff80] "><i class="fa-solid fa-circle-info"></i></button>
      <button class="btn bg-[#1491ff10] hover:bg-[#1491ff80]"><i class="fa-solid fa-volume-low"></i></button>
    </div>
  </div>
        `;
        wordContainer.append(card);

    })
}

const displayLesson = (lessons)=>{
    // 1. get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 2. get into every lessons
    for(let lesson of lessons){
         // 3. create element
         const btnDiv = document.createElement("div");
         btnDiv.innerHTML = `
         <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">Lesson- ${lesson.level_no}</button>
         `;
    // 4. append into container
    levelContainer.append(btnDiv);
    }
   
}
loadLessons();