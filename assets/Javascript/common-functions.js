function mail_hotel_voucher(that, pnr) {
  $.ajax({
    type: "GET",
    async: false,
    dataType: "json",
    url: myconfig.site_url + "hotel/mail-voucher/" + pnr,
    beforeSend: function () {
      $(that).prop("disabled", true);
      $(that).find(".spin-loader").removeClass("hide");
    },
    success: function () {},
    complete: function () {
      $(that).prop("disabled", false);
      $(that).find(".spin-loader").addClass("hide");
      show_footer_success("Email has been sent.");
    },
  });
}

function mail_mail_invoice(that, pnr) {
  $.ajax({
    type: "GET",
    async: false,
    dataType: "json",
    url: myconfig.site_url + "hotel/mail-invoice/" + pnr,
    beforeSend: function () {
      $(that).prop("disabled", true);
      $(that).find(".spin-loader").removeClass("hide");
    },
    success: function () {},
    complete: function () {
      $(that).prop("disabled", false);
      $(that).find(".spin-loader").addClass("hide");
      show_footer_success("Email has been sent.");
    },
  });
}

function fill_traveler_block(tid, that) {
  var data = $(that).find(":selected").val();

  if (data != "") {
    var json = JSON.parse(data);
    if (typeof json.title != "undefined" && json.title) {
      $("#" + tid + " .title")
        .val(json.title.toString())
        .change();
    }
    if (typeof json.first_name != "undefined" && json.first_name) {
      $("#" + tid + " .first_name")
        .val(json.first_name)
        .keyup();
    }

    if (typeof json.last_name != "undefined" && json.last_name) {
      $("#" + tid + " .last_name")
        .val(json.last_name)
        .keyup();
    }

    if (typeof json.dob != "undefined" && json.dob) {
      var dobArray = json.dob.split("-");
      //alert(dobArray[2]);
      $("#" + tid + " .day")
        .val(dobArray[0].toString())
        .change();
      $("#" + tid + " .month")
        .val(dobArray[1].toString())
        .change();
      $("#" + tid + " .year")
        .val(dobArray[2].toString())
        .change();
    }
    if (typeof json.passport_expiry != "undefined" && json.passport_expiry) {
      var dobArray = json.passport_expiry.split("-");
      $("#" + tid + " .passday")
        .val(dobArray[0].toString())
        .change();
      $("#" + tid + " .passmonth")
        .val(dobArray[1].toString())
        .change();
      $("#" + tid + " .passyear")
        .val(dobArray[2].toString())
        .change();
    }

    if (typeof json.country != "undefined" && json.country) {
      $("#" + tid + " .country")
        .val(json.country.toString())
        .change();
    }

    if (typeof json.passport_country != "undefined" && json.passport_country) {
      $("#" + tid + " .passport_country")
        .val(json.passport_country.toString())
        .change();
    }
    if (typeof json.passport_no != "undefined" && json.passport_no) {
      $("#" + tid + " .passport_no")
        .val(json.passport_no.toString())
        .change();
    }
  }
}

function mail_car_voucher(that, pnr) {
  $.ajax({
    type: "GET",
    async: false,
    dataType: "json",
    url: myconfig.site_url + "/car/mail-voucher/" + pnr,
    beforeSend: function () {
      $(that).prop("disabled", true);
      $(that).find(".spin-loader").removeClass("hide");
    },
    success: function () {},
    complete: function () {
      $(that).prop("disabled", false);
      $(that).find(".spin-loader").addClass("hide");
      show_footer_success("Email has been sent.");
    },
  });
}

function mail_transfer_voucher(that, pnr) {
  $.ajax({
    type: "GET",
    async: false,
    dataType: "json",
    url: myconfig.site_url + "transfer/transfer_mail_voucher/" + pnr,
    beforeSend: function () {
      $(that).prop("disabled", true);
      $(that).find(".spin-loader").removeClass("hide");
    },
    success: function () {},
    complete: function () {
      $(that).prop("disabled", false);
      $(that).find(".spin-loader").addClass("hide");
      show_footer_success("Email has been sent.");
    },
  });
}

function mail_car_invoice(that, pnr) {
  $.ajax({
    type: "GET",
    async: false,
    dataType: "json",
    url: myconfig.site_url + "/car/mail-invoice/" + pnr,
    beforeSend: function () {
      $(that).prop("disabled", true);
      $(that).find(".spin-loader").removeClass("hide");
    },
    success: function () {},
    complete: function () {
      $(that).prop("disabled", false);
      $(that).find(".spin-loader").addClass("hide");
      show_footer_success("Email has been sent.");
    },
  });
}

function show_footer_success(msg) {
  $("#success_footer").show().delay(6000).fadeOut().find("span").text(msg);
}

function show_footer_error(msg) {
  $("#error_footer").show().delay(6000).fadeOut().find("span").text(msg);
}

function mail_flight_voucher(that, pnr) {
  $.ajax({
    type: "GET",
    async: false,
    dataType: "json",
    url: myconfig.site_url + "flight/flight_mail_voucher/" + pnr,
    beforeSend: function () {
      $(that).prop("disabled", true);
      $(that).find(".spin-loader").removeClass("hide");
    },
    success: function () {},
    complete: function () {
      $(that).prop("disabled", false);
      $(that).find(".spin-loader").addClass("hide");
      show_footer_success("Email has been sent.");
    },
  });
}

function mail_package_voucher(that, pnr) {
  $.ajax({
    type: "GET",
    async: false,
    dataType: "json",
    url: myconfig.site_url + "holidays/mail_voucher/" + pnr,
    beforeSend: function () {
      $(that).prop("disabled", true);
      $(that).find(".spin-loader").removeClass("hide");
    },
    success: function () {},
    complete: function () {
      $(that).prop("disabled", false);
      $(that).find(".spin-loader").addClass("hide");
      show_footer_success("Email has been sent.");
    },
  });
}

function mail_insurance_voucher(that, order) {
  $.ajax({
    type: "GET",
    async: false,
    dataType: "json",
    url: myconfig.site_url + "insurance/insurance_mail_voucher/" + order,
    beforeSend: function () {
      $(that).prop("disabled", true);
      $(that).find(".spin-loader").removeClass("hide");
    },
    success: function () {},
    complete: function () {
      $(that).prop("disabled", false);
      $(that).find(".spin-loader").addClass("hide");
      show_footer_success("Email has been sent.");
    },
  });
}

function mail_visa_voucher(that, order) {
  $.ajax({
    type: "GET",
    async: false,
    dataType: "json",
    url: myconfig.site_url + "/visa/visa_mail_voucher/" + order,
    beforeSend: function () {
      $(that).prop("disabled", true);
      $(that).find(".spin-loader").removeClass("hide");
    },
    success: function () {},
    complete: function () {
      $(that).prop("disabled", false);
      $(that).find(".spin-loader").addClass("hide");
      show_footer_success("Email has been sent.");
    },
  });
}

function openTabs(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
//document.getElementById("defaultOpen").click();

$(".accordion__header").click(function (e) {
  e.preventDefault();
  var currentIsActive = $(this).hasClass("is-active");
  $(this).parent(".accordion").find("> *").removeClass("is-active");
  if (currentIsActive != 1) {
    $(this).addClass("is-active");
    $(this).next(".accordion__body").addClass("is-active");
  }
});

$(document).ready(function () {
  $(".click1").click(function () {
    $(".image11").addClass("hide");
    var id = $(this).attr("data-id");

    $("#" + id).removeClass("hide");
  });

  $(".table_responsive").DataTable({
    responsive: true,
    pageLength: 100,
    dom: "Bfrtip",
  });
});

function getInfo() {
  var option = $("#mySelect").val();
  var adults = parseInt($("#adults").val());
  var childs = parseInt($("#childs").val());

  var selectArray = option.split(",");
  var totalprice =
    parseInt(selectArray[1]) * adults + parseInt(selectArray[2]) * childs;
  $("#price").text(totalprice);
}

$(".scroll-btn").click(function () {
  $(".vendodr-lt-screen.vendodr-left-screen").toggleClass("vendor-slide");
});
