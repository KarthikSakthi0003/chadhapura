function flightFilteration() {
  if ($("#flights").find("button.btn-ticket-more").length !== 0) {
    sortFlights(true);
  }
  //Price Filter
  var minPrice = parseFloat($("#price-min").val());
  var maxPrice = parseFloat($("#price-max").val());
  //Duration Filter
  var minDuration = parseFloat($("#minDuration").val());
  var maxDuration = parseFloat($("#maxDuration").val());
  //Departur Filter
  var minDepart = parseFloat($("#min-depart").val());
  var maxDepart = parseFloat($("#max-depart").val());
  //Arival Filter
  var minArrive = parseFloat($("#min-arrive").val());
  var maxArrive = parseFloat($("#max-arrive").val());
  //Layover Filter
  var minLayover = parseFloat($("#min-layover").val());
  var maxLayover = parseFloat($("#max-layover").val());
  //checked Airlines
  var checked_airlines = $('input[name="airline"]:checked')
    .map(function () {
      return this.value;
    })
    .get();
  //Selected Stops
  var checked_stop = $('input[name="stop"]:checked')
    .map(function () {
      return this.value;
    })
    .get();
  //Selected Stops
  var checked_faretype = $('input[name="faretype"]:checked')
    .map(function () {
      return this.value;
    })
    .get();
  //Selected Stops
  var checked_outward_nearby = $('input[name="outward_nearby"]:checked')
    .map(function () {
      return this.value;
    })
    .get();
  //Selected Stops
  var checked_return_nearby = $('input[name="return_nearby"]:checked')
    .map(function () {
      return this.value;
    })
    .get();
  $(".flight-elem").each(function (index, el) {
    var segmentData = $(el).data();
    //Price Range Slider
    if (!(segmentData.price >= minPrice && segmentData.price <= maxPrice)) {
      $(el).hide();
      return true;
    }
    //Duration Range Slider
    if (
      !(
        segmentData.flightduration >= minDuration &&
        segmentData.flightduration <= maxDuration
      )
    ) {
      $(el).hide();
      return true;
    }

    //Depart Range Slider
    if (
      !(
        segmentData.departtime >= minDepart &&
        segmentData.departtime <= maxDepart
      )
    ) {
      $(el).hide();
      return true;
    }

    //Arrive Range Slider
    if (
      !(
        segmentData.arivaltime >= minArrive &&
        segmentData.arivaltime <= maxArrive
      )
    ) {
      $(el).hide();
      return true;
    }

    //Layover
    console.log(segmentData.layover);
    if (
      segmentData.layover > 0 &&
      !(segmentData.layover >= minLayover && segmentData.layover <= maxLayover)
    ) {
      $(el).hide();
      return true;
    }
    //List of Airlines
    if (
      checked_airlines.length > 0 &&
      $.inArray(segmentData.airlinecode, checked_airlines) === -1
    ) {
      $(el).hide();
      return true;
    }
    //Stops
    if (
      checked_stop.length > 0 &&
      $.inArray(segmentData.stops, checked_stop) === -1
    ) {
      $(el).hide();
      return true;
    }
    //Fare Type
    if (
      checked_faretype.length > 0 &&
      $.inArray(segmentData.faretype, checked_faretype) === -1
    ) {
      $(el).hide();
      return true;
    }
    //Outward Nearby
    if (
      $('input[name="outward_nearby"]').length &&
      !$.isEmptyObject(segmentData.outwardnearby)
    ) {
      // if filters exists
      var dataNearby = segmentData.outwardnearby.split("|");
      var common = $.grep(dataNearby, function (element) {
        return $.inArray(element, checked_outward_nearby) !== -1;
      });
      if (!(common.length > 0)) {
        $(el).hide();
        return true;
      }
      // && $.inArray(segmentData.faretype, checked_faretype) === -1
    }
    //Return Nearby
    if (
      $('input[name="return_nearby"]').length &&
      !$.isEmptyObject(segmentData.returnnearby)
    ) {
      // if filters exists
      var dataNearby = segmentData.returnnearby.split("|");
      var common = $.grep(dataNearby, function (element) {
        return $.inArray(element, checked_return_nearby) !== -1;
      });
      if (!(common.length > 0)) {
        $(el).hide();
        return true;
      }
      // && $.inArray(segmentData.faretype, checked_faretype) === -1
    }
    //If no filter Appilied Show element
    $(el).show();
  });
  //Change the total flight count
  var total = $("#flights").find(".flight-elem:visible").length;
  $("#total-search-flights").text(total);
  //Scroll To Top
  var tabtop = parseInt($("#flight-content").offset().top) - 50;
  $("html, body").animate({ scrollTop: tabtop }, 500);
}
//Sort Elements
function sortFlights(sortSimilar) {
  var orderBy = $("#sort-box").find(":checked").data("order");
  var orderElement = $("#sort-box").find(":checked").val();
  $("#sort-box .button").removeClass("active");
  $("#sort-box").find(":checked").next(".button").addClass("active");
  if (sortSimilar === true) {
    var listSelector = $("#flights section.flight-elem");
    $("#flights .btn-ticket-more,#flights .tickets-more-wrap").remove();
  } else {
    var listSelector = $("#flights .flight-elem-parent");
  }
  listSelector.sort(function (a, b) {
    var contentA = "",
      contentB = "";
    switch (orderElement) {
      case "price":
        contentA = parseInt($(a).data("price"));
        contentB = parseInt($(b).data("price"));
        break;
      case "name":
        contentA = $(a).data("airlinecode");
        contentB = $(b).data("airlinecode");
        break;
      case "departure":
        contentA = parseInt($(a).data("departtime"));
        contentB = parseInt($(b).data("departtime"));
        break;
      case "arrival":
        contentA = parseInt($(a).data("arivaltime"));
        contentB = parseInt($(b).data("arivaltime"));
        break;
      case "duration":
        contentA = parseInt($(a).data("flightduration"));
        contentB = parseInt($(b).data("flightduration"));
        break;
    }
    if (orderBy == "ASC") {
      return contentA < contentB ? -1 : contentA > contentB ? 1 : 0;
    } else {
      return contentA > contentB ? -1 : contentA < contentB ? 1 : 0;
    }
  });
  $("#flights").html(listSelector);
}
function ShowItinerary(divid) {
  if ($("#" + divid).hasClass("itinerary-details")) {
    console.log($("#" + divid).hasClass("itinerary-details"));
    $("#overlay").fadeOut(500);
  } else {
    $("#overlay").fadeIn(500);
  }
  $("#" + divid).toggleClass("itinerary-details");
  $("html, body").animate({ scrollTop: $("#" + divid).offset().top }, 500);
}
function ShowFares(divid) {
  if ($("#" + divid).hasClass("itinerary-details")) {
    console.log($("#" + divid).hasClass("itinerary-details"));
    $("#overlay").fadeOut(500);
  } else {
    $("#overlay").fadeIn(500);
  }
  $("#" + divid).toggleClass("itinerary-details");
  $("html, body").animate({ scrollTop: $("#" + divid).offset().top }, 500);
}
$("#overlay").on("click", function () {
  $(".itinerary-details").find(".view-details").click();
});
function loadAirline(url) {
  $.ajax({
    type: "GET",
    async: true,
    dataType: "json",
    url: url,
    beforeSend: function () {
      $("#progress-bar").fadeIn();
    },
    success: function (response) {
      $(".flights").removeClass("hide");
      renderListTemplate(response);
    },
    complete: function () {
      renderFilters();
      $(".progress").fadeOut();
      $(".loading-content").fadeOut();
    },
  });
}
var ajaxInProgress = false,
  filters = null;
$(document).ajaxStart(function () {
  $("#progress-bar").fadeIn();
  ajaxInProgress = true;
});
$(document).ajaxStop(function () {
  ajaxInProgress = false;
  renderFilters();
  $("#progress-bar").fadeOut();
  var flight_count = $(".item-result-wrap").length;
  if (flight_count == 0) {
    $(".loader-placeholder").addClass("loader-stop");
    $("#noresult").removeClass("hide");
  }
});
function renderListTemplate(response) {
  if (!$.isEmptyObject(response.flights) && response.flights.length > 0) {
    var source = $("#flight-list-block-tmpl").html();
    var template = Handlebars.compile(source);
    var htmlOutput = template(response);
    $("#flights").append(htmlOutput);
    //Total
    var total = $("#flights").find(".flight-elem").length;
    $("#total-search-flights").text(total);
    //Filters Data Show
    if (!$.isEmptyObject(response.filters)) {
      filters = response.filters;
    }
  }
}
function renderFilters() {
  if (!$.isEmptyObject(filters) && ajaxInProgress === false) {
    var source = $("#flight-filter-block-tmpl").html();
    var template = Handlebars.compile(source);
    var htmlOutput = template(filters);
    $("#filters-block").html(htmlOutput);
    //Sort By lowest price
    $("#sort-box").prop("disabled", false).selectpicker("refresh"); //.change()
    sortFlights(false); // Sort with first level elements only
    //Highlight the cheapest flight
    $("#flights .flight-elem .item-flight")
      .first()
      .addClass("ticket-highlight")
      .find(".ticket-highlight-info")
      .removeClass("hide");
    $("#flights .flight-elem .item-flight .flight_detail_item")
      .first()
      .addClass("cheapest_flight");
    $(
      "#flights .flight-elem .item-flight .flight_detail_item .select_seat_block"
    )
      .first()
      .addClass("hide");
    // show low price setter button
    $(".btn-price-alert").removeClass("hide");
    loadToolTips();
  }
}
function show_hide_similar_flights(that) {
  if ($(that).prev(".tickets-more-wrap").is(":visible")) {
    $(that).find("span").text("+");
  } else {
    $(that).find("span").text("-");
  }
  $(that).prev(".tickets-more-wrap").slideToggle();
}

var addToCartxhr;
function getAirpricing(
  id,
  origin,
  destination,
  onward_CityName,
  onward_toCityName,
  DepartureTime,
  ArrivalTime,
  trip_type
) {
  $("#origin").text(origin);
  $("#destination").text(destination);
  $("#onward_CityName").text(onward_CityName);
  $("#onward_toCityName").text(onward_toCityName);
  $("#DepartureTime").text(DepartureTime);
  $("#ArrivalTime").text(ArrivalTime);
  $("#trip_type_loader").text(trip_type);
  if (addToCartxhr && addToCartxhr.readyState !== 4) {
    addToCartxhr.abort();
  }
  addToCartxhr = $.ajax({
    url: myconfig.site_url + "flights/flight/AddToCart",
    type: "POST",
    global: false,
    data: $('form[name="flight_segmentform_' + id + '"]').serializeArray(),
    beforeSend: function () {
      $("#faremodel").modal({
        backdrop: "static",
        keyboard: false,
        show: true,
      });
    },
    success: function (data, textStatus, jqXHR) {
      window.location = data;
    },
    complete: function () {
      $("#faremodel").modal("toggle");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#simple-msg").html(
        '<pre><code class="prettyprint">AJAX Request Failed<br/> textStatus=' +
          textStatus +
          ", errorThrown=" +
          errorThrown +
          "</code></pre>"
      );
    },
  });
  return false;
}

function getPackageAirpricing(
  id,
  origin,
  destination,
  onward_CityName,
  onward_toCityName,
  DepartureTime,
  ArrivalTime,
  trip_type
) {
  $("#origin").text(origin);
  $("#destination").text(destination);
  $("#onward_CityName").text(onward_CityName);
  $("#onward_toCityName").text(onward_toCityName);
  $("#DepartureTime").text(DepartureTime);
  $("#ArrivalTime").text(ArrivalTime);
  $("#trip_type_loader").text(trip_type);
  if (addToCartxhr && addToCartxhr.readyState !== 4) {
    addToCartxhr.abort();
  }
  addToCartxhr = $.ajax({
    url: myconfig.site_url + "holidays/holidays/flightAddToCart",
    type: "POST",
    global: false,
    data: $('form[name="flight_segmentform_' + id + '"]').serializeArray(),
    beforeSend: function () {
      $("#faremodel").modal({
        backdrop: "static",
        keyboard: false,
        show: true,
      });
    },
    success: function (data, textStatus, jqXHR) {
      window.location = data;
    },
    complete: function () {
      $("#faremodel").modal("toggle");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#simple-msg").html(
        '<pre><code class="prettyprint">AJAX Request Failed<br/> textStatus=' +
          textStatus +
          ", errorThrown=" +
          errorThrown +
          "</code></pre>"
      );
    },
  });
  return false;
}

function getAirpricing_multi(
  id,
  origin,
  destination,
  onward_CityName,
  onward_toCityName,
  DepartureTime,
  LastDepartureTime,
  trip_type
) {
  $("#origin").text(origin);
  $("#destination").text(destination);
  $("#onward_CityName").text(onward_CityName);
  $("#onward_toCityName").text(onward_toCityName);
  $("#DepartureTime").text(DepartureTime);
  $("#ArrivalTime").text(LastDepartureTime);
  $("#trip_type_loader").text(trip_type);
  if (addToCartxhr && addToCartxhr.readyState !== 4) {
    addToCartxhr.abort();
  }
  addToCartxhr = $.ajax({
    url: myconfig.site_url + "flight/AddToCart",
    type: "POST",
    global: false,
    data: $('form[name="flight_segmentform_' + id + '"]').serializeArray(),
    beforeSend: function () {
      $("#faremodel").modal({
        backdrop: "static",
        keyboard: false,
        show: true,
      });
    },
    success: function (data, textStatus, jqXHR) {
      window.location = data;
    },
    complete: function () {
      $("#faremodel").modal("toggle");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#simple-msg").html(
        '<pre><code class="prettyprint">AJAX Request Failed<br/> textStatus=' +
          textStatus +
          ", errorThrown=" +
          errorThrown +
          "</code></pre>"
      );
    },
  });
  return false;
}
function getAirpricing_baggage(
  id,
  origin,
  destination,
  onward_CityName,
  onward_toCityName,
  DepartureTime,
  ArrivalTime
) {
  if (addToCartxhr && addToCartxhr.readyState !== 4) {
    addToCartxhr.abort();
  }
  $("#pieces_baggage_icon_" + id).removeClass("hide");
  addToCartxhr = $.ajax({
    url: myconfig.site_url + "flights/flight/GetBaggage",
    type: "POST",
    async: true,
    dataType: "json",
    global: false,
    data: $('form[name="flight_segmentform_' + id + '"]').serializeArray(),
    success: function (data, textStatus, jqXHR) {
      $("#pieces_baggage_icon_" + id).addClass("hide");
      if (data.BagDetails != "No") {
        $("#pieces_baggage_" + id).removeClass("hide");
        $("#pieces_baggage_" + id).text(data.BagDetails);
        if (data.outward != "") {
          $("#pieces_baggage_" + id).removeClass("hide");
        }
        if (data.return != "") {
          $("#pieces_baggage_" + id).removeClass("hide");
        }
      }

      if (data.Change_amount != "" || data.Change_amount !== null) {
        $(".change_" + id).text(data.Change_amount);
      }
      if (data.Cancel_amount != "" || data.Cancel_amount !== null) {
        $(".cancel_" + id).text(data.Cancel_amount);
      }

      if (data.Change_Penalty != "No") {
        $(".change_penalty_" + id).text(data.Change_Penalty);
      }
      if (data.Cancel_Penalty != "No") {
        $(".cancel_penalty_" + id).text(data.Cancel_Penalty);
      }

      if (data.outward != "") {
        $(".outward_baggage_" + id).text(data.outward);
      }
      if (data.return != "") {
        $(".return_baggage_" + id).text(data.return);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#simple-msg").html(
        '<pre><code class="prettyprint">AJAX Request Failed<br/> textStatus=' +
          textStatus +
          ", errorThrown=" +
          errorThrown +
          "</code></pre>"
      );
    },
  });
  return false;
}

function saveAlert() {
  var frmalertmodal = $("#frmalertmodal").serialize();
  var user = $("[name=alert_name]").val();
  $.post(
    myconfig.site_url + "flights/apt/alertme",
    { ser: frmalertmodal },
    function (res) {
      //$('#block_email_notify').hide();
      //$('#overlay').hide();
      if (res.success == 1) {
        $("#alert_msg").removeClass("hide");
        $("#alert_msg")
          .text(
            "Hi " +
              user +
              ", Your alert has been created. We'll send you an email when prices change. Thank You."
          )
          .show()
          .delay(1500)
          .slideUp({
            duration: 2000,
          });
        // alert("Hi" + user + ", \n\n Your email has saved in our server, We will contact you.\n\nThank You.");
      } else {
        $("#alert_msg").removeClass("hide");
        $("#alert_msg")
          .text(
            "Hi " +
              user +
              ", \n\n Sorry email has failed to save in our server. Please try again later."
          )
          .show()
          .delay(1500)
          .slideUp({
            duration: 2000,
          });
      }
    },
    "json"
  );
}

function getChangeBooking(
  arrayIndex,
  encoded_request,
  PlatingCarrier,
  Unique_Key,
  TotalPrice_API,
  Info
) {
  if (addToCartxhr && addToCartxhr.readyState !== 4) {
    addToCartxhr.abort();
  }
  var details = {
    ID: arrayIndex,
    Request: encoded_request,
    PlatingCarrier: PlatingCarrier,
    Unique_Key: Unique_Key,
    TotalPrice_API: TotalPrice_API,
    Info: Info,
  };
  addToCartxhr = $.ajax({
    url: "/flights/changebookingclass/getFlightBookingcodes",
    type: "POST",
    global: false,
    data: details,
    beforeSend: function () {
      $("#review_content").html(
        '<div class="text-center"><i class="fa fa-spinner fa-spin"></i></div>'
      );
      $("#AirpricingNewBookingCode").html("");
    },
    success: function (data, textStatus, jqXHR) {
      $("#review_content").html(data);
    },
    complete: function () {},
    error: function (jqXHR, textStatus, errorThrown) {
      $("#simple-msg").html(
        '<pre><code class="prettyprint">AJAX Request Failed<br/> textStatus=' +
          textStatus +
          ", errorThrown=" +
          errorThrown +
          "</code></pre>"
      );
    },
  });
  return false;
}

var addToCartxhr;
function submitChangeBookingCode(id) {
  if (addToCartxhr && addToCartxhr.readyState !== 4) {
    addToCartxhr.abort();
  }
  addToCartxhr = $.ajax({
    url: myconfig.site_url + "flights/changebookingclass/AirPricingBookingCode",
    type: "POST",
    global: false,
    data: $('form[name="changebookingcode-form-' + id + '"]').serializeArray(),
    beforeSend: function () {
      $(".changebookingcode-loader").removeClass("hide");
    },
    success: function (data, textStatus, jqXHR) {
      //window.location = data;AirpricingNewBookingCode
      $("#AirpricingNewBookingCode").html(data);
    },
    complete: function () {
      $(".changebookingcode-loader").addClass("hide");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#simple-msg").html(
        '<pre><code class="prettyprint">AJAX Request Failed<br/> textStatus=' +
          textStatus +
          ", errorThrown=" +
          errorThrown +
          "</code></pre>"
      );
    },
  });
  return false;
}

function submitAddtocartBookingClass(id, api) {
  if (addToCartxhr && addToCartxhr.readyState !== 4) {
    addToCartxhr.abort();
  }

  if (api == "Saber") {
    var URL = "flights/flight/AddToCart";
  } else {
    var URL = "flights/changebookingclass/AddToCartBookingClass";
  }
  addToCartxhr = $.ajax({
    url: myconfig.site_url + URL,
    type: "POST",
    global: false,
    data: $(
      'form[name="addtocartbookingcode-form-' + id + '"]'
    ).serializeArray(),
    beforeSend: function () {
      $(".airpricingbookingcode-loader").removeClass("hide");
    },
    success: function (data, textStatus, jqXHR) {
      window.location = data;
    },
    complete: function () {
      $(".airpricingbookingcode-loader").addClass("hide");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#simple-msg").html(
        '<pre><code class="prettyprint">AJAX Request Failed<br/> textStatus=' +
          textStatus +
          ", errorThrown=" +
          errorThrown +
          "</code></pre>"
      );
    },
  });
  return false;
}

$(document).ready(function () {
  $("#frmalertmodal")
    .validator({
      disable: true,
      focus: false,
    })
    .on("submit", function (e) {
      if (e.isDefaultPrevented()) {
        // handle the invalid form...
        return false;
      } else {
        // everything looks good!
        saveAlert();
        return false;
      }
    });

  $(".search_mb_sidebar a").on("click", function (e) {
    e.preventDefault();
    $("body").addClass("search_side_active");
  });
  $(document).on("click", "body", function (e) {
    var tag = $(".search_mb_sidebar a,.search_sidebar_block");
    if (!tag.is(e.target) && tag.has(e.target).length === 0) {
      $("body").removeClass("search_side_active");
    }
  });
});
