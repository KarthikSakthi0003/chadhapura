// some scripts
function ShowItinerary(divid) {
  if ($("#" + divid).hasClass("active")) {
    // console.log($('#' + divid).hasClass("active"));
    $($("#" + divid))
      .find(".item-details")
      .hide();
    $($("#" + divid))
      .find(".item-morefares-details")
      .hide();
    $("#overlay").fadeOut(500);
  } else {
    $($("#" + divid))
      .find(".item-morefares-details")
      .hide();
    $($("#" + divid))
      .find(".item-details")
      .show();
    $("#overlay").fadeIn(500);
  }
  scrollToDiv(divid);
}

function ShowFares(divid) {
  if ($("#" + divid).hasClass("active")) {
    // console.log($('#' + divid).hasClass("active"));
    $($("#" + divid))
      .find(".item-details")
      .hide();
    $($("#" + divid))
      .find(".item-morefares-details")
      .hide();
    $("#overlay").fadeOut(500);
  } else {
    $($("#" + divid))
      .find(".item-details")
      .hide();
    $($("#" + divid))
      .find(".item-morefares-details")
      .show();
    $("#overlay").fadeIn(500);
    $("#" + divid).toggleClass("active");
    $("html, body").animate({ scrollTop: $("#" + divid).offset().top }, 500);
  }
  //scrollToDiv(divid);
}

function scrollToDiv(divid) {
  $("#" + divid).toggleClass("active");
  $("html, body").animate({ scrollTop: $("#" + divid).offset().top }, 500);
}

////////////////// booking steps function
function activate_block(id) {
  $("#" + id)
    .removeClass("panel-active")
    .addClass("panel-disable")
    .find(".full-view")
    .slideUp();
  $("#" + id)
    .find(".compact-view")
    .slideDown()
    .addClass("done");
  $("#" + id + "-count")
    .next("li")
    .children("a")
    .addClass("active");
  console.log("#" + id + "-count");

  $("#" + id)
    .next(".panel-booking")
    .addClass("panel-active")
    .removeClass("panel-disable")
    .children(".compact-view")
    .hide();
  $("#" + id)
    .next(".panel-booking")
    .children(".full-view")
    .slideDown();
  //$('#wrap_traveller_active').slideDown().closest('.panel').removeClass('panel-disable').addClass('panel-active');
  $("#" + id)
    .next(".panel-booking")
    .trigger("blockActive"); //Bind a event on activating
}

function activate_blocks(id) {
  if (
    $("#" + id + "-count")
      .children("a")
      .hasClass("active")
  ) {
    $(".panel-booking").removeClass("panel-active").addClass("panel-disable");
    $("#" + id).removeClass("panel-disable");
    $("#" + id).addClass("panel-active");
    $(".full-view").slideUp();
    $("#" + id)
      .children(".full-view")
      .slideDown();
  }
}

function load_nanoscroll() {
  if ($(".custom-scroll").length > 0) {
    // check if element exists
    $(".custom-scroll").mCustomScrollbar({
      theme: "dark-thin",
      scrollInertia: 400,
    });
  }
}

function load_validator(el) {
  el.validator({
    disable: false,
    focus: false,
  }).on("submit", function (e) {
    if (e.isDefaultPrevented()) {
      // handle the invalid form...
      return false;
    } else {
      // everything looks good!
      return true;
    }
  });
  return el;
}

function minutesToHours(ctime) {
  var hours = parseInt(ctime / 60, 10),
    minutes = parseInt(ctime % 60, 10);
  return [hours, minutes];
}

function hoursToDays(hrs) {
  var days = parseInt(hrs / 24, 10),
    hours = parseInt(hrs % 24, 10);
  return [days, hours];
}

function timeConvert(min) {
  var days = parseInt(min / 24 / 60),
    hours = parseInt((min / 60) % 24),
    minutes = parseInt(min % 60);
  return [days, hours, minutes];
}

function checkOnly(that, el_name) {
  $('input[name="' + el_name + '"]').prop("checked", false);
  $(that)
    .parent()
    .siblings("label")
    .children('input[name="' + el_name + '"]')
    .prop("checked", true)
    .change();
}

/* activate bootstrap tabs if # url*/
$(function () {
  var hash = window.location.hash;
  hash && $('ul.nav a[href="' + hash + '"]').tab("show");
  //    $('.nav-tabs a').click(function (e) {
  //        $(this).tab('show');
  //        var scrollmem = $('body').scrollTop() || $('html').scrollTop();
  //        window.location.hash = this.hash;
  //        $('html,body').scrollTop(scrollmem);
  //    });
});
$(".eye-password").on("click", function () {
  var iconElem = $(this).find("i");
  var passElem = $(this).closest(".input-group").find("input");
  if (iconElem.hasClass("fa-eye")) {
    iconElem.switchClass("fa-eye", "fa-eye-slash");
    passElem.attr("type", "text");
  } else if (iconElem.hasClass("fa-eye-slash")) {
    iconElem.switchClass("fa-eye-slash", "fa-eye");
    passElem.attr("type", "password");
  }
});
if ($(".alert-fadeout").length) {
  $(".alert.alert-fadeout").delay(1500).slideUp({
    duration: 2000,
  });
}

// jquery ready start
$(document).ready(function () {
  // jQuery code

  $("#accordion_faq .info-wrap").hide();

  $("#accordion_faq .title a").click(function (e) {
    e.preventDefault();
    if ($("#accordion_faq .info-wrap").is(":visible")) {
      $("#accordion_faq .info-wrap").slideUp(300);
      $(".item-faq").removeClass("active");
    }
    if ($(this).closest(".item-faq").find(".info-wrap").is(":visible")) {
      $(this).closest(".item-faq").find(".info-wrap").slideUp(300);
      $(this).closest(".item-faq").removeClass("active");
    } else {
      $(this).closest(".item-faq").find(".info-wrap").slideDown(300);
      $(this).closest(".item-faq").addClass("active");
      // $(this).children(".plusminus").text('-');
    }
  });

  ////////////////////// custom scroll
  if ($(".custom-scroll").length > 0) {
    // check if element exists
    $(".custom-scroll").mCustomScrollbar({
      theme: "minimal-dark",
    });
  }

  ////////////////////// subscribe popup
  if ($(".widget-subscribe").length > 0) {
    // check if element exists

    if (!$.cookie("widget-subscribe-hide")) {
      setTimeout(function () {
        $(".widget-subscribe").show().addClass("open");
      }, 3000); // 3 seconds.
      setTimeout(function () {
        $(".widget-subscribe").addClass("shake");
      }, 4500); // 4.5 seconds.
    }
    //close
    $(".widget-subscribe .close").click(function () {
      var display_days = $("#display_days").text();
      $(".widget-subscribe").hide("slide", { direction: "right" }, 1000);
      if (parseInt(display_days) > 0) {
        $.cookie("widget-subscribe-hide", true, {
          expires: parseInt(display_days),
        });
      }
    });
  }

  /////////////////////// restyle file input
  $(":file").change(function () {
    file_val = $(this)
      .val()
      .replace(/.*(\/|\\)/, "");
    $(this).closest(".file-input-wrap").find(".filename-input").text(file_val);
  });
  $(".del-file-input").click(function (e) {
    e.preventDefault();
    $(this).closest(".file-input-wrap").find("[type=file]").val("");
    $(this).closest(".file-input-wrap").find(".filename-input").text("");
  });
  /////////////////////// popover /plugins/popover
  if ($("a.uipopover").length > 0) {
    // check if element exists
    $("a.uipopover").webuiPopover({
      title: "Choose seat",
      width: 300,
      animation: "pop",
      closeable: true,
    });
  }

  ///////////////// CLOSE EMAIL NOTIFY flight
  $(".btn-price-alert").click(function () {
    $(".panel-notify").slideToggle();
    $("#overlay").fadeIn(500);
  });
  $("#overlay, .panel-notify .btn-close, .notify-box .close").click(function (
    e
  ) {
    e.preventDefault();
    if ($(".panel-notify").is(":visible")) {
      $(".panel-notify").slideUp();
      $("#overlay").fadeOut(500);
    }
    if ($(".notify-box").is(":visible")) {
      $("#overlay, .notify-box").fadeOut(500);
    }
  });
  $(".alert-dismiss .close").click(function (e) {
    e.preventDefault();
    $(this).closest(".alert-dismiss").slideUp();
  });
  /////////////////////// sticky /plugins/sticky
  if ($("#sticker").length > 0) {
    // check if element exists
    if ($(window).width() > 768) {
      $("#sticker").stick_in_parent({
        offset_top: 60,
        // container: $(".section-content")
        parent: $(".section-content"),
      });
    }
  }

  /////////////////////// simple tab
  if ($(".jq-tab").length > 0) {
    // check if element exists
    btn = $(".jq-tab .nav li");
    btn.click(function (e) {
      e.preventDefault();
      var index = $(this).index();
      $(this).closest(".jq-tab").find(".tab-item").hide();
      $(this).closest(".jq-tab").find(".tab-item").eq(index).show();
      $(this).siblings("li").removeClass("active");
      $(this).addClass("active");
    });
  }

  /////////////////////// simple jquery number counter
  $(".count").each(function () {
    $(this)
      .prop("Counter", 10)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 3000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });
  /////////////////////// nanoscroller /plugins/jquery.nanoscroller.min.js
  //    if ($(".nano").length > 0) {  // check if element exists
  //        $(".nano").nanoScroller({alwaysVisible: true});
  //    }

  //////////////////////// Bootstrap number spinner
  $(".number-spinner").click(function (e) {
    e.preventDefault();
    var fieldName = $(this).attr("data-field");
    var type = $(this).attr("data-type");
    var input = $(this)
      .closest(".input-group")
      .find("input[name='" + fieldName + "']"); //$("input[name='" + fieldName + "']")
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
      if (type == "minus") {
        var minValue = parseInt(input.attr("min"));
        minValue = !minValue ? 0 : minValue;
        if (currentVal > minValue) {
          input.val(currentVal - 1).change();
        }
        if (parseInt(input.val()) == minValue) {
          $(this).attr("disabled", true);
        }
      } else if (type == "plus") {
        var maxValue = parseInt(input.attr("max"));
        maxValue = !maxValue ? 999 : maxValue;
        if (currentVal < maxValue) {
          input.val(currentVal + 1).change();
        }
        if (parseInt(input.val()) == maxValue) {
          $(this).attr("disabled", true);
        }
      }
    } else {
      input.val(0);
    }
  });
  $(".spinner-value").focusin(function () {
    $(this).data("oldValue", $(this).val());
  });
  $(".spinner-value").change(function () {
    var minValue = parseInt($(this).attr("min"));
    var maxValue = parseInt($(this).attr("max"));
    if (!minValue) minValue = 0;
    if (!maxValue) maxValue = 999;
    var valueCurrent = parseInt($(this).val());
    var name = $(this).attr("name");
    if (valueCurrent >= minValue) {
      $(
        ".number-spinner[data-type='minus'][data-field='" + name + "']"
      ).removeAttr("disabled");
    } else {
      $(this).val($(this).data("oldValue"));
    }
    if (valueCurrent <= maxValue) {
      $(
        ".number-spinner[data-type='plus'][data-field='" + name + "']"
      ).removeAttr("disabled");
    } else {
      alert("Sorry, the maximum value was reached");
      $(this).val($(this).data("oldValue"));
    }
  });
  $(".spinner-value").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if (
      $.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  });

  //////////////////////// on login page activate tab from outside
  $(".target-tab").click(function (e) {
    e.preventDefault();
    $('a[href="' + $(this).attr("href") + '"]').tab("show");
  });

  ///////////////// Owl carousel
  if ($(".owl-carousel-four").length > 0) {
    // check if element exists
    $(".owl-carousel-four").owlCarousel({
      loop: true,
      margin: 15,
      nav: true,
      navText: [
        "<i class='fa fa-chevron-left'></i>",
        "<i class='fa fa-chevron-right'></i>",
      ],
      //items: 4,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 4,
        },
      },
    });
  }

  ///////////////// Owl carousel
  if ($(".owl-carousel-three").length > 0) {
    // check if element exists
    $(".owl-carousel-three").owlCarousel({
      loop: true,
      margin: 15,
      nav: true,
      navText: [
        "<i class='fa fa-chevron-left'></i>",
        "<i class='fa fa-chevron-right'></i>",
      ],
      //items: 3,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });
  }

  ///////////////// fixed menu on scroll
  if ($(window).scrollTop() > 15) {
    $(".header-nav").addClass("fixed-top");
  }
  $(window).scroll(function () {
    if ($(window).width() > 1024) {
      if ($(this).scrollTop() > 15) {
        $(".header-nav").addClass("fixed-top");
      } else {
        $(".header-nav").removeClass("fixed-top");
      }
    }
  });
  /////////////// widget show hide
  $(".btn-widget-contact").click(function (e) {
    e.preventDefault();
    if ($(".widget-contact").hasClass("active") == false) {
      $(".widget-contact").addClass("active").removeClass("hidewidget");
      $(".btn-widget-contact").html(' <i class="fa fa-times"></i> Close  ');
    } else {
      $(".widget-contact").removeClass("active").addClass("hidewidget");
      $(".btn-widget-contact").html(' <i class="fa fa-phone"></i> Contact  ');
    }
    //$(".widget-contact").toggleClass('active');
  });
  /////////////// widget show hide
  $(".btn-widget-feedback").click(function (e) {
    e.preventDefault();
    if ($(".widget-feedback").hasClass("active") == false) {
      $(".widget-feedback").addClass("active").removeClass("hidewidget2");
      $(".btn-widget-feedback").html(
        ' <i class="fa fa-close"></i> ' + $(this).data("closetext")
      );
    } else {
      $(".widget-feedback").removeClass("active").addClass("hidewidget2");
      $(".btn-widget-feedback").html(
        ' <i class="fa fa-envelope"></i> ' + $(this).data("opentext")
      );
    }
    // $(".widget-feedback").toggleClass('active');
  });
  ////////////////// booking steps
  $(".compact-view").click(function () {
    $(".full-view").hide();
    $(".compact-view.done").show();
    $(".panel-booking").removeClass("panel-active").addClass("panel-disable");
    $(this)
      .parent(".panel-booking")
      .removeClass("panel-disable")
      .addClass("panel-active")
      .trigger("blockActive");
    $(this).siblings(".full-view").slideDown();
    $(this).slideUp();
  });
  ////////////////// tooltip moves with cursor
  $("[data-tooltip]")
    .hover(
      function (event) {
        //alert('salam');
        var toolTip = $(this).attr("data-tooltip");
        $('<span class="mytip"></span>')
          .text(toolTip)
          .appendTo("body")
          .css("top", event.pageY - 10 + "px")
          .css("left", event.pageX + 20 + "px")
          .fadeIn("slow");
      },
      function () {
        $(".mytip").remove();
      }
    )
    .mousemove(function (event) {
      $(".mytip")
        .css("top", event.pageY - 10 + "px")
        .css("left", event.pageX + 20 + "px");
    });
  ////////////////// collabse link change text when collapsed
  $(".panel-booking a[data-toggle=collapse]").click(function () {
    if ($(this).attr("aria-expanded") == "false") {
      $(this).html('Hide options <i class="fa fa-chevron-up"></i>');
    } else {
      $(this).html('More options <i class="fa fa-chevron-down"></i>');
    }
  });
  $("a.btn-coupon").click(function () {
    $("i", this).toggleClass("fa-chevron-up fa-chevron-down");
  });
  /////////////////// on top of page appears flight  edit form
  $(".section-modify").hide();
  $(".btn-modify").click(function () {
    $(".section-modify").slideToggle();
  });
  // overlay click deactive ticket
  $("#overlay").on("click", function () {
    $(".item-result-wrap.active").find(".btn-details").click();
    if ($(this).hasClass("mobile-overlay")) {
      $(".btn-filter-close").click();
    }
  });
  ////////////////////// SHow filter on mobile
  $(".btn-filter").click(function () {
    $("#filter-area").show();
    $("#overlay").show().addClass("mobile-overlay");
    load_nanoscroll();
    scrollToDiv("filter-area");
  });
  $(".btn-filter-close").click(function () {
    $("#filter-area").hide();
    $("#overlay").hide();
  });
  //////////////////////// Bootstrap tooltip
  //    if ($("[data-toggle='tooltip']").length > 0) {  // check if element exists
  //        $("[data-toggle='tooltip']").tooltip();
  //    }

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
      var that = this,
        currentCategory = "";
      $.each(items, function (index, item) {
        var li;
        if (item.category != currentCategory) {
          var cl = item.category == "Location" ? "fa-map-marker" : "fa-hotel";
          ul.append(
            "<li class='ui-autocomplete-category'>" +
              "<i class='fa " +
              cl +
              "'></i>" +
              item.category +
              "</li>"
          );
          currentCategory = item.category;
        }
        li = that._renderItemData(ul, item);
        if (item.category) {
          li.attr("aria-label", item.category + " : " + item.label);
        }
      });
    },
  });

  //////////// DEMO AUTOCOMPLATE, can be removed after testing
  var availableTags = [
    "Dubai - UAE",
    "Al Maktoum",
    "Istanbul",
    "London",
    "New York",
    "Qatar Airways",
    "Lufhanza",
    "United airlines",
    "Washington",
  ];
  $("#autocomplete").autocomplete({
    source: availableTags,
  });

  //////////////////////// passenger select
  $(".passenger-change").click(function (e) {
    $(this).next(".passenger-dropdown").slideToggle("fast");
    e.stopPropagation();
    e.preventDefault();
  });
  $(".passenger-dropdown").click(function (e) {
    e.stopPropagation();
  });
  $(".passenger-dropdown .btn-ok").click(function (e) {
    e.preventDefault();
    $(".passenger-dropdown").hide();
  });
  $("body").click(function () {
    $(".passenger-dropdown").hide();
  });
  //////////////////////// hotel form occupany select
  $(".occupancy-change").click(function (e) {
    $(this).next(".occupancy-dropdown").slideToggle("fast");
    e.stopPropagation();
    e.preventDefault();
  });
  $(".occupancy-dropdown").click(function (e) {
    e.stopPropagation();
  });
  $(".occupancy-dropdown .btn-ok").click(function (e) {
    e.preventDefault();
    $(".occupancy-dropdown").hide();
  });
  $("body").click(function () {
    $(".occupancy-dropdown").hide();
  });
  // return button clicked datepicker activate
  $(".btn-round-trip").click(function () {
    $(".flight-tab-switcher").addClass("hide");
    $("#one-round-block").removeClass("hide");
    $(".date-return-empty").hide();
    $(".date-return-active").show();
    $(this)
      .closest(".form-block")
      .find(".trip-type-hidden")
      .val($(this).children("input[name='trip_type_chk']").val());
    $(this).addClass("active").siblings().removeClass("active");
  });
  $(".add-return").click(function () {
    $(".btn-round-trip").click();
  });
  $(".btn-remove-return").click(function () {
    $(".btn-one-way").click();
  });
  $(".btn-one-way").click(function () {
    $(".flight-tab-switcher").addClass("hide");
    $("#one-round-block").removeClass("hide");
    $(".date-return-active").hide();
    $(".date-return-empty").show();
    $(this)
      .closest(".form-block")
      .find(".trip-type-hidden")
      .val($(this).children("input[name='trip_type_chk']").val());
    $(this).addClass("active").siblings().removeClass("active");
  });
  $(".btn-multy-city").click(function () {
    $(".flight-tab-switcher").addClass("hide");
    $("#multi-block").removeClass("hide");
    $(this)
      .closest(".form-block")
      .find(".trip-type-hidden")
      .val($(this).children("input[name='trip_type_chk']").val());
    $(this).addClass("active").siblings().removeClass("active");
  });
  //    /////////////////////// timepicker
  //    if ($(".timepicker").length > 0) {  // check if element exists
  //        $('.timepicker').timepicker({ 'timeFormat': 'H:i' });
  //
  //    }

  /////////////////////// spinner
  if ($(".table-flight-calendar").length > 0) {
    // check if element exists
    $(".table-flight-calendar td").hover(
      function () {
        classname = $(this).attr("class").split(" ")[1];
        //alert(classname);
        $(this)
          .parent()
          .siblings()
          .find("." + classname)
          .addClass("highlight-col");
      },
      function () {
        $(".table-flight-calendar td, .table-flight-calendar th").removeClass(
          "highlight-col"
        );
      }
    );
  }

  // //////////////////////// Scroll top
  var scroll_btn = $("a[href='#top']");
  scroll_btn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      scroll_btn.fadeIn();
    } else {
      scroll_btn.fadeOut();
    }
  });
  scroll_btn.click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
  /* Start: Send feedback*/
  $("#feedback-form,#feedback-form-contact")
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
        postFeedback(this);
        return false;
      }
    });
  var feedbackxhr;
  function postFeedback(that) {
    if (feedbackxhr && feedbackxhr.readyState !== 4) {
      feedbackxhr.abort();
    }
    feedbackxhr = $.ajax({
      type: "POST",
      async: true,
      dataType: "json",
      data: $(that).serializeArray(),
      url: myconfig.site_url + "send-feedback",
      beforeSend: function () {
        $(that).find(".spin-loader").removeClass("hide");
      },
      success: function (response) {
        $(that)
          .find("p.feedback-success")
          .text(response)
          .fadeTo(5000, 1000)
          .slideUp(1000);
        $(that).find("input[type=text],input[type=email] ,textarea").val("");
      },
      complete: function () {
        $(that).find(".spin-loader").addClass("hide");
      },
    });
  }
  /* End: Send feedback*/
  $("#subscribe-form,#subscribe-form-small")
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
        sucscribeUser(this);
        return false;
      }
    });
  function sucscribeUser(that) {
    if (feedbackxhr && feedbackxhr.readyState !== 4) {
      feedbackxhr.abort();
    }
    feedbackxhr = $.ajax({
      type: "POST",
      async: true,
      dataType: "json",
      data: $(that).serializeArray(),
      url: myconfig.site_url + "/suscribe-me",
      beforeSend: function () {
        $(that).find(".spin-loader").removeClass("hide");
      },
      success: function (response) {
        $(that)
          .next(".subscribe-success")
          .text(response)
          .fadeTo(2000, 500)
          .slideUp(500);
        //$.cookie("widget-subscribe-hide", true, {expires: 365});
      },
      complete: function () {
        $(that).find(".spin-loader").addClass("hide");
      },
    });
  }

  /* End: Send feedback*/
  /* Common Form Validator*/
  if ($(".form-validatorbt").length) {
    load_validator($(".form-validatorbt"));
  }
});
// jquery end
