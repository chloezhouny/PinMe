function gradientChange() {
  for (i = 0; i < 10; i++) {
    var newDiv = $("<div>");
    newDiv.addClass("div");
    newDiv.addClass("c" + i);
    $(".color").append(newDiv);
  }
}
gradientChange();

var count = 0;
var step = 1;

var purpleCount = 0;
//   Change Color to create a gradient wave flow of colors
function dynoColor() {
  for (i = 0; i < 10; i++) {
    var red = 25 * i + count;
    var green = 25 * i + count;
    var blue = 25 * i + count;
    $(".c" + i).css(
      "backgroundColor",
      "rgb(" + red + "," + green + "," + blue + ")"
    );
  }
  count = count + step * 1.5;
}
var dyno = setInterval(dynoColor, 50);

function purpleColor() {
  for (i = 0; i < 10; i++) {
    var red = 5 * i + 230 - purpleCount;
    var green = 5 * i + 210 - purpleCount;
    var blue = 5 * i + 250 - purpleCount;
    $(".c" + i).css(
      "backgroundColor",
      "rgb(" + red + "," + green + "," + blue + ")"
    );
  }
  purpleCount = purpleCount + step * 3;
}

//         tl.add ({
//           targets: '.div',
//           width:'100%',
//           opacity:'0.8',
//           delay:anime.stagger(100)
//         })

// Anime.js Animations
var tl = anime.timeline({
  easing: "easeOutExpo",
  duration: 750
});

tl.add({
  targets: ".div",
  width: "100%",
  opacity: "0.8",
  delay: anime.stagger(100)
});

tl.add({
  targets: ".c3, .c4, .c5, .c6, .c7, .c8, .c9",
  width: "75%",
  opacity: "0.8"
});

tl.add({
  targets: ".c0, .c1, .c2",
  width: "0%",
  opacity: "0.8"
});
tl.add({
  targets: "#test-0",
  top: "16%",
  opacity: 1,
  delay: anime.stagger(500)
});
for (i = 0; i < 6; i++) {
  tl.add({
    targets: "#test-1, #test-2, #test-3, #test-4, #test-5",
    top: "20%",
    opacity: 1,
    delay: anime.stagger(500)
  });
}

function funBackground() {
  $("body").addClass("uk-animation-fade");
  $("body").css("background", "url('assets/images/kuva4_nettiin.jpg')");
}
function loadMain() {
  clearInterval(dyno);
  setInterval(purpleColor, 50);
  $("#intro")
    .addClass("animated lightSpeedOut delay-1s")
    .delay(2000)
    .fadeOut();
  setTimeout(funBackground, 2500);
  $("#mainbody")
    .delay(2500)
    .fadeIn();
  console.log("Fade out");
}
$(document).ready(function() {
  setTimeout(loadMain, 7000);
  console.log("doc ready chk");
});
