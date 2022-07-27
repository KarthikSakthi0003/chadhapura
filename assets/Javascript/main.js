"use strict";

/* Datepicker Settings*/
var dpMonths = myconfig.mobile === 1 ? 1 : 2;
var dpDateFormat = "dd-mm-yy";

///*Tool tip*/
loadToolTips();
function loadToolTips() {
  $('[data-toggle="tooltip"]').tooltip();

  $(".htmltooltip").popover({
    placement: "bottom",
    container: "body",
    trigger: "hover", //comment this to work on click
    html: true,
    content: function () {
      return $(this).next(".popper-content").html();
    },
  });
}
function reloadWindowPopup(time) {
  //Time in Seconds
  var milisec = ($.isNumeric(time) ? time : 1800) * 1000; //Converting Seconds in miliseconds
  setInterval(function () {
    $("#session_expire").modal({
      backdrop: "static",
      keyboard: false,
      show: true,
    });
  }, milisec);
}
// intialized for round trip
var fromFlightSelector = $("#one-round-block .from-date");
var toFlightSelector = $("#one-round-block .to-date");
initialize_fancydatepicker_roundway(fromFlightSelector, toFlightSelector);
function initialize_fancydatepicker_roundway(
  fromFlightSelector,
  toFlightSelector
) {
  if (fromFlightSelector.length && toFlightSelector.length) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var fromDateDefault =
      fromFlightSelector.val() == ""
        ? new Date()
        : new Date(
            $.datepicker.parseDate(dpDateFormat, fromFlightSelector.val())
          );
    var toDateDefault =
      toFlightSelector.val() == ""
        ? tomorrow
        : new Date(
            $.datepicker.parseDate(dpDateFormat, toFlightSelector.val())
          );

    fromFlightSelector
      .datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        numberOfMonths: dpMonths,
        dateFormat: dpDateFormat,
        minDate: 0,
        showButtonPanel: true,
        closeText: " Close ",
        onSelect: function (s, inst) {
          //Popolate Date in from datepicker
          var dateval = new Date(
            inst.selectedYear,
            inst.selectedMonth,
            inst.selectedDay
          );
          populateDate($(this), dateval);
          //set the minimum limit for to datepicker
          to.datepicker("option", "minDate", dateval);
          //Popolate Date in to datepicker , one day ahead to from date
          tomorrow.setDate(dateval.getDate() + 1);
          to.datepicker("setDate", tomorrow);
          //populate the date in to datepicker
          populateDate(
            toFlightSelector,
            toFlightSelector.datepicker("getDate")
          );
        },
        beforeShow: function () {
          setTimeout(function () {
            $(".ui-datepicker").css("z-index", 10);
          }, 0);
        },
        onClose: function () {
          if (toFlightSelector.is(":visible")) {
            toFlightSelector.datepicker("show");
          }
        },
      })
      .datepicker("setDate", fromDateDefault);

    var to = toFlightSelector
      .datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        numberOfMonths: dpMonths,
        dateFormat: dpDateFormat,
        minDate: fromDateDefault,
        showButtonPanel: true,
        closeText: " Close ",
        onSelect: function (s, inst) {
          var dateval = new Date(
            inst.selectedYear,
            inst.selectedMonth,
            inst.selectedDay
          );
          populateDate($(this), dateval);
        },
        beforeShow: function () {
          setTimeout(function () {
            $(".ui-datepicker").css("z-index", 10);
          }, 0);
        },
      })
      .datepicker("setDate", toDateDefault);

    populateDate(fromFlightSelector, fromDateDefault);
    populateDate(toFlightSelector, toDateDefault);
  }
}

// intialized for Multicity Trip
var fromFlightSelector = $("#multi-block .from-date");
initialize_fancydatepicker_multi(fromFlightSelector);
function initialize_fancydatepicker_multi(fromFlightSelector) {
  if (fromFlightSelector.length) {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    fromFlightSelector.each(function (index, element) {
      var that = $(this);
      var fromDateDefault =
        that.val() == ""
          ? today
          : new Date($.datepicker.parseDate(dpDateFormat, that.val()));
      $(this)
        .datepicker({
          showOtherMonths: true,
          selectOtherMonths: true,
          numberOfMonths: dpMonths,
          dateFormat: dpDateFormat,
          minDate: 0,
          onSelect: function (s, inst) {
            var dateval = new Date(
              inst.selectedYear,
              inst.selectedMonth,
              inst.selectedDay
            );
            populateDate($(this), dateval);
          },
          beforeShow: function () {
            setTimeout(function () {
              $(".ui-datepicker").css("z-index", 10);
            }, 0);
          },
        })
        .datepicker("setDate", fromDateDefault);

      populateDate(that, fromDateDefault);
    });
  }
}

// intialized for Yacht
var fromFlightSelector = $("#yacht-block .from-date");
initialize_fancydatepicker_multi(fromFlightSelector);
function initialize_fancydatepicker_multi(fromFlightSelector) {
  if (fromFlightSelector.length) {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    fromFlightSelector.each(function (index, element) {
      var that = $(this);
      var fromDateDefault =
        that.val() == ""
          ? today
          : new Date($.datepicker.parseDate(dpDateFormat, that.val()));
      $(this)
        .datepicker({
          showOtherMonths: true,
          selectOtherMonths: true,
          numberOfMonths: dpMonths,
          dateFormat: dpDateFormat,
          minDate: 0,
          onSelect: function (s, inst) {
            var dateval = new Date(
              inst.selectedYear,
              inst.selectedMonth,
              inst.selectedDay
            );
            populateDate($(this), dateval);
          },
          beforeShow: function () {
            setTimeout(function () {
              $(".ui-datepicker").css("z-index", 10);
            }, 0);
          },
        })
        .datepicker("setDate", fromDateDefault);

      populateDate(that, fromDateDefault);
    });
  }
}

// intialized for Insurance
var fromInsuranceSelector = $("#insurance-block .from-date");
var toInsuranceSelector = $("#insurance-block .to-date");
initialize_fancydatepicker_insurance(
  fromInsuranceSelector,
  toInsuranceSelector
);
function initialize_fancydatepicker_insurance(fromSelector, toSelector) {
  if (fromSelector.length && toSelector.length) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var fromDateDefault =
      fromSelector.val() == ""
        ? new Date()
        : new Date($.datepicker.parseDate(dpDateFormat, fromSelector.val()));
    var toDateDefault =
      toSelector.val() == ""
        ? tomorrow
        : new Date($.datepicker.parseDate(dpDateFormat, toSelector.val()));

    fromSelector
      .datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        numberOfMonths: dpMonths,
        dateFormat: dpDateFormat,
        minDate: 0,
        //            showButtonPanel: true,
        //            closeText: " Close ",
        onSelect: function (s, inst) {
          //Popolate Date in from datepicker
          var dateval = new Date(
            inst.selectedYear,
            inst.selectedMonth,
            inst.selectedDay
          );
          populateDate($(this), dateval);

          //Popolate Date in to datepicker , one day ahead to from date
          tomorrow.setDate(dateval.getDate() + 1);
          //                to.datepicker("setDate", tomorrow);
          //set the minimum limit for to datepicker
          to.datepicker("option", "minDate", tomorrow);
          //populate the date in to datepicker
          populateDate(toSelector, toSelector.datepicker("getDate"));
        },
        beforeShow: function () {
          setTimeout(function () {
            $(".ui-datepicker").css("z-index", 10);
          }, 0);
        },
        onClose: function () {
          if (toSelector.is(":visible")) {
            toSelector.datepicker("show");
          }
        },
      })
      .datepicker("setDate", fromDateDefault);

    var to = toSelector
      .datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        numberOfMonths: dpMonths,
        dateFormat: dpDateFormat,
        minDate: toDateDefault,
        //            showButtonPanel: true,
        //            closeText: " Close ",
        onSelect: function (s, inst) {
          var dateval = new Date(
            inst.selectedYear,
            inst.selectedMonth,
            inst.selectedDay
          );
          populateDate($(this), dateval);
        },
        beforeShow: function () {
          setTimeout(function () {
            $(".ui-datepicker").css("z-index", 10);
          }, 0);
        },
      })
      .datepicker("setDate", toDateDefault);

    populateDate(fromSelector, fromDateDefault);
    populateDate(toSelector, toDateDefault);
  }
}

// Populate Dates in divs near to datepicker
function populateDate(element, dateObj) {
  var day = ("0" + dateObj.getDate()).slice(-2); //dateObj.getDate();
  var month = $.datepicker.formatDate("M", dateObj);
  var year = dateObj.getFullYear();
  element.siblings(".datetime").find(".day").text(day);
  element.siblings(".datetime").find(".month").text(month);
  element.siblings(".datetime").find(".year").text(year);
  //day Name added
  var dayName = $.datepicker.formatDate("D", dateObj);
  element.siblings(".datetime").find(".dayname").text(dayName);
}

$(".number-spinner-flight,.number-spinner-insurance").click(function (e) {
  var that = this;
  e.preventDefault();
  var fieldName = $(that).attr("data-field");
  var type = $(that).attr("data-type");
  var input = $(that)
    .closest(".input-group")
    .find("input[name='" + fieldName + "']");
  var currentVal = parseInt(input.val());
  /* Fields Count*/
  var passenger_dropdown = $(that).closest(".passenger-dropdown");
  var adult = passenger_dropdown.find("input[name='adult_count']").val();
  var child = passenger_dropdown.find("input[name='child_count']").val();
  var infant = passenger_dropdown.find("input[name='infant_count']").val();
  var total = parseInt(adult) + parseInt(child) + parseInt(infant);
  if (!isNaN(currentVal)) {
    if (type == "minus") {
      var minValue = parseInt(input.attr("min"));
      minValue = !minValue ? 0 : minValue;
      if (currentVal > minValue) {
        input.val(currentVal - 1).change();
      }
      if (parseInt(input.val()) == minValue) {
        $(that).attr("disabled", true);
      }
    } else if (type == "plus") {
      var maxValue = parseInt(input.attr("max"));
      maxValue = !maxValue ? 999 : maxValue;
      if (currentVal < maxValue && total < 9) {
        input.val(currentVal + 1).change();
      }
      if (parseInt(input.val()) == maxValue) {
        $(that).attr("disabled", true);
      }
    }
  } else {
    input.val(0);
  }
});
$(".spinner-value-flight").on("change paste keyup", function () {
  var minValue = parseInt($(this).attr("min"));
  var maxValue = parseInt($(this).attr("max"));
  minValue = !minValue ? 0 : minValue;
  maxValue = !maxValue ? 999 : maxValue;

  var valueCurrent = parseInt($(this).val());
  var parent = $(this).closest(".select-wrap");
  var name = $(this).attr("name");
  if (valueCurrent >= minValue) {
    parent
      .find(
        ".number-spinner-flight[data-type='minus'][data-field='" + name + "']"
      )
      .removeAttr("disabled");
  } else {
    $(this).val($(this).data("oldValue"));
  }
  if (valueCurrent <= maxValue) {
    parent
      .find(
        ".number-spinner-flight[data-type='plus'][data-field='" + name + "']"
      )
      .removeAttr("disabled");
  } else {
    alert("Sorry, the maximum value was reached");
    $(this).val($(this).data("oldValue"));
  }

  var passenger_dropdown = $(this).closest(".passenger-dropdown");
  var adult = passenger_dropdown.find("input[name='adult_count']").val();
  var child = passenger_dropdown.find("input[name='child_count']").val();
  var infant = passenger_dropdown.find("input[name='infant_count']").val();
  var total = parseInt(adult) + parseInt(child) + parseInt(infant);
  if (infant > adult) {
    infant = adult;
    total = parseInt(adult) + parseInt(child) + parseInt(infant);
    passenger_dropdown.find("input[name='infant_count']").val(infant).change();
  }
  parent.find(".passenger-count").text(total);
});

// ------------------------------------ Start: insurance ---------------------------
$(".spinner-value-insurance").on("change paste keyup", function () {
  var minValue = parseInt($(this).attr("min"));
  var maxValue = parseInt($(this).attr("max"));
  minValue = !minValue ? 0 : minValue;
  maxValue = !maxValue ? 999 : maxValue;

  var valueCurrent = parseInt($(this).val());
  var parent = $(this).closest(".select-wrap");
  var name = $(this).attr("name");
  if (valueCurrent >= minValue) {
    parent
      .find(
        ".number-spinner-insurance[data-type='minus'][data-field='" +
          name +
          "']"
      )
      .removeAttr("disabled");
  } else {
    $(this).val($(this).data("oldValue"));
  }
  if (valueCurrent <= maxValue) {
    parent
      .find(
        ".number-spinner-insurance[data-type='plus'][data-field='" + name + "']"
      )
      .removeAttr("disabled");
  } else {
    alert("Sorry, the maximum value was reached");
    $(this).val($(this).data("oldValue"));
  }

  var passenger_dropdown = $(this).closest(".passenger-dropdown");
  var adult = passenger_dropdown.find("input[name='adult_count']").val();
  var child = passenger_dropdown.find("input[name='child_count']").val();
  var infant = passenger_dropdown.find("input[name='infant_count']").val();
  if (infant > adult) {
    infant = adult;
    passenger_dropdown.find("input[name='infant_count']").val(infant).change();
  }
  var parent = $(this).closest(".select-wrap");
  if (parent.find(".passenger-type-wrap").length) {
    parent.find("#adult-count").text(parseInt(adult));
    parent.find("#child-count").text(parseInt(child));
    parent.find("#infant_count").text(parseInt(infant));
  }
});
// ------------------------------------ END: insurance ---------------------------

$(document).ready(function () {
  var selector = "input.autocomplete-carlocations";
  $(document).on("keydown.autocomplete", selector, function () {
    $(this)
      .autocomplete({
        source: myconfig.site_url + "/autocomplete/get_carLocations",
        minLength: 2, //search after two characters
        autoFocus: true, // first item will automatically be focused
        select: function (event, ui) {
          if (event.keyCode !== 9) {
            var tabindex = parseInt($(this).attr("tabindex"));
            if (tabindex >= 0) {
              tabindex = tabindex + 1;
              $(this)
                .closest("form")
                .find("[tabindex=" + tabindex + "]")
                .focus();
            }
          }
        },
        change: function (event, ui) {
          if (!ui.item) {
            this.value = "";
          } else {
            // return your label here
          }
        },
      })
      .autocomplete("instance")._renderItem = function (ul, item) {
      return $("<li></li>")
        .append(
          "<div><span>" +
            item.name +
            ", </span>" +
            "<span>" +
            item.city +
            '</span><span class="hotel-count">' +
            item.country +
            "</span></div>"
        )
        .appendTo(ul);
    };
  });
  //////////////////////// jQUery UI datepicker
  $(".datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
    numberOfMonths: 1,
    dateFormat: "dd-mm-yy",
  });

  //Auto Complete field selection on click
  $(
    ".autocomplete-airports,.hotel_autocomplete,.autocomplete-carlocations,.autocomplete-provider"
  )
    .on("click focus", function () {
      $(this).select();
    })
    .keyup(function (e) {
      //        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
      //            $(this).select();
      //        }
    })
    .bind("paste", function (e) {
      e.preventDefault();
    });
});

$(document).ready(function () {
  //Hotel Autocomplete
  var cache = {};
  $.widget("custom.catcomplete", $.ui.autocomplete, {
    _create: function () {
      this._super();
      this.widget().menu(
        "option",
        "items",
        "> :not(.ui-autocomplete-category)"
      );
    },
    _renderMenu: function (ul, items) {
      var currentCategory = "";
      $.each(items, function (index, item) {
        var li;
        var html;
        switch (item.category) {
          case "Location":
            var badge = item.popular
              ? '&nbsp;&nbsp;<span class="badge badge-square">' +
                item.popular +
                "</span>"
              : "";
            html =
              "<div>" +
              item.name +
              badge +
              "</div>" +
              "<span>" +
              item.country +
              "</span>" +
              '<span class="hotel-count">' +
              item.highlight +
              "</span>";
            if (item.category != currentCategory) {
              ul.append(
                "<li class='ui-autocomplete-category'>" +
                  "<i class='fa fa-map-marker'></i>" +
                  item.category +
                  "</li>"
              );
              currentCategory = item.category;
            }
            break;
          case "Hotel":
            html =
              "<div>" +
              item.name +
              "</div>" +
              "<span>" +
              item.city +
              ",</span>" +
              "<span>" +
              item.country +
              "</span>" +
              '<span class="hotel-count">' +
              item.highlight +
              "</span>";
            if (item.category != currentCategory) {
              ul.append(
                "<li class='ui-autocomplete-category'>" +
                  "<i class='fa fa-hotel'></i>" +
                  item.category +
                  "</li>"
              );
              currentCategory = item.category;
            }
            break;
          case "Top Destinations":
            html =
              "<div>" +
              item.name +
              "</div>" +
              "<span>" +
              item.country +
              "</span>" +
              '<span class="hotel-count">' +
              item.highlight +
              "</span>";
            if (item.category != currentCategory) {
              ul.append(
                "<li class='ui-autocomplete-category'>" +
                  item.category +
                  "</li>"
              );
              currentCategory = item.category;
            }
            break;
        }
        li = $("<li></li>")
          .data("ui-autocomplete-item", item)
          .append("<div class='hlocationload'>" + html + "</div>")
          .appendTo(ul);

        if (item.category) {
          li.attr("aria-label", item.category + " : " + item.label);
        }
      });
    },
  });
  $("input.hotel_autocomplete")
    .catcomplete({
      delay: 0,
      minLength: 0,
      source: function (request, response) {
        var term = request.term;
        if (term in cache) {
          response(cache[term]);
          return;
        }
        $.getJSON(
          myconfig.site_url + "autocomplete/get_hotel_cities",
          request,
          function (data, status, xhr) {
            cache[term] = data;
            response(data);
          }
        );
      },
      select: function (event, ui) {
        $(this).next("input[name='target_search']").val(ui.item.id);
        if (ui.item.category !== "Hotel") {
          saveRecentSearch({ id: ui.item.id, value: ui.item.value });
        }
        if (event.keyCode !== 9) {
          var tabindex = parseInt($(this).attr("tabindex"));
          if (tabindex >= 0) {
            tabindex = tabindex + 1;
            $(this)
              .closest("form")
              .find("[tabindex=" + tabindex + "]")
              .focus();
          }
        }
      },
    })
    .focus(function () {
      if (this.value == "") {
        $(this).catcomplete("search", "");
      }
    });

  /* Recent Searchs */
  loadRecentSearch();
  function saveRecentSearch(location) {
    var hotel_cookie_array = $.cookie("hotel-recent-search")
      ? $.parseJSON($.cookie("hotel-recent-search"))
      : [];
    //Remove from existing list
    hotel_cookie_array = hotel_cookie_array.filter(function (elem, pos) {
      return elem.id !== location.id;
    });
    hotel_cookie_array.unshift(location);
    hotel_cookie_array.splice(3);
    $.cookie("hotel-recent-search", JSON.stringify(hotel_cookie_array), {
      expires: 365,
    });
  }
  function loadRecentSearch() {
    var recent = $.cookie("hotel-recent-search");
    if (recent) {
      var recentList = $.parseJSON(recent);
      recentList.forEach(function (index) {
        $(".recent-search-txt").removeClass("hidden");
        $("#recent-search").append(
          "<a href='javascript:;' class='addtosearch' data-id='" +
            index.id +
            "' data-destination='" +
            index.value +
            "'>" +
            index.value +
            "</a>"
        );
      });
    }
  }
  $(".addtosearch").on("click", function () {
    $("#hotel_autocomplete")
      .val($(this).data("destination"))
      .next("input[name='target_search']")
      .val($(this).data("id"));
  });

  /* Hotel DatePicker */
  //    var fromSelector = $("#hotel_checkin");
  //    var toSelector = $("#hotel_checkout");
  //    if (fromSelector.length && toSelector.length) {
  //        var fromDateDefault = (fromSelector.val() == '') ? new Date() : new Date($.datepicker.parseDate(dpDateFormat, fromSelector.val()));
  //        var toDateDefault = (toSelector.val() == '') ? "+1d" : new Date($.datepicker.parseDate(dpDateFormat, toSelector.val()));
  //        //Datepicker Code
  //        fromSelector.datepicker({
  //            showOtherMonths: true,
  //            selectOtherMonths: true,
  //            numberOfMonths: dpMonths,
  //            dateFormat: dpDateFormat,
  //            minDate: 0,
  //            showButtonPanel: true,
  //            closeText: " Close ",
  //            onClose: function () {
  //                toSelector.datepicker("show");
  //            }
  //        }).on("change", function () {
  //            var tomorrow = new Date(getDate(this));
  //            tomorrow.setDate(tomorrow.getDate() + 1);
  //            to.datepicker("option", "minDate", tomorrow);
  //            $("#checkout-date-txt").html(toSelector.val());
  //        }).datepicker("setDate", fromDateDefault);
  //        var to = toSelector.datepicker({
  //            showOtherMonths: true,
  //            selectOtherMonths: true,
  //            numberOfMonths: dpMonths,
  //            dateFormat: dpDateFormat,
  //            minDate: 0,
  //            showButtonPanel: true,
  //            closeText: " Close ",
  //        }).on("change", function () {
  //            $("#checkout-date-txt").html(toSelector.val());
  //        }).datepicker("setDate", toDateDefault); //
  //        if (fromSelector.val() != '' && toSelector.val() != '') {
  //            fromDateDefault.setDate(fromDateDefault.getDate() + 1);
  //            to.datepicker("option", "minDate", fromDateDefault);
  //            $("#checkout-date-txt").html(fromSelector.val());
  //        }
  //    }

  if ($("#hotel-daterange").length) {
    var picker = new Lightpick({
      field: document.getElementById("hotel-daterange"),
      singleDate: false,
      format: "ddd, MMM D",
      minDays: 2,
      maxDays: 31,
      numberOfMonths: dpMonths,
      minDate: new Date(),
      tooltipNights: 1,
      dropdowns: false,
      selectForward: true,
      startDate: moment(),
      endDate: moment().add(1, "day"),
      onSelect: function (start, end) {
        document.getElementById("hrange_checkin").value =
          start.format("DD-MM-YYYY");
        document.getElementById("hrange_checkout").value =
          end.format("DD-MM-YYYY");
      },
    });
    //
    document.getElementById("hrange_checkin").value =
      moment().format("DD-MM-YYYY");
    document.getElementById("hrange_checkout").value = moment()
      .add(1, "day")
      .format("DD-MM-YYYY");
  }
  if ($("#hotel_checkin").length && $("#hotel_checkout").length) {
    var picker = new Lightpick({
      field: document.getElementById("hotel_checkin"),
      secondField: document.getElementById("hotel_checkout"),
      singleDate: false,
      format: "DD-MM-YYYY",
      minDays: 2,
      maxDays: 31,
      numberOfMonths: dpMonths,
      minDate: new Date(),
      tooltipNights: 1,
      dropdowns: false,
      selectForward: true,
    });
  }

  var fromSelector = $("#package_checkin");
  var toSelector = $("#package_checkout");
  if (fromSelector.length && toSelector.length) {
    var fromDateDefault =
      fromSelector.val() == ""
        ? new Date()
        : new Date($.datepicker.parseDate(dpDateFormat, fromSelector.val()));
    var toDateDefault =
      toSelector.val() == ""
        ? "+1d"
        : new Date($.datepicker.parseDate(dpDateFormat, toSelector.val()));
    //Datepicker Code
    fromSelector
      .datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        numberOfMonths: dpMonths,
        dateFormat: dpDateFormat,
        minDate: 0,
        showButtonPanel: true,
        closeText: " Close ",
        onClose: function () {
          toSelector.datepicker("show");
        },
      })
      .on("change", function () {
        var tomorrow = new Date(getDate(this));
        tomorrow.setDate(tomorrow.getDate() + 1);
        to.datepicker("option", "minDate", tomorrow);
        $("#checkout-date-txt").html(toSelector.val());
      })
      .datepicker("setDate", fromDateDefault);
    var to = toSelector
      .datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        numberOfMonths: dpMonths,
        dateFormat: dpDateFormat,
        minDate: 0,
        showButtonPanel: true,
        closeText: " Close ",
      })
      .on("change", function () {
        $("#checkout-date-txt").html(toSelector.val());
      })
      .datepicker("setDate", toDateDefault); //
    if (fromSelector.val() != "" && toSelector.val() != "") {
      fromDateDefault.setDate(fromDateDefault.getDate() + 1);
      to.datepicker("option", "minDate", fromDateDefault);
      $("#checkout-date-txt").html(toSelector.val());
    }
  }

  /* Car DatePicker */
  (function ($) {
    var fromSelector = $("#car-block .from-date");
    var toSelector = $("#car-block .to-date");

    var fromCarTimepicker = $("#car-block #from-timepicker");
    var toCarTimepicker = $("#car-block #to-timepicker");

    if (fromSelector.length && toSelector.length) {
      var future_date_from = new Date(),
        future_date_to = new Date();
      future_date_from.setDate(future_date_from.getDate() + 2); // 2 days after date
      future_date_to.setDate(future_date_to.getDate() + 5); // 2 days after date
      var fromDateDefault =
        fromSelector.val() == ""
          ? future_date_from
          : new Date($.datepicker.parseDate(dpDateFormat, fromSelector.val()));
      var toDateDefault =
        toSelector.val() == ""
          ? future_date_to
          : new Date($.datepicker.parseDate(dpDateFormat, toSelector.val()));
      //Datepicker Code
      fromSelector
        .datepicker({
          showOtherMonths: true,
          selectOtherMonths: true,
          numberOfMonths: dpMonths,
          dateFormat: dpDateFormat,
          minDate: 0,
          showButtonPanel: true,
          closeText: " Close ",
          onClose: function () {
            fromCarTimepicker.timepicker("show");
          },
        })
        .on("change", function () {
          var tomorrow = new Date(getDate(this));
          tomorrow.setDate(tomorrow.getDate()); //+ 1
          to.datepicker("option", "minDate", tomorrow);
        })
        .datepicker("setDate", fromDateDefault);
      // To Datepicker
      var to = toSelector
        .datepicker({
          showOtherMonths: true,
          selectOtherMonths: true,
          numberOfMonths: dpMonths,
          dateFormat: dpDateFormat,
          minDate: 0,
          showButtonPanel: true,
          closeText: " Close ",
          onClose: function () {
            toCarTimepicker.timepicker("show");
          },
        })
        .datepicker("setDate", toDateDefault); //
      if (fromSelector.val() != "" && toSelector.val() != "") {
        fromDateDefault.setDate(fromDateDefault.getDate()); // + 1
        to.datepicker("option", "minDate", fromDateDefault);
      }
    }

    /////////////////////// timepicker

    if (fromCarTimepicker.length > 0) {
      // check if element exists
      fromCarTimepicker.timepicker({ timeFormat: "H:i" });
      toCarTimepicker.timepicker({ timeFormat: "H:i" });

      var fromCarDefault =
        fromCarTimepicker.val() == "" ? "10:00" : fromCarTimepicker.val();
      var toCarDefault =
        toCarTimepicker.val() == "" ? "10:00" : toCarTimepicker.val();
      fromCarTimepicker.timepicker("setTime", fromCarDefault);
      toCarTimepicker.timepicker("setTime", toCarDefault);
    }
  })(jQuery);

  var fromSelector = $("#transfer-block .from-date");
  var toSelector = $("#transfer-block .to-date");

  var fromTransferTimepicker = $("#transfer-block #transfer-from-timepicker");
  var toTransferTimepicker = $("#transfer-block #transfer-to-timepicker");

  if (fromSelector.length && toSelector.length) {
    var future_date_from = new Date(),
      future_date_to = new Date();
    future_date_from.setDate(future_date_from.getDate() + 2); // 2 days after date
    future_date_to.setDate(future_date_to.getDate() + 5); // 2 days after date
    var fromDateDefault =
      fromSelector.val() == ""
        ? future_date_from
        : new Date($.datepicker.parseDate(dpDateFormat, fromSelector.val()));
    var toDateDefault =
      toSelector.val() == ""
        ? future_date_to
        : new Date($.datepicker.parseDate(dpDateFormat, toSelector.val()));
    //Datepicker Code
    fromSelector
      .datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        numberOfMonths: dpMonths,
        dateFormat: dpDateFormat,
        minDate: 0,
        showButtonPanel: true,
        closeText: " Close ",
        onClose: function () {
          fromTransferTimepicker.timepicker("show");
        },
      })
      .on("change", function () {
        var tomorrow = new Date(getDate(this));
        tomorrow.setDate(tomorrow.getDate()); //+ 1
        to.datepicker("option", "minDate", tomorrow);
      })
      .datepicker("setDate", fromDateDefault);
    // To Datepicker
    var to = toSelector
      .datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        numberOfMonths: dpMonths,
        dateFormat: dpDateFormat,
        minDate: 0,
        showButtonPanel: true,
        closeText: " Close ",
        onClose: function () {
          toTransferTimepicker.timepicker("show");
        },
      })
      .datepicker("setDate", toDateDefault); //
    if (fromSelector.val() != "" && toSelector.val() != "") {
      fromDateDefault.setDate(fromDateDefault.getDate()); // + 1
      to.datepicker("option", "minDate", fromDateDefault);
    }
  }

  /////////////////////// timepicker

  if (fromTransferTimepicker.length > 0) {
    // check if element exists
    fromTransferTimepicker.timepicker({ timeFormat: "H:i", step: 15 });
    toTransferTimepicker.timepicker({ timeFormat: "H:i", step: 15 });

    var fromCarDefault =
      fromTransferTimepicker.val() == ""
        ? "10:00"
        : fromTransferTimepicker.val();
    var toCarDefault =
      toTransferTimepicker.val() == "" ? "10:00" : toTransferTimepicker.val();
    fromTransferTimepicker.timepicker("setTime", fromCarDefault);
    toTransferTimepicker.timepicker("setTime", toCarDefault);
  }

  function getDate(element) {
    var date;
    try {
      date = $.datepicker.parseDate(dpDateFormat, element.value);
    } catch (error) {
      date = null;
    }
    return date;
  }
  //Today Buttom Event
  $.datepicker._gotoToday = function (id) {
    $(id).datepicker("setDate", new Date()).datepicker("hide").change().blur();
  };

  if ($(".birth-datepicker").length) {
    $(".birth-datepicker").datepicker({
      dateFormat: dpDateFormat,
      changeMonth: true,
      changeYear: true,
      yearRange: "-60:+0",
      maxDate: 0,
    });
  }

  if ($(".expiry-datepicker").length) {
    $(".expiry-datepicker").datepicker({
      dateFormat: dpDateFormat,
      changeMonth: true,
      changeYear: true,
      yearRange: "-0:+15",
      minDate: 0,
    });
  }
});

/*
 * #######################
 * ######## FLIGHTS #######
 * #######################
 */
$(document).ready(function () {
  var selector = "input.autocomplete-airports";
  $(document).on("keydown.autocomplete", selector, function () {
    $(this).autocomplete({
      //            source: "/autocomplete/get_airports",
      source: function (request, response) {
        $.ajax({
          url: myconfig.site_url + "autocomplete/get_airports",
          dataType: "json",
          global: false,
          data: {
            term: request.term,
          },
          success: function (data) {
            response(data);
          },
        });
      },
      minLength: 2, //search after two characters
      autoFocus: true, // first item will automatically be focused
      select: function (event, ui) {
        if (event.keyCode !== 9) {
          var tabindex = parseInt($(this).attr("tabindex"));
          if (tabindex >= 0) {
            tabindex = tabindex + 1;
            $(this)
              .closest("form")
              .find("[tabindex=" + tabindex + "]")
              .focus();
          }
        }
      },
      create: function () {
        $(this).data("ui-autocomplete")._renderItem = function (ul, item) {
          console.log(item);
          return $("<li></li>")
            .append(
              "<div><span>" +
                item.city +
                ", </span>" +
                "<span>" +
                item.country +
                "</span>" +
                '<span class="hotel-count">' +
                item.label_code +
                "</span></div>"
            )
            .appendTo(ul);
        };
      },
    });
    //                .autocomplete("instance")._renderItem = function (ul, item) {
    //            return $("<li></li>")
    //                    .append('<div><span>' + item.city + ', </span>' + '<span>' + item.country + '</span>' + '<span class="hotel-count">' + item.label_code + '</span></div>')
    //                    .appendTo(ul);
    //        };
  });
  //////////////////////// jQUery UI datepicker
  $(".datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
    numberOfMonths: 1,
    dateFormat: "dd-mm-yy",
  });
});

$(document).ready(function () {
  var selector = "input.autocomplete-provider";
  $(document).on("keydown.autocomplete", selector, function () {
    $(this)
      .autocomplete({
        //            source: "/autocomplete/get_airlines_list",
        source: function (request, response) {
          $.ajax({
            url: myconfig.site_url + "/autocomplete/get_airlines_list",
            dataType: "json",
            global: false,
            data: {
              term: request.term,
            },
            success: function (data) {
              response(data);
            },
          });
        },
        minLength: 2, //search after two characters
        autoFocus: true, // first item will automatically be focused
        select: function (event, ui) {
          $(this).val(ui.item.value);
          var elment = $(this).attr("name");
          if ((elment *= "]")) {
            $(this).next(":input").focus();
          } else {
            $(this).closest("div").next().find("input").focus();
          }
          return false;
        },
      })
      .autocomplete("instance")._renderItem = function (ul, item) {
      return $("<li></li>")
        .append(
          "<div><span>" +
            item.name +
            "</span>" +
            '<span class="hotel-count">' +
            item.label_code +
            "</span></div>"
        )
        .appendTo(ul);
    };
  });
});
