function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i in uiBathrooms) {
    if (uiBathrooms[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i in uiBHK) {
    if (uiBHK[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "https://house-price-prediction-q0vx.onrender.com/predict_home_price";

  $.ajax({
    url: url,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
    }),
    success: function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
    },
    error: function(xhr, status, error) {
      console.error("Prediction request failed:", xhr.responseText);
      estPrice.innerHTML = "<h2 style='color:red;'>Something went wrong. Please try again.</h2>";
    }
  });
}

function onPageLoad() {
  console.log("document loaded");
  var url = "https://house-price-prediction-q0vx.onrender.com/get_location_names";

  $.get(url, function(data, status) {
    console.log("got response for get_location_names request");
    if (data) {
      var locations = data.locations;
      $('#uiLocations').empty();
      $('#uiLocations').append(new Option("Choose a Location", "", true, true));
      for (var i in locations) {
        var opt = new Option(locations[i]);
        $('#uiLocations').append(opt);
      }
    }
  }).fail(function(xhr, status, error) {
    console.error("Failed to load locations:", error);
  });
}

window.onload = onPageLoad;