var etudArr =[]
var attenteArr = []
var matArr =[]
var sucursale =[]
var recuArr = []
var recusArr = []
var user =[]
var personalArr=[]
var dossierArr=[]
var filieres = []
var professeurs =[]
var storage =[]
// var choixfil =[]
var niveaux =[]
var titulaires =[]
var tab_date =[]
var scol = {}
var scol_sucursale = {}
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

  	var annee = 2021

	
	 db.collection('sucursale').onSnapshot((snap)=>{
		 sucursale = []
			snap.docs.map((doc)=>{
				const {nom} = doc.data()
				obj ={nom}
				sucursale.push(obj)
			})
		  localStorage.setItem('sucursale',JSON.stringify(sucursale))
		
		})
		db.collection(`annee scolaire/${annee}/filieres`).onSnapshot((snaps)=>{
			snaps.docs.map((j)=>{
				const {prof,filname,prixfil} = j.data()
				obj = {prof,filname,prixfil}
				storage.push(obj)
			})
			localStorage.setItem('titulaires',JSON.stringify(storage))
			
		})

		var storageJSON = localStorage.getItem('titulaires')
		if(storageJSON != null){
			var myStorage = JSON.parse(storageJSON)
			myStorage.map((data)=>{
				var nom = data.filname
				var prix = data.prixfil
				var prof = data.prof
				var tr = document.createElement('tr')
				tr.innerHTML = `<td>${nom} </td><td>${prof}</td><td>${prix.toLocaleString('en-US')}</td>`
				document.getElementById('parent5').appendChild(tr)
			})
		}

		var sucursaleJSON = localStorage.getItem("sucursale")
		if(sucursaleJSON!=null){
		  var sucursale = JSON.parse(sucursaleJSON)
		  sucursale.map((data)=>{
			var nom = data.nom
			var option = document.createElement('option')
			option.innerHTML = nom
			option.setAttribute('value',nom)
			document.getElementById('sucursale').appendChild(option)
			document.getElementById('scol_sucursale').appendChild(option)
		  })
	}

	var annee_en_coursJSON = localStorage.getItem('annee_en_cours')
	if(annee_en_coursJSON !=null){
		var annee_en_cours = JSON.parse(annee_en_coursJSON)
		annee_en_cours.map((data)=>{
			var annee_en_cours = data.annee_en_cours
			var option = document.createElement('option')
			option.innerHTML = annee_en_cours
			document.getElementById('anneeScolaire').appendChild(option)
			document.getElementById('Tri_recu').appendChild(option)
			document.getElementById('tri_scol').appendChild(option)
		})
	}

	

   db.collection('etudiants').where('admis','==',false).get().then((c)=>{
	var size = c.size
	c.docs.map((data)=>{
		var id = data.id
		var dd = data.data().date.toDate().getDate('fr-FR')
		var mm = data.data().date.toDate().getMonth('fr-FR')
		var yy = data.data().date.toDate().getFullYear('fr-FR')
		const{nom,prenom,sexe,filiere,niveau,address,age,admis,exclus}= data.data()
		 obj = {age,filiere,nom,prenom,sexe,filiere,niveau,address,admis,exclus,id,size,dd,yy,mm}
		 attenteArr.push(obj);
   })
   localStorage.setItem('attente',JSON.stringify(attenteArr))
   })
   
	db.collection('etudiants').onSnapshot((res)=>{
		var size = res.size
	res.docs.map((data)=>{
		var id = data.id
		var dd = data.data().date.toDate().getDate('fr-FR')
		var mm = data.data().date.toDate().getMonth('fr-FR')
		var yy = data.data().date.toDate().getFullYear('fr-FR')
		const{nom,prenom,sexe,filiere,niveau,address,age,admis,exclus}= data.data()
		 obj = {age,filiere,nom,prenom,sexe,filiere,niveau,address,admis,exclus,id,size,dd,yy,mm}
		 etudArr.push(obj);
	})
  localStorage.setItem('etudiants',JSON.stringify(etudArr))
})



db.collection(`annee scolaire/${annee}/recu`).get().then((c)=>{
	var total_payer = 0
	var total_restant = 0
	var budget = 0
	c.docs.map((c)=>{
		var somme = parseInt(c.data().montant_payer)
		total_payer = total_payer + somme
		total_restant = total_restant + c.data().reste_payer
		budget = budget + c.data().total
	})
	scol ={total_payer,budget,total_restant}
	localStorage.setItem('scol',JSON.stringify(scol))
})

var scolJSON = localStorage.getItem('scol')
if(scolJSON != null){
	var scol = JSON.parse(scolJSON)
	document.getElementById('ecolage').innerHTML = scol.total_payer.toLocaleString('en-US')
	document.getElementById('ecolage2').innerHTML = scol.total_payer.toLocaleString('en-US')
	document.getElementById('scolarite_total').innerHTML = scol.budget.toLocaleString('en-US')
	document.getElementById('restant').innerHTML = scol.total_restant.toLocaleString('en-US')

	}
db.collection(`annee scolaire/${annee}/recu`).get().then((shot)=>{
	shot.docs.map((doc)=>{
		var id = doc.id
		var dd = doc.data().date.toDate().getDate('fr-FR')
		var mm = doc.data().date.toDate().getMonth('fr-FR')
		var yy = doc.data().date.toDate().getFullYear('fr-FR')
		const {niveau,filiere,nom,prenom,montant_payer,reste_payer,total} = doc.data()
		obj = {niveau,filiere,nom,prenom,montant_payer,reste_payer,dd,mm,yy,id,total}
		recuArr.push(obj)
	})
	localStorage.setItem('reçu',JSON.stringify(recuArr))
})






db.collection(`annee scolaire/${annee}/filieres`).onSnapshot((snap)=>{
	snap.docs.map((data)=>{
		var id = data.id
		const{filname,prixfil} = data.data()
		// [Array...]
		obj = {filname,prixfil,id}
		filieres.push(obj)
	})
	localStorage.setItem('filieres',JSON.stringify(filieres))
	
})
var filiereJSON = localStorage.getItem('filieres')
if(filiereJSON != null){
	var filiere = JSON.parse(filiereJSON)
	filiere.map((doc)=>{
		var id = doc.id
		var nomfil = doc.filname
		var prixfil = doc.prixfil
		var option = document.createElement('option')
		var option2 = document.createElement('option')
		option.innerHTML = nomfil
		option2.innerHTML = nomfil
		option.setAttribute("value", id)
		option2.setAttribute("value", nomfil)
		document.getElementById("filtrfiliere").appendChild(option)
		document.getElementById("inputFiliere").appendChild(option2)
      
	})

}





db.collection(`annee scolaire/${annee}/niveaux`).onSnapshot((snap)=>{
	snap.docs.map((data)=>{
		const{niv,nivprix} = data.data()
		obj = {niv,nivprix}
		niveaux.push(obj)
	})
	localStorage.setItem('niveaux',JSON.stringify(niveaux))
})
var niveauJSON = localStorage.getItem('niveaux')
if(niveauJSON != null){
	var niveau = JSON.parse(niveauJSON)
	niveau.map((doc)=>{
		var niv = doc.niv
		var nivprix = doc.nivprix
		var id = doc.id
		// console.log(nomfil)
		var option = document.createElement('option')
		option.innerHTML = niv
		option.setAttribute("value", niv)
		document.getElementById("inputNiveau").appendChild(option)
	})
}

db.collection('personnel').onSnapshot((snap)=>{
	snap.docs.map((data)=>{
		var id = data.id
		const {nom,prenom,adres,filiere,exclus,connected,contact,mail,poste,sexe} = data.data()
		obj = {nom,prenom,adres,sexe,poste,contact,id,filiere,exclus,connected,mail}
		user.push(obj)
	})
 localStorage.setItem('personnel',JSON.stringify(user))
})
var usersJSON = localStorage.getItem('personnel')
if(usersJSON != null){
	var users = JSON.parse(usersJSON)
	users.map((doc)=>{
		var nom = doc.nom
		var id = doc.id
		var adres = doc.adres
		var sexe = doc.sexe
		var contact = doc.contact
		var prenom = doc.prenom
		var poste = doc.poste
		var exclus = doc.exclus
		var connected = doc.connected
		var tr = document.createElement('tr')
		var statut = ""
		var connect = ""
		connected? connect = "Connecté":connect = "Déconnecté"	
		if(!exclus){
			statut = "En règle"
			tr.innerHTML=`<td>${nom}</td><td>${prenom}</td><td>${poste}</td><td style="text-decoration:underline;cursor:pointer;"
			data-bs-toggle="modal" data-bs-target="#exampleModalDossierPersonnel" onclick="showPersonal('${id}')">Afficher détails</td>
			<td><span class="badge bg-success">${statut}</span></td><td>${connect}</td><td><button class="btn-close" aria-label="close"
			data-bs-toggle="modal" data-bs-target="#staticBackModalPersonel" onclick="exclureProf('${id}')"></button></td>`
		}else{
			
			statut = "Licencié"
			tr.innerHTML=`<td>${nom}</td><td>${prenom}</td><td>${poste}</td><td style="text-decoration:underline;cursor:pointer;">Afficher détails</td>
			<td><span class="badge bg-danger">${statut}</span></td><td>${connect}</td><td><button class="btn-close" aria-label="close"
			data-bs-toggle="modal" data-bs-target="#staticBackModalPersonel" onclick="exclureProf('${id}')"></button></td>`
		}
		document.getElementById('parent4').appendChild(tr)
	})
}
 db.collection('personnel').where('poste','==',"professeur").get().then((doc)=>{
	doc.docs.map((data)=>{
		const {nom,prenom}= data.data()
		obj ={nom,prenom}
		professeurs.push(obj)
	})
	localStorage.setItem('professeurs',JSON.stringify(professeurs))
})
var professeurJSON = localStorage.getItem('professeurs')
if(professeurJSON != null)
{
	var professeur =JSON.parse(professeurJSON)
	professeur.map((doc)=>{
		var nom = doc.nom
		var prenom = doc.prenom
		var option = document.createElement('option')
		var identite = `${nom} ${prenom}`
		option.innerHTML = identite
		// console.log(option)
		option.setAttribute("value",identite)
		document.getElementById('filtrprof').appendChild(option)
	})
}

var attenteJSON = localStorage.getItem('attente')
if(attenteJSON != null)
{
	var attente = JSON.parse(attenteJSON)
	attente.map((d)=>{
		var size = d.size
		document.getElementById('attente').innerHTML = size
		document.getElementById('attente2').innerHTML = size
	})
}

var recuJSON = localStorage.getItem('reçu')
if(recuJSON != null)
{
	var recu = JSON.parse(recuJSON)
	recu.map((doc)=>{
		var nom = doc.nom
		var prenom = doc.prenom
		var dd= doc.dd
		var mm= doc.mm
		var yy= doc.yy
		var id = doc.id
		var tr = document.createElement('tr')
		tr.innerHTML = `<td>${nom}</td><td>${prenom}</td><td>${dd}/${mm}/${yy}</td><td style="text-decoration:underline;
		cursor:pointer;"onclick="showRecu('${id}')"  data-bs-toggle="modal" data-bs-target="#staticBackre">Afficher plus</td>`
		document.getElementById('parent3').appendChild(tr)
	})
}


var etudiantJSON = localStorage.getItem('etudiants')
if(etudiantJSON != null)
{
	var etudiant = JSON.parse(etudiantJSON)
	etudiant.map((doc)=>{
		var size = doc.size
		var id = doc.id
		var nom = doc.nom
		var prenom = doc.prenom
		var age = doc.age
		var filiere = doc.filiere
		var cycle = doc.niveau
		var admis = doc.admis
		var exclus = doc.exclus
		var statut =""
		var tr = document.createElement('tr')
		if(admis){
			statut = 'Admis'
			tr.innerHTML = `<td>${nom}</td><td>${prenom}</td><td>${age}</td><td>${filiere}</td> 
		<td>${cycle}</td><td><span class="badge bg-success">${statut}</span></td><td style="text-decoration:underline;cursor:pointer;" onclick="solde('${id}')"
		data-bs-toggle="modal" data-bs-target="#staticBackdrop7">Solder le compte</td><td><button type="button"  class="btn-close " aria-label="Close" data-bs-toggle="modal"
		data-bs-target="#staticBack"onclick="exclure('${id}')" ></button>`
		}else{
			statut = "En attente"
			tr.innerHTML = `<td>${nom}</td><td>${prenom}</td><td>${age}</td><td>${filiere}</td> 
		<td>${cycle}</td><td><span class="badge bg-secondary">${statut}</span></td><td style="text-decoration:underline;cursor:pointer;"onclick="solde('${id}')"
		data-bs-toggle="modal" data-bs-target="#staticBackdrop7">Solder le compte</td><td><button type="button" class="btn-close" aria-label="Close" data-bs-toggle="modal"
		data-bs-target="#staticBack"onclick="exclure('${id}')"></button>`
		}if(exclus){
			statut = "Exclus"
			tr.innerHTML = `<td>${nom}</td><td>${prenom}</td><td>${age}</td><td>${filiere}</td> 
		<td>${cycle}</td><td><span class="badge bg-danger">${statut}</span></td><td style="text-decoration:underline;cursor:pointer;"onclick="solde('${id}')"
		data-bs-toggle="modal" data-bs-target="#staticBackdroperror">Solder le compte</td><td><button type="button" class="btn-close" aria-label="Close" 
		data-bs-toggle="modal"data-bs-target="#staticBack"onclick="exclure('${id}')"data-bs-toggle="modal" data-bs-target="#staticBackdrop7"></button>`
		}
		
		document.getElementById('parent').appendChild(tr)
		document.getElementById('inscrit').innerHTML = size
		document.getElementById('inscrit2').innerHTML = size

	})
}
if(etudiantJSON!= null)
{
	var etudiant = JSON.parse(etudiantJSON)
	etudiant.map((doc)=>{
		var id = doc.id
		var dd = doc.dd
		var mm = doc.mm
		var yy = doc.yy
		var nom = doc.nom
		var prenom = doc.prenom
		let tr = document.createElement('tr')
	tr.innerHTML = `<td>${nom}</td><td>${prenom}</td><span style="text-decoration: underline;" data-bs-toggle="modal" data-bs-target="#exampleModalDossierEleve" 
	onclick="get_student('${id}')">Afficher le dossier</span></td><td>${dd}/${mm}/${yy}</td>`
	document.getElementById('parent1').appendChild(tr)
	})
}










 



const  showRecu = async (e)=>{
await	db.collection(`annee scolaire/${annee}/recu`).doc(e).get().then((doc)=>{

		const {niveau,filiere,nom,prenom,montant_payer,reste_payer,sucursale,total} = doc.data()
		obj = {niveau,filiere,nom,prenom,montant_payer,reste_payer,sucursale,total}
		recusArr.push(obj)	
	})
	localStorage.setItem('reçus',JSON.stringify(recusArr))
		// console.log(JSON.stringify(recusArr))
	var recusJSON = localStorage.getItem('reçus')
	// console.log(recusJSON)
	if(recusJSON != null)
	{
		
		var div = document.createElement('div')
		document.getElementById('body').innerHTML =""
		var recus = JSON.parse(recusJSON)
		recus.map((doc)=>{
			var total = doc.total.toLocaleString('en-US')
			var nom = doc.nom
			var cycle = doc.niveau
			var prenom = doc.prenom
			var filiere = doc.filiere
			var reste_payer = doc.reste_payer.toLocaleString('en-US')
			var montant_payer = doc.montant_payer.toLocaleString('en-US')
			
			div.innerHTML = ` <p><strong>Nom du payant</strong>: ${nom} </p>
			<p><strong>Prenom du payant</strong>: ${prenom} </p>
			<p><strong>Montant payé</strong>: ${montant_payer} </p>
			<p><strong>Reste à payer</strong>: ${reste_payer} </p>
			<p><strong>Total à payer</strong>: ${total} </p>
			<p><strong>Elève inscrit en</strong>: ${filiere} <strong>de cycle</strong>: ${cycle} </p>`
			document.getElementById('body').appendChild(div)
  })

}

}
const  get_student = async (e)=>{
	// console.log(e)
await	db.collection("etudiants").doc(e).get().then((doc)=>{
		const {niveau,filiere,nom,prenom,address,age,contact,lieunaiss,naiss,sexe,tuteur} = doc.data()
		obj = {niveau,filiere,nom,prenom,address,age,contact,lieunaiss,naiss,sexe,tuteur}
		dossierArr.push(obj)	
	})
	localStorage.setItem('dossier_etudiant',JSON.stringify(dossierArr))
	var student_dossierJSON = localStorage.getItem('dossier_etudiant')
	// console.log(recusJSON)
	if(student_dossierJSON != null)
	{
		
		var div = document.createElement('div')
		document.getElementById('student_dossier').innerHTML =""
		var student_dossier = JSON.parse(student_dossierJSON)
		student_dossier.map((doc)=>{
			var sexe = doc.sexe
			var tuteur = doc.tuteur
			var contact = doc.contact
			var adress = doc.address
			var age = doc.age
			var naiss = doc.naiss
			var lieunaiss = doc.lieunaiss
			var nom = doc.nom
			var cycle = doc.niveau
			var prenom = doc.prenom
			var filiere = doc.filiere
			
			div.innerHTML = ` <p><strong>Nom de l'élève</strong>: ${nom} </p>
			<p><strong>Prenom de l'élève</strong>: ${prenom} </p>
			<p><strong>Age de l'élève</strong>: ${age} </p>
			<p><strong>Tuteur</strong>: ${tuteur} </p>
			<p><strong>Contact</strong>: ${contact} </p>
			<p><strong>Lieu de naissance</strong>: ${lieunaiss} </p>
			<p><strong>Date  de naissance</strong>: ${naiss} </p>
			<p><strong>Adresse</strong>: ${adress} </p>
			<p><strong>Sexe</strong>: ${sexe} </p>
			<p><strong>Cycle</strong>: ${cycle} </p>
			<p><strong>Elève inscrit en</strong>: ${filiere}`
			document.getElementById('student_dossier').appendChild(div)
  })

}

}
const  showPersonal = async (e)=>{
await	db.collection('personnel').doc(e).get().then((doc)=>{

		const {nom,prenom,adres,contact,sexe,poste} = doc.data()
		obj = {nom,prenom,adres,contact,sexe,poste}
		personalArr.push(obj)
		// console.log(personalArr)	
	})
	localStorage.setItem('personal',JSON.stringify(personalArr))
		// console.log(JSON.stringify(personalArr))
	var personalJSON = localStorage.getItem('personal')
	// console.log(personalJSON)
	if(personalJSON != null)
	{
		var div = document.createElement('div')
		document.getElementById('personal').innerHTML =""
		var personal = JSON.parse(personalJSON)
		personal.map((doc)=>{
			var poste = doc.poste
			var nom = doc.nom
			var sexe = doc.sexe
			var prenom = doc.prenom
			var adres = doc.adres
			var contact = doc.contact
			
			div.innerHTML = ` <p><strong>Nom </strong>: ${nom} </p>
			<p><strong>Prenom </strong>: ${prenom} </p>
			<p><strong>Poste</strong>: ${poste} </p>
			<p><strong>Adresse</strong>: ${adres} </p>
			<p><strong>Contact</strong>: ${contact} </p>
			<p><strong>Sexe</strong>: ${sexe} </p>`
			document.getElementById('personal').appendChild(div)
  })

}

}



const registerSec=()=>{
	var exclus = false
	 var sexe =""
	 var poste ="secretaire"
	const auth = firebase.auth()
	const db = firebase.firestore()
	var nom = document.getElementById('name_sec').value
	var prenom = document.getElementById('prenom_sec').value
	var mail = document.getElementById('mail_sec').value
	var passwd = "123456"
	var adres = document.getElementById('adres_sec').value
	var contact = document.getElementById('contact_sec').value
	var homme = document.getElementById('homme_sec').checked
	homme? sexe = "H":sexe="F"

   if(nom==""||nom==" " || prenom==""|| prenom==" " || mail==""||mail==" " || adres ==""|| adres==" " 
   || contact ==""||contact==" "||mail==''||mail==" ")
   {
	   alert('veuillez renseigner tous les champs')
   }else{
	   var myObj = {nom,prenom,mail,adres,contact,sexe,exclus,poste}
	   auth.createUserWithEmailAndPassword(mail, passwd).then((userCredential)=>{
		   db.collection('personnel').doc(userCredential.user.uid).set(myObj).then(()=>{
			   console.log('user successfully added with',userCredential.user.uid)
		   })
	   }).catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode, errorMessage)
	})
   }

   document.getElementById('form_sec').reset()

}


const registerProf=()=>{
	var exclus = false
	 var sexe =""
	 var poste ="professeur"
	const auth = firebase.auth()
	const db = firebase.firestore()
	var nom = document.getElementById('name').value
	var prenom = document.getElementById('prenom_prof').value
	var mail = document.getElementById('mail').value
	var passwd = "123456"
	var adres = document.getElementById('adres').value
	var filiere = document.getElementById('fil').value
	var contact = document.getElementById('contact').value
	var homme = document.getElementById('homme').checked
	homme? sexe = "H":sexe="F"

   if(nom==""||nom==" " || prenom_sec==""|| prenom_sec==" " || mail==""||mail==" " || adres ==""|| adres==" " 
   || contact ==""||contact==" "||mail==''||mail==" ")
   {
	  alert("veuillez remplir tous les champs")
   }else{
	   var myObj = {nom,prenom,mail,adres,contact,sexe,exclus,poste,filiere}
	   auth.createUserWithEmailAndPassword(mail, passwd).then((userCredential)=>{
		   db.collection('personnel').doc(userCredential.user.uid).set(myObj).then(()=>{
			   console.log('user successfully added with',userCredential.user.uid)
		   })
	   }).catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode, errorMessage)
	})
   }

}

const add_annee =()=>{
	var choose_scol = document.getElementById('choose_scol').value
	var test = choose_scol.split('')
	if(test[0] != "2")
	{
		return document.getElementById('dateError').style.display = 'block'
	}else{
		db.collection('annee').add({annee_en_cours:choose_scol}).then(()=>{
			document.getElementById('sucessInsert').style.display ="block"
		})
	}
	
}


const registerCais=()=>{
	var exclus = false
	 var sexe =""
	 var poste ="secretaire"
	const auth = firebase.auth()
	const db = firebase.firestore()
	var nom = document.getElementById('name_ca').value
	var prenom = document.getElementById('prenom_ca').value
	var mail = document.getElementById('mail_ca').value
	var passwd = "123456"
	var adres = document.getElementById('adres_ca').value
	var contact = document.getElementById('contact_ca').value
	var homme = document.getElementById('homme_ca').checked
	homme? sexe = "H":sexe="F"

   if(nom==""||nom==" " || prenom==""|| prenom==" " || mail==""||mail==" " || adres ==""|| adres==" " 
   || contact ==""||contact==" "||mail==''||mail==" ")
   {
	   alert('veuillez renseigner tous les champs')
   }else{
	   var myObj = {nom,prenom,mail,adres,contact,sexe,exclus,poste}
	   auth.createUserWithEmailAndPassword(mail, passwd).then((userCredential)=>{
		   db.collection('personnel').doc(userCredential.user.uid).set(myObj).then(()=>{
			   console.log('user successfully added with',userCredential.user.uid)
		   })
	   }).catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode, errorMessage)
	})
   }

   document.getElementById('form_cais').reset()

}





const filier = ()=>{
	var anneeScolaire = document.getElementById('anneeScolaire').value
     var filname = document.getElementById('filname').value
     var prixfil = document.getElementById('prixfil').value
	 var obj = {filname,prixfil}
	 const db = firebase.firestore()
	 db.collection(`annee scolaire/${anneeScolaire}/filieres`).add(obj).then(()=>{
		 console.log('ok insertion reussie')
	 })

}

const nivo = ()=>{
	var anneeScolaire = document.getElementById('anneeScolaire').value
	var niv = document.getElementById('niv').value
	var nivprix = document.getElementById('nivprix').value
	var obj = {niv,nivprix}
	const db = firebase.firestore()
	db.collection(`annee scolaire/${anneeScolaire}/niveaux`).add(obj).then(()=>{
		console.log('ok insertion reussie')
	})

}
const titulair = ()=>{
	var anneeScolaire = new Date().getFullYear()
	var filiere = document.getElementById('filtrfiliere').value
	var prof = document.getElementById('filtrprof').value
	const db = firebase.firestore()
	db.collection(`annee scolaire/${anneeScolaire}/filieres`).doc(filiere).update({
		prof:prof
	}).then(()=>{
		console.log('insertion reussie')
	})
}

const regsiterStudent = async ()=>{
const db = firebase.firestore()
var reduction = document.getElementById('reduction').value
var sexe =""
var admis = false
var exclus = false
var boy = document.getElementById('boy').checked
var sucursale = document.getElementById('sucursale').value
var contact = document.getElementById('inputContact').value
var niveau = document.getElementById('inputNiveau').value
var filiere = document.getElementById('inputFiliere').value
var naiss = document.getElementById('naiss').value
var tuteur = document.getElementById('tuteur').value
var lieunaiss = document.getElementById('lieunaiss').value
var age = document.getElementById('inputAge').value
var address = document.getElementById('inputAddress').value
var nom = document.getElementById('inputNom').value
var prenom = document.getElementById('inputPrenom').value
boy? sexe = "H":sexe ="F"
var date = new Date()
var etudiant ={address,age,contact,filiere,niveau,lieunaiss,naiss,sexe,
admis,tuteur,nom,prenom,sucursale,exclus,date}

var id = ""
await db.collection('etudiants').add(etudiant).then((doc)=>{
	id = doc.id
})

var prix_filiere = ""
var prix_cycle = ""
await db.collection(`annee scolaire/${annee}/filieres`).where("filname","==",filiere).get().
then((c)=>{
	c.docs.map((d)=>{
		prix_filiere = d.data().prixfil
	})
})
await db.collection(`annee scolaire/${annee}/niveaux`).where("niv","==",niveau).get().
then((c)=>{
	c.docs.map((d)=>{
		prix_cycle = d.data().nivprix
	})

	})
if(reduction =="") reduction = 0
var montant_payer = 0
var reste_payer = 0
var  total = 0
 prix_filiere = parseInt(prix_filiere)
 prix_cycle = parseInt(prix_cycle)
 reduction = parseFloat(reduction)
 var recu ={nom,prenom,montant_payer,total,reste_payer,filiere,sucursale,niveau,prix_filiere,prix_cycle,reduction,date}

 db.collection(`annee scolaire/${annee}/recu`).doc(id).set(recu).then(()=>{
	 console.log('ok ok')
 })


}


	var prixfiliere = 0
	var prixcycle = 0
	var reduction = 0
	var total = 0
	var date = new Date()
	var docid = ""

const solde=async (e)=>{
	docid = e
	await db.collection(`annee scolaire/${annee}/recu`).doc(e).get().then((c)=>{
		prixfiliere = c.data().prix_filiere
		prixcycle = c.data().prix_cycle
		reduction = c.data().reduction
		
	})
	 total = prixcycle + prixfiliere * reduction
	
	// console.log(prixfiliere)

}

 const registerRecu = ()=>{

	var montant = document.getElementById('montant').value
	if(montant > total || montant == 0 )
	{
		document.getElementById('error').style.display = 'block'
	}
	
	if(montant < total)
	{
		var reste = total - montant
		if (reste == 0 ) document.getElementById('error').style.display = 'block'
		db.collection(`annee scolaire/${annee}/recu`).doc(docid).update({
			montant_payer : montant,
			date:date,
			reste_payer:reste,
			total:total

		}).then(()=>{
			db.collection('etudiants').doc(docid).update({
				admis:true
			})
			console.log("document update")
			document.getElementById('error').style.display = 'none'
		})
	}else console.log('erreur')

	document.getElementById('form_montant').reset()
}

const hello = async ()=>{
	var choix_sucursale = document.getElementById('scol_sucursale'). value
	console.log(choix_sucursale)
	// console.log(scol_sucursale)
	await db.collection(`annee scolaire/${annee}/recu`).where('sucursale','==',choix_sucursale).get().then((c)=>{
	var total_payer = 0
	var total_restant = 0
	var budget = 0
	var nom =""
	c.docs.map((c)=>{
		var somme = parseInt(c.data().montant_payer)
		total_payer = total_payer + somme
		total_restant = total_restant + c.data().reste_payer
		budget = budget + c.data().total
		nom = c.data().sucursale
	})
	scol_sucursale ={total_payer,budget,total_restant,nom}
	localStorage.setItem('scolSucursale',JSON.stringify(scol_sucursale))
	console.log(JSON.stringify(scol_sucursale))
	})

	var scolSucucrsaleJSON = localStorage.getItem('scolSucursale')
	if(scolSucucrsaleJSON != null)
	{
		var scolSucursale = JSON.parse(scolSucucrsaleJSON)

			var div = document.createElement('div')
			document.getElementById('details').innerHTML = ""
			// console.log(scolSucursale.nom)
			if(scolSucursale.nom == "" && scolSucursale.total_payer == 0 && scolSucursale.budget == 0 && scolSucursale.total_restant == 0)
			{
				div.innerHTML = ""
				document.getElementById('details').appendChild(div)
				return
			}
			div.innerHTML = `<p><strong>Nom sucursale</strong>:${scolSucursale.nom} </p>
			<p><strong>Total payer</strong>:${scolSucursale.total_payer.toLocaleString('en-US')} </p>
			<p><strong>Reste à payer</strong>:${scolSucursale.total_restant.toLocaleString('en-US')} </p>
			<p><strong>Scolarité total cette année</strong>:${scolSucursale.budget.toLocaleString('en-US')}</p>`
			document.getElementById('details').appendChild(div)
			document.getElementById('details').style.display = "block"
		
	}

}

var id_el_modifier="";
var id_perso_suppri = ""
const exclure =(id_etudiant)=>{
	id_el_modifier=id_etudiant;
}
const exclureProf =(id_prof)=>{
	id_perso_suppri= id_prof;
}
const supprimer_eleve =(mot)=>{
	if(mot.innerHTML == "OUI")
	{
		document.getElementById('sucessValid').innerHTML ="En attente"
	db.collection('etudiants').doc(id_el_modifier).update({
		exclus:true
	}).then(()=>{
		document.getElementById('sucessValid').innerHTML ="OUI"
		document.getElementById('successMessage').style.display="block"
	})
	}
	
}
const supprimer_prof =(mot)=>{
	if(mot.innerHTML == "OUI")
	{
		document.getElementById('sucessValidProf').innerHTML ="En attente"
	db.collection('personnel').doc(id_perso_suppri).update({
		exclus:true
	}).then(()=>{
		document.getElementById('sucessValidProf').innerHTML ="OUI"
		document.getElementById('successMessageProf').style.display="block"
	})
	}
	
}




const arr = ["card","dossier","historique","list_personnel","scolarite","nos_filiere",]
const tri =(e) =>{
	const data = e.dataset.value
	var tab = arr.filter(el=> el != data)
	tab.map(el=> document.querySelector(`#${el}`).style.display ="none")
	document.getElementById(data).style.display = "block"
}


 
const searchStudent =(e)=>{
	document.getElementById('parent').innerHTML =""
	document.getElementById('closure').style.display ="block"
	const research = e.target.value.toLowerCase();
	var etudiant = JSON.parse(etudiantJSON);
	const result = etudiant.filter((e)=>{
		const base = e.nom.toLowerCase();
		return base.indexOf(research) >=0;
	})
	console.log(result)
	result.map(elmt => {
		var statut =""
		var tr = document.createElement('tr')
		if(elmt.admis){
			statut = 'Admis'
			tr.innerHTML = `<td>${elmt.nom}</td><td>${elmt.prenom}</td><td>${elmt.age}</td><td>${elmt.filiere}</td> 
		<td>${elmt.niveau}</td><td><span class="badge bg-success">${statut}</span></td><td style="text-decoration:underline;cursor:pointer;" onclick="solde('${elmt.id}')"
		data-bs-toggle="modal" data-bs-target="#staticBackdrop7">Solder le compte</td><td><button type="button"  class="btn-close " aria-label="Close" data-bs-toggle="modal"
		data-bs-target="#staticBack"onclick="exclure('${elmt.id}')" ></button>`
		 }else{
			statut = "En attente"
			tr.innerHTML = `<td>${elmt.nom}</td><td>${elmt.prenom}</td><td>${elmt.age}</td><td>${elmt.filiere}</td> 
		<td>${elmt.niveau}</td><td><span class="badge bg-secondary">${statut}</span></td><td style="text-decoration:underline;cursor:pointer;"onclick="solde('${elmt.id}')"
		data-bs-toggle="modal" data-bs-target="#staticBackdrop7">Solder le compte</td><td><button type="button" class="btn-close" aria-label="Close" data-bs-toggle="modal"
		data-bs-target="#staticBack"onclick="exclure('${elmt.id}')"></button>`
		}if(elmt.exclus){
			statut = "Exclus"
			tr.innerHTML = `<td>${elmt.nom}</td><td>${elmt.prenom}</td><td>${elmt.age}</td><td>${elmt.filiere}</td> 
		<td>${elmt.niveau}</td><td><span class="badge bg-danger">${statut}</span></td><td style="text-decoration:underline;cursor:pointer;"onclick="solde('${elmt.id}')"
		data-bs-toggle="modal" data-bs-target="#staticBackdrop7">Solder le compte</td><td><button type="button" class="btn-close" aria-label="Close" 
		data-bs-toggle="modal"data-bs-target="#staticBack"onclick="exclure('${elmt.id}')"data-bs-toggle="modal" data-bs-target="#staticBackdrop7"></button>`
		}else console.log('error')
		document.getElementById('parent').appendChild(tr)
	});
}
const get_delete =()=>{
	document.getElementById('search').value =""
	// console.log("hello")
}

const modifier_password = ()=>{
	var uemail =""
	var uid =""
	auth.onAuthStateChanged((user) => {
	if (user) {
	  uid = user.uid;
	 uemail = user.email
	 auth.sendPasswordResetEmail(uemail).then(() => {
		alert('Email de vérification envoyé')
	  }).catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorMessage,errorCode);
  
	  });
	  return
	  
	} else {
	location.href = 'login.html'
	}
  });
  
 

}




const desconnect = () => {
	var uid =""
	auth.onAuthStateChanged((user)=>{
		if(user)
		{
			uid = user.uid
			db.collection('personnel').doc(uid).update({
				connected:false
			})
			auth.signOut().then(() => {
				console.log('deconnecte avec success !')
				location.href ="login.html"
			}).catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorMessage)
			})

			}

			})

}