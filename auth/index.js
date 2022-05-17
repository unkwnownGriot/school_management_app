const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('passwordConfirm');
const valider = document.getElementById('valider');

valider.addEventListener("click", () => {
	var e = email.value;
	var p = password.value;
	var pc = passwordConfirm.value;

	if (e == "" || e == " " || p == "" || p == " " || pc == "" || pc == " ") {
		alert("veillez renseigner tous les champs !");
		return;
	}
	if (p == pc) {
		firebase.auth().createUserWithEmailAndPassword(e, pc)
			.then((userCredential) => {
				var user = userCredential.user;
				var id = user.uid;
				console.log(user)
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode, errorMessage)
			});
	}

})


const emailLogin = document.getElementById('emailLogin');
const passwordLogin = document.getElementById('passwordLogin');
const validerLogin = document.getElementById('validerLogin');

validerLogin.addEventListener("click", () => {
	const e = emailLogin.value;
	const p = passwordLogin.value;

	// if (true) {}
	firebase.auth().signInWithEmailAndPassword(e, p)
		.then((userCredential) => {
			var user = userCredential.user;
			var uemail = user.email;
			var uid = user.uid;
			console.log(uemail, uid);
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage);
		});
})

const desconnect = () => {
	firebase.auth().signOut().then(() => {
		console.log('deconnecte avec success !')
	}).catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorMessage);
	});
}

const emailUpdate = document.getElementById('emailUpdate');
const vUpdate = document.getElementById('vUpdate');

vUpdate.addEventListener("click", () => {
	emU = emailUpdate.value;
	// alert(emU)
	const user = firebase.auth().currentUser;
	console.log(user)
	user.updateEmail(emU).then((userCredential) => {
		// actions
	}).catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorMessage);
	});
})

const sendMail = () => {
	var e = document.getElementById('').value;
	firebase.auth().sendPasswordResetEmail(e)
		.then(() => {
			alert("email envoye !")
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage);
		});
}