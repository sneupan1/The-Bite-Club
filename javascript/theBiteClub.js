var contactUsPage = document.querySelector("#change");
var logoutTab = document.querySelector("#logoutTab");
var loginTab = document.querySelector("#loginTab");
var body = document.querySelector("body");
if (body.getAttribute("id") === "ourDogs") {
    injectContent();
}
setDateAndTime();
imageEventListeners();

//displays date and time in footer of each page
function setDateAndTime() {
    var displayTime = document.querySelector("#dateNtime");
    var myDate = new Date();
    var date = myDate.toLocaleString();
    displayTime.textContent = date;

}

// images change when clicked in biteclubourdogs.html
function imageEventListeners() {
    var images = document.querySelectorAll(".dogImage");
    for (var i = 0; i < images.length; i++) {
        images[i].addEventListener("click", function () {
            this.setAttribute("src", "https://turing.cs.olemiss.edu/~sneupan1/assignment5/images/logo.jpg");
        });
    }
}
//injects content when "SEE MORE" button is pressed in biteclubourdogs.html (i)
// injects MULTIPLE different kinds of elements, multiple times
function injectContent() {
    var list = [["Bhote", "https://turing.cs.olemiss.edu/~sneupan1/assignment5/images/bhote.jpg"],
    ["Happy", "https://turing.cs.olemiss.edu/~sneupan1/assignment5/images/happy.jpg"],
    ["Homie", "https://turing.cs.olemiss.edu/~sneupan1/assignment5/images/homie.jpg"],
    ["Lhaso", "https://turing.cs.olemiss.edu/~sneupan1/assignment5/images/lhaso.jpg"],
    ["Pinkman", "https://turing.cs.olemiss.edu/~sneupan1/assignment5/images/pinkman.jpg"],
    ["Sheru", "https://turing.cs.olemiss.edu/~sneupan1/assignment5/images/sheru.jpg"]];

    var seeMoreButton = document.querySelector("#seeMoreButton");
    seeMoreButton.addEventListener("click", function () {
        var bigBox = document.querySelector("#extContent");
        var bigBox2 = document.querySelector("#bigBox2");
        for (var i = 0; i < list.length; i++) {
            var boxA = document.createElement("div");
            boxA.setAttribute("class", "col-lg-4 col-sm-6");

            var boxB = document.createElement("div");
            boxB.setAttribute("class", "thumbnail");

            var boxC = document.createElement("div");
            boxC.setAttribute("class", "image");

            var img1 = document.createElement("img");
            img1.setAttribute("class", "dogImage");
            img1.setAttribute("src", list[i][1]);
            img1.setAttribute("alt", "TheBiteclub");

            var p1 = document.createElement("p");
            p1.setAttribute("class", "fig-caption");
            var p1Text = document.createTextNode("I am " + list[i][0]);
            p1.appendChild(p1Text);

            boxC.appendChild(img1);
            boxB.appendChild(boxC);
            boxB.appendChild(p1);
            boxA.appendChild(boxB);
            bigBox.appendChild(boxA);
        }
        var h2 = document.createElement("h2");
        var h2Text = document.createTextNode("Meet our dogs. They'd would love to meet you.");
        h2.appendChild(h2Text);
        bigBox2.appendChild(h2);

        var p = document.createElement("p");
        var em = document.createElement("em");
        var emText = document.createTextNode("Thank you!");
        em.appendChild(emText);
        p.appendChild(em);
        bigBox2.appendChild(p);
        imageEventListeners();
        seeMoreButton.style.display = "none";
    });
}

logout();

function logout() {
    var logoutBtn = document.querySelector("#logoutBtn");
    logoutBtn.addEventListener("click", function () {
        firebase.auth().signOut().then(function () {
            //signout successful
            alert("Log Out Successful! You don't have access to Contact Us tab anymore.");
            if (body.getAttribute("id") === "contactUsPage") {
                window.location = "https://turing.cs.olemiss.edu/~sneupan1/assignment7/home.html";
            }   
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });
    });
}


checkUserLogin();
function checkUserLogin() {
    firebase.auth().onAuthStateChanged(function (user) {
        var contactUsPage = document.querySelector("#change");
        if (user) {
            // User is signed in
            contactUsPage.style.display = "block";
            logoutTab.style.display = "block";
            loginTab.style.display = "none";
        } else {
            // User is signed out.
            contactUsPage.style.display = "none";
            logoutTab.style.display = "none";
            loginTab.style.display = "block";
            if (body.getAttribute("id") === "contactUsPage") {
                window.location = "https://turing.cs.olemiss.edu/~sneupan1/assignment7/home.html";
            }
        }
    });
}

googleLogin();

function googleLogin() {
    var loginButton = document.querySelector("#loginBtn");
    var provider = new firebase.auth.GoogleAuthProvider();
    loginButton.addEventListener("click", function(){
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var user = result.user.displayName;
            alert("Logged in as " + user + "! Now you have access to Contact Us tab.");
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(error);
            console.log(errorCode);
            console.log(errorMessage);
            console.log(credential);
          });
    });
    
}

getFortune();

function getFortune() {
   const data = firebase.firestore();
   var randNum = Math.floor(Math.random() * 110) + 1;
   var luckyNums = "";
   for(var i = 0; i < 5; i++) {
	var rand = Math.floor(Math.random() * 69) + 1;
   	var luckyNums =  luckyNums + rand.toString() + " ";
   }
   var fortune = data.collection("fortunes").doc(randNum.toString());

   fortune.get().then(doc => {
	document.querySelector("#luckyNumbers").textContent = "Lucky Numbers: " + luckyNums;
   	document.querySelector("#fortuneMessage").textContent = "Fortune message for you: " + doc.data().quote;
   });
}