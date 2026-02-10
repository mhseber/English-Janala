const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displayLesson(json.data));
};

const displayLesson = (lessons)=>{
    // 1. get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 2. get into every lessons
    for(let lesson of lessons){
         // 3. create element
         const btnDiv = document.createElement("div");
         btnDiv.innerHTML = `
         <button class="btn btn-outline btn-primary">Lesson- ${lesson.level_no}</button>
         `;
    // 4. append into container
    levelContainer.append(btnDiv);
    }
   
}
loadLessons();