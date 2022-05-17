const firebaseConfig = {
	apiKey: "AIzaSyCMHjDY6J0-eDCCis0dPUoM8J6jXRBd4gg",
	authDomain: "projet-gestion-ecole.firebaseapp.com",
	projectId: "projet-gestion-ecole",
	storageBucket: "projet-gestion-ecole.appspot.com",
	messagingSenderId: "637382526793",
	appId: "1:637382526793:web:f5a198fa309fbdcf853c98"
  };
  
	//Initialize Firebase
	var firebaseApp = firebase.initializeApp( firebaseConfig );
	const db = firebase.firestore()
	const auth = firebase.auth()
	
   





   
const user_login =()=>{
	var email = document.getElementById('emailLogin').value
	var password = document.getElementById('passwordLogin').value
  if(email == ""|| email==" "||password == ""||password ==" ")
  {
	document.getElementById('errorLogin').style.display ="block"

  }else{
	document.getElementById('anim').className ="loader"
	document.getElementById('btn').style.color ="rgba(87, 196, 129, 0.99)"
	  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
		var user = userCredential.user;
		var uid = user.uid;
		db.collection('personnel').doc(uid).update({
			connected:true
		}).then(()=>{
			location.href ="admin.html"
		})
		  }).catch((error) => {
		document.getElementById('anim').classList.remove('loader')
		document.getElementById('btn').style.color ="rgba(0, 0, 0, 0.99)"
		  var errorCode = error.code;
		 document.getElementById('errorLogin').style.display ="block"
		  var errorMessage = error.message;
		//   console.log(errorMessage,errorCode);
	  });
  }
}

const sendMail = () => {
  var e = document.getElementById('emailLogin').value;
  auth.sendPasswordResetEmail(e)
	.then(() => {
	  alert('Email de vérification envoyé')
	})
	.catch((error) => {
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // console.log(errorMessage,errorCode);
	  document.getElementById('errorLogin').innerHTML = "ce compte n'existe pas"
	  document.getElementById('errorLogin').style.display="block"

	});
  
  }
 
