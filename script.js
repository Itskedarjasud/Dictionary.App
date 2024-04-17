let input = document.querySelector("#input");
let searchBtn = document.querySelector("#search");
let notFound = document.querySelector(".not-found");
let def = document.querySelector(".def")
let audio = document.querySelector(".audio")

let apiKey = "ee0682f8-55cb-4807-a43b-b026fef1c42b";

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();

    // clean everything
    def.innerText = ""
    notFound.innerText = " "
    audio.innerHTML = ""


    
  // get data
  let word = input.value;

  // Call API
  if (word === "") {
    alert("Word required");
    return;
  }

  getData(word);
});

async function getData(word) {
  const response = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`
  );

  const data = await response.json();
  console.log(data);

  // data not found 
  if(!data.length){
    notFound.innerHTML = "Word Not Found !"
  }


  // If result is Suggestion 
   
  if(typeof data[0] == "string"){
    let heading = document.createElement("h4")
    heading.innerText = "Did you mean"
    notFound.appendChild(heading)

    data.forEach(element => {
        let suggestion = document.createElement("span")
        suggestion.classList.add("suggested")
        suggestion.innerText = element
        notFound.appendChild(suggestion)
        return
    });
  }


//   result found 

  let defination = data[0].shortdef[0];
  def.innerHTML = defination

//   Sound
  const soundName = data[0].hwi.prs[0].sound.audio;
  if(soundName){
    renderSound(soundName)
  }
}


function renderSound(soundName){
    // https://media.merriam-webster.com/soundc11
    let subFolder = soundName[0];
    let soundSRC = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subFolder}/${soundName}.mp3`

    let aud = document.createElement("audio")
    aud.src = soundSRC
    aud.controls = true

    audio.appendChild(aud);
}