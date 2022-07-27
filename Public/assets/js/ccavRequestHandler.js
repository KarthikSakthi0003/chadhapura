$(document).ready(function () {
  $("#checkin").click(function () {
    var card_number = $("input[name=card_number]").val();
    var expiry_month = $("select[name=expiry_month]").val();
    var expiry_year = $("select[name=expiry_year]").val();
    var cvv_number = $("input[name=cvv_number]").val();
    var card_code = $("#card-code").text();
    console.log(card_number, expiry_month, expiry_year, cvv_number, card_code);
    if (
      typeof card_number !== "undefined" &&
      card_number != "" &&
      typeof expiry_month !== "undefined" &&
      expiry_month != "" &&
      typeof expiry_year !== "undefined" &&
      expiry_year != "" &&
      typeof cvv_number !== "undefined" &&
      cvv_number != "" &&
      card_code != "none"
    ) {
      var transactionData = "";
      var payment_option =
        "payment_option=" + $("input[name=payment_option]:checked").val();
      $(":input")
        .not($(".payOption"))
        .each(function () {
          if ($(this).attr("name") != undefined) {
            transactionData += "&";
            transactionData += $(this).attr("name") + "=";
            transactionData += $(this).val();
          }

          if (
            !(
              $(this).attr("id") == "encRequest" ||
              $(this).attr("id") == "access_code" ||
              $(this).attr("id") == "order_id"
            )
          )
            //$(this).remove();
            $(this).prop("readonly", true);
          if ($(this).attr("id") == "checkin") {
            $(this).remove();
          }
        });
      transactionData = transactionData + "&" + payment_option;

      $.jCryption.getKeys(
        "https://secure.ccavenue.ae/transaction/KeyMaking?generateKeypair=true&access_code=" +
          $("#access_code").val() +
          "&order_id=" +
          $("#order_id").val(),
        function (receivedKeys) {
          keys = receivedKeys;
          $.jCryption.encrypt(transactionData, keys, function (encrypted) {
            encryptedTransData = encrypted;
            $("#encRequest").val(encryptedTransData);
            $("#customerData").submit();
          });
        }
      );
    }
  });
});
