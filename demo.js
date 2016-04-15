function newBox() {
  var randomColor = '#' + '0123456789abcdef'.split('').map(function (v, i, a) {
      return i > 5 ? null : a[Math.floor(Math.random() * 16)]
    }).join('');

  var heights = [50,150, 190, 230];
  var randomHeight = heights[Math.floor(Math.random() * heights.length)];

  var $Box = $("<div class='box' />").css({
    backgroundColor: randomColor,
    height: randomHeight
  });
  return $Box;
}

////////////////////////////////////////////////////////////

//for (i = 0; i < 0; i++) {
//var $Box = newBox();
//$(".bricklayer").append($Box.text(i));
//}

var bricklayer = $('.bricklayer').bricklayer()
  .onBreakpoint(function (e, size) {
    console.log(size);
  })
  .onAfterPrepend(function (e, el) {
    $(el).addClass("is-prepend");
    setTimeout(function () {
      $(el).removeClass("is-prepend");
    }, 500);
  })
  .onAfterAppend(function (e, el) {
    $(el).addClass("is-append");
    setTimeout(function () {
      $(el).removeClass("is-append");
    }, 500);
  });

////////////////////////////////////////////////////////////

$("button").click(function () {

  var $Box = newBox();
  $Box.text(bricklayer.elements.length + 1);

  if ($(this).is("[data-append]")) {
    bricklayer.append($Box);
    $(document.body).animate({scrollTop: document.body.scrollHeight})
  }

  if ($(this).is("[data-prepend]")) {
    bricklayer.prepend($Box);
    $(document.body).animate({scrollTop: 0})
  }

  if ($(this).is("[data-append-multiple]")) {
    var $AnotherBox = newBox();
    $AnotherBox.text(bricklayer.elements.length + 2);
    bricklayer.append([$Box, $AnotherBox]);
    $(document.body).animate({scrollTop: document.body.scrollHeight})
  }

});

for (var i = 0; i < 10; i++) {
  setTimeout(function () {
    var $box = newBox()
    $box.text(bricklayer.elements.length + 1);
    bricklayer.append($box)
  }, (i+1)*100)
}
