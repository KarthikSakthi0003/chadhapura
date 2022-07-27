$(document).ready(function () {
  $("#signup-form")
    .validator({
      disable: false,
      focus: false,
    })
    .on("submit", function (e) {
      if (e.isDefaultPrevented()) {
        // handle the invalid form...
        return false;
      } else {
        // everything looks good!
        return true;
      }
    });

  $("#login-form")
    .validator({
      disable: false,
      focus: false,
    })
    .on("submit", function (e) {
      if (e.isDefaultPrevented()) {
        // handle the invalid form...
        return false;
      } else {
        // everything looks good!
        return true;
      }
    });

  $("#topup-form")
    .validator({
      disable: true,
      focus: true,
    })
    .on("submit", function (e) {
      if (e.isDefaultPrevented()) {
        // handle the invalid form...
        return false;
      } else {
        // everything looks good!
        saveTopupInfor();
        return false;
      }
    });

  var xhr;
  function saveTopupInfor() {
    if (xhr && xhr.readyState !== 4) {
      xhr.abort();
    }
    xhr = $.ajax({
      type: "POST",
      async: true,
      dataType: "json",
      data: $('form[name="topup-form"]').serializeArray(),
      url: myconfig.site_url + "dashboard/topup",
      beforeSend: function () {
        //$(".loading").fadeIn();
      },
      success: function (response) {
        if (typeof response.success !== "undefined" && response.success === 1) {
          $("#cardform").removeClass("hide");
          $("#deduct_amount").text(
            response.merchantData.currency + " " + response.deposit_amount
          );
          var paynow = "Pay Now INR " + response.total;
          $("#checkin").val(paynow);
          $("#payButton").val(paynow);

          //Loading Payment Iframe
          $("#payment_creditcard").removeClass("hide");
          $("#paymentFrame").html(response.ifrurl);

          if (!$.isEmptyObject(response.html)) {
            $("#payment-data").html(response.html);
          }
        } else {
          $("#failed").text("Something is wrong. You cannot make the payment");
        }
      },
      complete: function () {
        $("#traveler-submit-btn").prop("disabled", false);
        //$(".loading").fadeOut();
      },
    });
  }
});
