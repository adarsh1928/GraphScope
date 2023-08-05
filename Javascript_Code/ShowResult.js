
export function showResult(isPathFound, length) {
    var firstAnimation = "swashOut";
    var secondAnimation = "swashIn";
    var resultsElement = document.getElementById("results");
    var resultsIconElement = document.getElementById("resultsIcon");
    var durationElement = document.getElementById("duration");
    var lengthElement = document.getElementById("length");
  
    resultsElement.classList.remove();
    resultsElement.classList.add("magictime", firstAnimation);
  
    // Delay to make it look like an animation
    setTimeout(function () {
      resultsIconElement.classList.remove();
      if (!isPathFound) {
        resultsElement.style.backgroundColor = "#ff6961";
        resultsIconElement.classList.add("fas", "fa-times");
      } else {
        resultsElement.style.backgroundColor = "#77dd77";
        resultsIconElement.classList.add("fas", "fa-check");
      }
      durationElement.textContent = "";
      lengthElement.textContent = "Length: " + length;
      resultsElement.classList.remove(firstAnimation);
      resultsElement.classList.add(secondAnimation);
    }, 2222);
  }
  