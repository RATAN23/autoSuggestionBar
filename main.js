import './style.css'

const searchVal = document.querySelector("#sBar");
const suggContainer = document.querySelector(".suggestions");
const suggUl = document.querySelector(".suggUl");

function showRecommendedList(list){
  if(!list.length){
    return suggContainer.classList.remove("show");
  }
  suggContainer.classList.add("show");
  suggUl.innerHTML = '';
  list.map((item) => {
  const li  = document.createElement("li");
  li.innerText = item.search;
  suggUl.appendChild(li);
  })
  
}

async function filterSuggestions(e){
  const response = await fetch('./data.json');
  const suggestionList  = await response.json();
  let searchInputValue = searchVal.value;
  let recommendedList = [];
  if(searchInputValue.length > 0){
    recommendedList = suggestionList.filter((listItem) => {
      return listItem.search.toLowerCase().includes(searchInputValue.toLowerCase());
    });
  }
  showRecommendedList(recommendedList);
  
}

searchVal.addEventListener("input" , (e) => {
      filterSuggestions(e);
});


