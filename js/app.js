console.log('Sanity Check: Rebirth of Reddit');

const pageWrapper = document.createElement('div');
pageWrapper.id = 'wrapper';
document.body.appendChild(pageWrapper);
const expandDiv = document.createElement('div');
expandDiv.id = 'expand';
pageWrapper.appendChild(expandDiv);

const headerDiv = document.createElement('div');
headerDiv.id = 'header';
pageWrapper.appendChild(headerDiv);

const headerbackground = document.createElement('div');
headerbackground.id = 'header_background';
pageWrapper.appendChild(headerbackground);

const bannerUl = document.createElement('div');
bannerUl.id = 'banners';
pageWrapper.appendChild(bannerUl);

const random = document.createElement('li');
random.className = 'navigation';
random.id = 'nav_random';
random.innerHTML = 'Random';
bannerUl.appendChild(random);

const board = document.createElement('li');
board.className = 'navigation';
board.id = 'nav_boards';
board.innerHTML = 'Boards';
bannerUl.appendChild(board);

const getApp = document.createElement('li');
getApp.className = 'navigation';
getApp.id = 'nav_getapp';
getApp.innerHTML = 'Get the App';
bannerUl.appendChild(getApp);

const theWrapper = document.createElement('div');
theWrapper.id = 'wrapper';
document.body.appendChild(theWrapper);




let arrayOfAww = [];
let arrayInAww = {};
let wrapperDiv = document.getElementById("wrapper");

random.addEventListener("click", randomSubRGen("http://www.reddit.com/r/starcraft.json"));
board.addEventListener("click", randomSubRGen("http://www.reddit.com/.json"));
getApp.addEventListener("click", randomSubRGen("http://www.reddit.com/.json"));

function requestListener() {
  return function() {
    let parsedDocument = JSON.parse(this.responseText).data.children;
    arrayOfAww = parsedDocument;
    console.log(arrayOfAww);
    generateDivChildren(arrayOfAww);
  };
}

function retrieveAPI(url) {
  let apiRequest = new XMLHttpRequest();

  apiRequest.addEventListener("load", requestListener());
  apiRequest.open("GET", url);
  apiRequest.send();
}

function randomSubRGen(url) {
  return function() {
    wrapperDiv.innerHTML = "";
    return retrieveAPI(url);
  };
}

function generateDivChildren(array) {
  for (let i=1; i<100; i++) {
    let innerWrapper = document.createElement('div');
    let imagePreview = document.createElement('div');
    let titleDiv = document.createElement('div');
    let statsDiv = document.createElement('div');
    let currentElement = array[i].data;

    innerWrapper.className = "innerWrapper";
    imagePreview.className = "imagePreview";
    titleDiv.className = "titleDiv";
    statsDiv.className = "statsDiv";

    innerWrapper.addEventListener("click", function() {
      return open(currentElement.url);
    });
    
    imagePreview.style.backgroundImage = generateImage(currentElement, imagePreview);
    
    titleDiv.innerHTML = currentElement.title; 
    statsDiv.innerHTML = currentElement.author + ' ' + 
                         new Date(currentElement.created*1000) + ' ' +
                         currentElement.score + ' ' + 
                         currentElement.num_comments;

    wrapperDiv.appendChild(innerWrapper);
    innerWrapper.appendChild(imagePreview);
    innerWrapper.appendChild(titleDiv);
    innerWrapper.appendChild(statsDiv);
  }
}

function generateImage(currentElement, imagePreview) {
  let redditLogo = 'url("http://www.doomsteaddiner.net/blog/wp-content/uploads/2015/10/reddit-logo.png")';
  let currentElementImage = currentElement.preview.images[0].source.url;

  if (!currentElement.preview || currentElementImage.match(/.(png|jpeg|gif)/g)) {
    return redditLogo;
  } else {
    return `url("${currentElementImage}")`;
  }
}

retrieveAPI('https://www.reddit.com/.json');
