
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
