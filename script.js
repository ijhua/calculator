$(document).ready(function () {
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
    
    // set the initial page to calculator
    history.pushState(null, "", "/calculator");

    function handlePageChange() {
      // get the current page from the url
        var currentLocation = document.location.pathname.split("/")[1];
      // only display that page
        var pages = $("#pages").children();
        var foundMatch = false;
        for (var i=0;i<pages.length;i++) {
        if (a.id != currentLocation) {
          a.style.display = "none";
        } else {
          a.style.display = "";
          foundMatch = true;
        }
      }
      if (!foundMatch) {
        $("#404").style("display","");
      }
    };
    document.addEventListener("locationchange", handlePageChange);
});



