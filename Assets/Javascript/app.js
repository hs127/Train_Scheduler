
// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyCLNeZwWG7hRLJScBs3NYsU7Vr5IRpqFJ8",
    authDomain: "trainstationschedule.firebaseapp.com",
    databaseURL: "https://trainstationschedule.firebaseio.com",
    projectId: "trainstationschedule",
    storageBucket: "trainstationschedule.appspot.com",
    messagingSenderId: "1030281005124",
    appId: "1:1030281005124:web:a0f33450baf142a2de1411",
    measurementId: "G-SH3KV66WWW"
};
// Initialize Firebase
firebase.initializeApp(config);
// firebase.analytics();

//variable referencing the databse 
var database = firebase.database();

//intitalze variables 
var trainName = "";
var destination = "";
var freq = "";
var nextArrival = "";
var minsAway = "";

$("#add-train").on("click", function (event) {

    console.log("clicked");
    event.preventDefault();
    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    nextArrival = $("#time-input").val().trim();
    freq = $("#freq-input").val().trim();


    database.ref().push({
        trainName: trainName,
        destination: destination,
        freq: freq,
        nextArrival: nextArrival,
        minsAway: minsAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});


database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    console.log(childSnapshot.val().trainName);

    //help here
    //we subt one year the first train arrival is always before the current time 
    //it is using unix time stamp
    var firstTrainNew = moment(childSnapshot.val().nextArrival, "hh:mm").subtract(1, "years");
    console.log("First train: " + firstTrainNew);
    //help here
    //compute the difference in time from now and from firstTrainNew
    var diffTime = moment().diff(moment(firstTrainNew), "minutes");
    //help here
    //unix time is in seconds 
    console.log("diffTime :" + diffTime);


    var remainder = diffTime % childSnapshot.val().freq;
    var minsAway = childSnapshot.val().freq - remainder;

    //adding the mins aways to the current time and converting to mins 
    var nextArrival = moment().add(minsAway, "minutes");
    nextArrival = moment(nextArrival).format("hh:mm");
    console.log("mins away :" + minsAway);

    var row = $("<tr>");
    row.append("<td>" + childSnapshot.val().trainName + "</td>");
    row.append("<td>" + childSnapshot.val().destination + "</td>");
    row.append("<td>" + childSnapshot.val().freq + "</td>");
    row.append("<td>" + nextArrival + "</td>");
    row.append("<td>" + minsAway + "</td>");
    $("#record").append(row);

}, function (errorObject) {
    console.log("The red failed :" + errorObject.code);
});

