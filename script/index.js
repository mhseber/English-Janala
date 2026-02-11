const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displayLesson(json.data));
};

const removeActive = () =>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    // console.log(lessonButtons);
    lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        // console.log(clickBtn);
        clickBtn.classList.add("active");
        displayLevelWord(data.data);
    });
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if(words.length == 0 ){
    wordContainer.innerHTML = `
    <div class="py-10 space-y-6 text-center bg-sky-100 col-span-full rounded-xl font-bangla">
    <img class="mx-auto" src="./assets/alert-error.png"/>
    <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
    </div>
    `;
    return;
    }




    words.forEach((word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
          <div class="px-4 py-10 space-y-4 text-center bg-white shadow-md rounded-xl">
    <h2 class="text-3xl font-bold text-gray-800">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
    <p class="font-semibold">Meaning /Pronounciation</p>
    <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি "} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</div>
    <div class="flex items-center justify-between">
      <button onClick="my_modal_5.showModal()" class="btn text-xl bg-[#1491ff10] hover:bg-[#1491ff80] "><i class="fa-solid fa-circle-info"></i></button>
      <button class="btn text-xl bg-[#1491ff10] hover:bg-[#1491ff80]"><i class="fa-solid fa-volume-low"></i></button>
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
         <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">Lesson- ${lesson.level_no}</button>
         `;
    // 4. append into container
    levelContainer.append(btnDiv);
    }
   
}
loadLessons();