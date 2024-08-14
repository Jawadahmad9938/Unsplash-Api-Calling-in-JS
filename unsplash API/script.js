let accessKey = "93ORGc1S9K1lri4f6dD46_kRVZgATc3H8gL_g5kWw3M";
let mainDiv = document.querySelector(".main-div");
let input = document.querySelector(".inp");
let btn = document.querySelector(".btn");
let leftbtn = document.querySelector(".previous");
let rightbtn = document.querySelector(".next");
let page = 1;

async function gettingAPI() {
  let value = input.value.trim();
  if (value === "") {
    return;
  }

  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${value}&client_id=${accessKey}`;

  let response = await fetch(url);
  let data = await response.json();
  let array = data.results;
  console.log(data.results);
  mainDiv.innerHTML = "";

  array.forEach((oneValue) => {
    let imgDiv = document.createElement("div");
    imgDiv.className = "img-div";

    let image = document.createElement("img");
    image.src = oneValue.urls.small;

    let title = document.createElement("span");
    title.innerText = oneValue.alt_description;

    imgDiv.append(image);
    imgDiv.append(title);
    mainDiv.append(imgDiv);
  });

  if (page == 1) {
    leftbtn.style.display = "none";
  } else {
    leftbtn.style.display = "inline-block";
  }
  if (page == array.length) {
    rightbtn.style.display = "none";
  } else {
    rightbtn.style.display = "inline-block";
}

}

gettingAPI();

rightbtn.style.display = "none";
leftbtn.style.display = "none";

leftbtn.addEventListener("click", () => {
    if (page > 1) {
        page--;
        gettingAPI();
    }
});


rightbtn.addEventListener("click", () => {
    page++;
    gettingAPI();
});

btn.addEventListener("click", gettingAPI);
