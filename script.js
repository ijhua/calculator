// set global variables
var USER = 'anonymous';

$(document).ready(function () {
  // setup calculator functions
  setupCalculator();
  // set the initial page to calculator
  changePage("/calculator");
  // link buttons
  $("#to-about").on("click", function () {
    changePage("/about");
  });
  $("#to-calc").on("click", function () {
    changePage("/calculator");
  });
  $("#to-foo").on("click", function () {
    changePage("/foo");
  });
  // track buttons
  [
    ['1', '1'],
    ['2', '2'],
    ['3', '3'],
    ['4', '4'],
    ['5', '5'],
    ['6', '6'],
    ['7', '7'],
    ['8', '8'],
    ['9', '9'],
    ['0', '0'],
    ['plus', '+'],
    ['minus', '-'],
    ['divide', '/'],
    ['times', '*'],
    ['clear', 'clear'],
    ['clearall', 'clearall'],
    ['equals', '='],
    ['to-about', 'about'],
    ['to-calc', 'calc'],
    ['to-foo', 'foo'],
  ].forEach(function (id) {
    $('#' + id[0]).on('click', function () {
      ga('send', 'event', 'click', id[1]);
    });
  });
  // ask for username
  USER = (prompt("username", "pineapple"));
  // start tracking
  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');
  ga('set', 'userId', USER);
});

function setupCalculator() {
  var number = "";
  var newnumber = "";
  var operator = "";
  var totaldiv = $("#total");
  var testNumLength = function (number) {
    if (number.length > 9) {
      totaldiv.text(number.substr(number.length - 9, 9));
      if (number.length > 15) {
        number = "";
        totaldiv.text("Err");
      }
    }
  };
  totaldiv.text("0");
  $("#numbers a").not("#clear,#clearall").click(function () {
    number += $(this).text();
    totaldiv.text(number);
    testNumLength(number);
  });
  $("#operators a").not("#equals").click(function () {
    operator = $(this).text();
    newnumber = number;
    number = "";
    totaldiv.text("0");
  });
  $("#clear,#clearall").click(function () {
    number = "";
    totaldiv.text("0");
    if ($(this).attr("id") === "clearall") {
      newnumber = "";
    }
  });
  $("#equals").click(function () {
    if (operator === "+") {
      number = (parseInt(number, 10) + parseInt(newnumber, 10)).toString(10);
    } else if (operator === "-") {
      number = (parseInt(newnumber, 10) - parseInt(number, 10)).toString(10);
    } else if (operator === "/") {
      number = (parseInt(newnumber, 10) / parseInt(number, 10)).toString(10);
    } else if (operator === "*") {
      number = (parseInt(newnumber, 10) * parseInt(number, 10)).toString(10);
    }
    totaldiv.text(number);
    testNumLength(number);
    number = "";
    newnumber = "";
  });
}

function changePage(name) {
  history.pushState(null, "", name);
  document.dispatchEvent(new Event("locationchange"));
}

function handlePageChange() {
  // get the current page from the url
  var currentLocation = document.location.pathname.split("/")[1];
  // only display that page
  var pages = $("#pages").children();
  var foundMatch = false;
  for (var i = 0; i < pages.length; i++) {
    var a = pages[i];
    if (a.id != currentLocation) {
      a.classList.add('hide');
    } else {
      a.classList.remove('hide');
      foundMatch = true;
    }
  }
  if (!foundMatch) {
    $("#404")[0].classList.remove('hide');
  }
}
document.addEventListener("locationchange", handlePageChange);