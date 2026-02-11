const createElements = (arr) => {
    const  htmlElements = arr.map((el)=> `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
};


const manageSpinner = (status)=>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.remove("hidden");
    } else{
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

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
    manageSpinner(true);
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

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}
const displayWordDetails = (word) => {
console.log(word);
const detailsBox = document.getElementById("modal-container");
detailsBox.innerHTML = `
 <div>
        <h2 class="text-2xl font-bold">
          ${word.word} ( <i class="fa-solid fa-microphone"></i>:${word.pronunciation})
        </h2>
      </div>
      <div>
        <h2 class="text-2xl font-bold">
          Meaning
        </h2>
        <p>${word.meaning}</p>
      </div>
      <div>
        <h2 class="text-2xl font-bold">
         Example
        </h2>
        <p>${word.sentence}</p>
      </div>
      <div>
        <h2 class="text-2xl font-bold">
         Synonym
        </h2>
        <div class="">${createElements(word.synonyms)}</div>
      </div>
`;
document.getElementById("word_modal").showModal();
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
    manageSpinner(false);
    return;
    }

    words.forEach((word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="px-4 py-10 space-y-4text-center bg-white shadow-md rounded-xl">
    <h2 class="text-3xl font-bold text-gray-800">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
    <p class="font-semibold">Meaning /Pronounciation</p>
    <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি "} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</div>
    <div class="flex items-center justify-between">
      <button onClick="loadWordDetail(${word.id})" class="btn text-xl bg-[#1491ff10] hover:bg-[#1491ff80] "><i class="fa-solid fa-circle-info"></i></button>
      <button class="btn text-xl bg-[#1491ff10] hover:bg-[#1491ff80]"><i class="fa-solid fa-volume-low"></i></button>
    </div>
  </div>
        `;
        wordContainer.append(card);

    });
    manageSpinner(false);
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