let words = [];

const Word = function (turkishWord, englishWord) {
  this.turkish = turkishWord;
  this.english = englishWord;
};

/**
 * words'un icinde localstorage'dan gelen degerler eklendi. 'words' GLOBALdeki deger.
 * local degerleri 'string' tuttugundan PARSE ettik object olmasi icin.
 * Object'e cevirmemizin amaci: icerde array ozelliklerini kullanabilmek icin.
 * Array ozelligini kullanabilmek: push vs. edebilmek icin.
 */
window.onload = function () {
  /**
   * bastaki deger false vs. ise || array at.
   */
  words = JSON.parse(window.localStorage.getItem("words")) || [];
};

window.onbeforeunload = function () {
  document.getElementById("input1").value = "";
  document.getElementById("input2").value = "";
};

const saveButton = document.getElementById("save");
saveButton.addEventListener("click", () => {
  const turkishInputValue = document
    .getElementById("input1")
    .value.toLowerCase();
  console.log(turkishInputValue);

  const englishInputValue = document
    .getElementById("input2")
    .value.toLowerCase();
  console.log(englishInputValue);

  /**
   * valuelardan biri bossa please fill.
   */
  if (turkishInputValue.length === 0 || englishInputValue.length === 0) {
    alert("Please fill in both fields");
    return;
  }

  if (turkishInputValue.match(/\d+/g) || englishInputValue.match(/\d+/g)) {
    alert("Numbers are not allowed");
    return;
  }

  for (let i = 0; i < words.length; i++) {
    if (
      words[i].turkish === turkishInputValue ||
      words[i].english === englishInputValue
    ) {
      alert("Duplicate values are not allowed");
      return;
    }
  }

  /**
   *
   * elimizdeki veriye yeni olusturduklarimizi eklemek icin PUSH>>
   */
  const newWord = new Word(turkishInputValue, englishInputValue);
  words.push(newWord);
  /**
   * local string tuttugu icin stringify ettik Object Object olarak gozukmemesi icin.
   */
  window.localStorage.setItem("words", JSON.stringify(words));
});

// cek karistir butonuna click event

const shuffleButton = document.getElementById("shuffle");
shuffleButton.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomLanguage = Math.floor(Math.random() * 2);


  console.log(randomIndex);
  // console.log(randomLanguage);
  document.getElementById("input1").value = words[randomIndex].turkish;
  document.getElementById("input2").value = words[randomIndex].english;
});

// check butonuna click event

const checkButton = document.getElementById("check");
checkButton.addEventListener("click", () => {
  const turkishInputValue = document
    .getElementById("input1")
    .value.toLowerCase();
  console.log(turkishInputValue);

  const englishInputValue = document
    .getElementById("input2")
    .value.toLowerCase();
  console.log(englishInputValue);

  for (let i = 0; i < words.length; i++) {

    if (
      (words[i].turkish === turkishInputValue &&
        words[i].english === englishInputValue) ||
      (words[i].english === turkishInputValue &&
        words[i].turkish === englishInputValue)
    ) {
      alert("Correct");
      return;
    }
  }

  alert("Wrong");

  // const turkishInputValue = document
  //   .getElementById("input1")
  //   .value.toLowerCase();
  // console.log(turkishInputValue);

  // const englishInputValue = document
  //   .getElementById("input2")
  //   .value.toLowerCase();
  // console.log(englishInputValue);

  // alert("Wrong");
});

const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", () => {
  localStorage.removeItem("words");
  words = [];
});

const cabinCrew = document.getElementById("doubleCheck");
cabinCrew.addEventListener("click", () => {
  const searchTurkish = document.getElementById("input1").value;
  const searchEnglish = document.getElementById("input2").value;
  document.getElementById(
    "doubleCheck"
  ).href = `https://translate.google.com/#view=home&op=translate&sl=tr&tl=en&text=${searchTurkish}+${searchEnglish}`;
});
