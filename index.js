const CHARACTERURL = "https://rickandmortyapi.com/api/character"

document.addEventListener("DOMContentLoaded", init)
document.addEventListener('click', getImageInfo)
// document.addEventListener("mouseout", opacityDown)
// document.addEventListener("mouseover", opacityUp)

function init(){
  fetchAllCharacters()

}
function opacityDown(e){
  pic = e.target
  pic.style.opacity = "0.75"
}
function opacityUp(e){
  pic = e.target
  pic.style.opacity = "1"
}

function getImageInfo(e){
  let characterId = e.target.dataset.characterId
  let pic = e.target
  fetch(CHARACTERURL + `/${characterId}`).then(resp => resp.json()).then(function(json){
    console.log(json)
  })
  console.log(e.target.dataset.characterId)
}


function recursiveFetch(nextPage) {
return fetch(`${nextPage}`)
  .then(res => res.json())
  .then(function(jayson){
  nextPage = jayson.info.next
  if(nextPage.length > 1){
    const THEDIV = document.querySelector("div")
    jayson["results"].forEach(function(character) {
      THEDIV.innerHTML += '<img src="' + character.image + `" class="character-image" data-character-id="${character.id}"' />`
    })
    recursiveFetch(nextPage)
  }
})
}


function fetchAllCharacters() {
  fetch (CHARACTERURL, {
    method: 'GET'
  })
  .then(resp => resp.json())
  .then(function(json){
    let nextPage = json.info.next
    recursiveFetch(nextPage)
  })
}

function fetchRickAndMorty() {
  fetch (CHARACTERURL, {
    method: 'GET'
  }).then(resp => resp.json())
    .then(function(json) {
      const THEDIV = document.querySelector("div")
      console.log(json)
      json["results"].forEach(function(character) {
        THEDIV.innerHTML += '<img src="' + character.image + `" width='15%' />`
        // console.log(character["name"])
      })
    } )
}
