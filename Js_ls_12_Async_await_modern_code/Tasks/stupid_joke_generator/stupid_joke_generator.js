'use strict';

/*
Сделать генератор глупых шуток по 3-и за раз
https://official-joke-api.appspot.com/jokes/random
с отображением на странице.
*/

const wrapper = document.querySelector('.wrapper');

async function getStupidJoke(params) {
  const resp = await fetch(
    "https://official-joke-api.appspot.com/jokes/random"
  );
  return resp.json();
}

async function generate() {
  try {
    wrapper.innerHTML = '';
    const data = await Promise.allSettled([
      getStupidJoke(),
      getStupidJoke(),
      getStupidJoke(),
    ]);
    console.log(data);
    for (const el of data){
      const element = document.createElement('div');
      element.innerHTML = `${el.value.setup} : ${el.value.punchline}`;  
      wrapper.appendChild(element);    
    }
  } catch (e) {
    console.error(e);
  }
}

