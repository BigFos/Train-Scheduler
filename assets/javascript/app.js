var config = {
    apiKey: "AIzaSyCIB6ZAG-d9bsm5KesKEWvPNH4c989dajo",
    authDomain: "train-test-f5d2a.firebaseapp.com",
    databaseURL: "https://train-test-f5d2a.firebaseio.com",
    storageBucket: "train-test-f5d2a.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();
var trainName = "";
var dest = "";
var freq = 0;


$("#Submit").on("click", function() {
    event.preventDefault();
    trainName = $("#trainName").val().trim();
    dest = $("#dest").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    freq = $("#freq").val().trim();
    if (firstTrain > 2400) {
        alert("Please enter a valid military time between 0000 and 2400")
    } else {
        database.ref().push({
            trainName: trainName,
            dest: dest,
            firstTrain: firstTrain,
            freq: freq,
        })
    }
    $("#trainName").val("");
    $("#dest").val("");
    $("#firstTrain").val("");
    $("#freq").val("");

});
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    var trainName = childSnapshot.val().trainName;
    var dest = childSnapshot.val().dest;
    var firstTrain = childSnapshot.val().firstTrain;
    var freq = childSnapshot.val().freq;

    var firstTrConv = moment(firstTrain, "hmm").format("hh:mm");
    var firstTiConv = moment(firstTrConv, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTiConv), "minutes");
    var timeRemain = diffTime % freq;
    var nextArrival = freq - timeRemain;
    var nextTrain = moment().add(nextArrival, "minutes");
    var nextTrainForm = moment(nextTrain).format("hh:mm A");

    $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + dest + "</td><td>" +
        freq + "</td><td>" + nextTrainForm + "</td><td>" + nextArrival + "</td></tr>");
});
