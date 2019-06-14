function gradientChange() {
  for (i = 0; i < 10; i++) {
    var newDiv = $("<div>");
    newDiv.addClass("div");
    newDiv.addClass("c" + i);
    $(".color").append(newDiv);
  }
}
gradientChange();

//   Change Color to create a gradient wave flow of colors
function dynoColor() {
  for (i = 0; i < 10; i++) {
    var red = Math.floor(Math.random() * 10) + 25 * i;
    var green = Math.floor(Math.random() * 10) + 25 * i;
    var blue = Math.floor(Math.random() * 10) + 25 * i;
    $(".c" + i).css(
      "backgroundColor",
      "rgb(" + red + "," + green + "," + blue + ")"
    );
  }
}
setInterval(dynoColor, 250);

// // Anime.js Animations
// var tl = anime.timeline({
//           easing: 'easeOutExpo',
//           duration: 750
//         })

//         tl.add ({
//           targets: '.div',
//           width:'100%',
//           opacity:'0.8',
//           delay:anime.stagger(100)
//         })

//         tl.add ({
//           targets: '.c3, .c4, .c5, .c6, .c7, .c8, .c9',
//           width: '75%',
//           opacity: '0.8',
//         })

//         tl.add ({
//           targets: '.c0, .c1, .c2',
//           width: '0%',
//           opacity: '0.8',
//         })
//         for (i=0; i<7;i++){
//         tl.add ({
//           targets: 'h1',
//           top:'20%',
//           opacity: 1,
//           delay:anime.stagger(500)
//         })
//       }

//       function loadMain(){
//  $("#intro").addClass('animated lightSpeedOut delay-1s').delay(2000).fadeOut();
//  $("#mainbody").delay(2200).fadeIn();
//  console.log("Fade out")
// }

$(document).ready(function() {
  setTimeout(loadMain, 7000);
  console.log("doc ready chk");
});
