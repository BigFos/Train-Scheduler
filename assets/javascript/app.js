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
    
    var minAway = "" ;
   
    // Capture Button Click
    $("#Submit").on("click", function() {
        event.preventDefault();
        trainName = $("#trainName").val().trim();
        dest = $("#dest").val().trim();
        firstTrain = $("#firstTrain").val().trim();
        freq = $("#freq").val().trim();
        if (firstTrain > 2400) {
            alert("Please enter a valid military time between 0000 and 2400")
        }
        else{
        database.ref().push({
            trainName: trainName,
            dest: dest,
            firstTrain: firstTrain,
            freq: freq,
            
        })
    }
        
        // $("#tName").html(trainName);
        // $("#destination").html(dest);
        // $("#frequency").html(freq);
        // $("#nextArrival").html(nextArrival);
        // $("#minutesAway").html( moment(nextTrain).format("hh:mm A"));
        // console.log(minAway);
        // console.log(nextArrival);
        // console.log(firstTrain);
       
    });
    // database.ref().on("child_added",function(snapshot){
    //   $("#info").append("<td>" + trainName +  "</td><td>" + dest + "</td> <td>" + firstTrain +  "</td><td>" + freq + "</td><td>" + nextArrival + "</td><td>" + minAway +  "</td>");
    // });
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  // var firstTrainTime = $("#firstTrain").val().trim();
  var trainName = childSnapshot.val().trainName;
  var dest = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().firstTrain;
  var freq = childSnapshot.val().freq;
  // Employee Info
  console.log(trainName);
  console.log(dest);
  console.log(firstTrain);
  console.log(freq);
 var firstTrConv = moment(firstTrain, "hmm").format("hh:mm");
 console.log(firstTrConv);
        var firstTiConv = moment(firstTrConv, "hh:mm").subtract(1, "years");
        console.log(firstTiConv);
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        // Difference between the times
        var diffTime = moment().diff(moment(firstTiConv), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        // Time apart (remainder)
        var timeRemain = diffTime % freq;
        console.log(timeRemain);
        // Minute Until Train
        var nextArrival = freq - timeRemain;
        console.log("MINUTES TILL TRAIN: " + nextArrival);
        // Next Train
        var nextTrain = moment().add(nextArrival, "minutes");
        var nextTrainForm = moment(nextTrain).format("hh:mm A");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));
  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + dest + "</td><td>" +
  freq + "</td><td>" + nextTrainForm + "</td><td>" + nextArrival + "</td></tr>");
});
