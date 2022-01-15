const URL_PATIENT = "http://test.fhir.org/r4/Patient"
const UNKNOWN_VALUE = "Inconnu"

let patients = [] 
let patientsIndexToDisplay = 0 
let currentPatientSelected = 0

let patientList = document.getElementById("patientList")
let patientTitle = document.getElementById("patientTitle")

let personnalInformations = document.getElementById("personnalInformations")
let inputPersonnalInformations = document.getElementById("personnalInformationsInput")

let patientName = document.getElementById("patientName")
let patientBirthday = document.getElementById("patientBirthday")
let patientGender = document.getElementById("patientGender")
let patientMarried = document.getElementById("patientMarried")

let patientCity = document.getElementById("patientCity")
let patientStreet = document.getElementById("patientStreet")
let patientZipCode = document.getElementById("patientZipCode")
let patientState = document.getElementById("patientState")
let patientCountry = document.getElementById("patientCountry")
let patientAdress = document.getElementById("patientAdress")

let patientSystem = document.getElementById("patientSystem")
let patientValue = document.getElementById("patientValue")
let patientUsage = document.getElementById("patientUsage")

let previousButton = document.getElementById("peviousButton")
let nextButton = document.getElementById("nextButton")
let deleteButton = document.getElementById("deleteButton")
let updateButton = document.getElementById("updateButton")


window.addEventListener("load", fetchPatients )

previousButton.addEventListener("click", () => {
    onPreviousClicked()
})
nextButton.addEventListener("click", () => {
    onNextClicked()
})

deleteButton.addEventListener("click", () => {
    deletePatient()
})


// Recuperes tous les patients via l'API REST
function fetchPatients() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var parsedResult = JSON.parse(this.responseText)
            updatePatientsList(parsedResult.entry)
        }
    };    
  xhttp.open("GET", URL_PATIENT, true);
  xhttp.setRequestHeader("Accept","application/fhir+json")
  xhttp.setRequestHeader("Content-Type","application/fhir+json")
  xhttp.send();
}

// Supprime un patient
function deletePatient(){

    var url = URL_PATIENT+"/"+ getSelectedPatientId()
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 204) {
           alert("Le patient N° + " + getSelectedPatientId() +  " a été supprimé")
        }
    };    
  xhttp.open("DELETE", url, true);
  xhttp.setRequestHeader("Accept","application/fhir+json")
  xhttp.setRequestHeader("Content-Type","application/fhir+json")
  xhttp.send();
}

// UPDATE PATIENT
function updatePatient(){

}


function updatePatientsList(newPatients) {
    patientTitle.textContent = "Liste des patients (" + newPatients.length +")" 
    for(let i = 0 ; i < newPatients.length; i++){
        patients.push(newPatients[i])
    }
    updateUIList()
    selectPatient(currentPatientSelected)
}


function selectPatient(patientIndex){  

    resetPatientFields()

    currentPatientSelected = patientIndex
    var currentPatient = patients[currentPatientSelected]
 
   
    var selectedPatient = document.getElementsByClassName("list-group-item active")
    selectedPatient[0].className = "list-group-item"

    var patientNotSelected = document.getElementsByClassName("list-group-item")
    patientNotSelected[currentPatientSelected%10].className = "list-group-item active"

    patientName.textContent = "Nom : " + currentPatient.resource.name[0].family
    patientBirthday.textContent = "Naissance : " + currentPatient.resource.birthDate
    patientGender.textContent = "Genre : " + currentPatient.resource.gender

    var maritalStatus = currentPatient.resource.maritalStatus != null ? currentPatient.resource.maritalStatus.coding[0].display : "inconnu"; 
    patientMarried.textContent = "Situation matrimoniale : " + maritalStatus

    patientCity.textContent = "Ville : " + currentPatient.resource.address[0].city
    patientStreet.textContent = "Rue : " + currentPatient.resource.address[0].line[0]
    patientZipCode.textContent = "Code postal : " + currentPatient.resource.address[0].postalCode
    patientState.textContent = "Etat : " + currentPatient.resource.address[0].state
    patientCountry.textContent = "Pays : " + currentPatient.resource.address[0].country
    patientAdress.textContent = "Type d'adresse : " + currentPatient.resource.address[0].use

    patientSystem.textContent = "Système : " + currentPatient.resource.telecom[0].system
    patientValue.textContent = "Valeur : " + currentPatient.resource.telecom[0].value
    patientUsage.textContent = "Usage : " + currentPatient.resource.telecom[0].use
}


function resetPatientFields(){
    patientName.textContent = "Nom : " + UNKNOWN_VALUE
    patientBirthday.textContent = "Naissance : " +UNKNOWN_VALUE
    patientGender.textContent = "Genre : " +UNKNOWN_VALUE

    patientCity.textContent = "Ville : " + UNKNOWN_VALUE
    patientStreet.textContent = "Rue : " + UNKNOWN_VALUE
    patientZipCode.textContent = "Code postal : " + UNKNOWN_VALUE
    patientState.textContent = "Etat " +UNKNOWN_VALUE
    patientCountry.textContent = "Pays : " +UNKNOWN_VALUE
    patientAdress.textContent = "Type d'adresse : " +UNKNOWN_VALUE

    patientSystem.textContent = "Système : " +UNKNOWN_VALUE
    patientValue.textContent = "Valeur : " + UNKNOWN_VALUE
    patientUsage.textContent = "Usage : " +UNKNOWN_VALUE
}

function getPatientsSize(){
    return patients.length
}

function getSelectedPatientId(){
    return patients[currentPatientSelected].resource.id
}

function updateUIList(){
    patientList.innerHTML = ""
    for(let i = patientsIndexToDisplay; i < (patientsIndexToDisplay+10); i++){
       

        var tag = document.createElement("li");

        if(i == currentPatientSelected){
            console.log("(active) i = " + i + " index = " + currentPatientSelected)
            tag.setAttribute("class","list-group-item active")
        }
        else{
            console.log("(inactive) i = " + i + " index = " + currentPatientSelected)
            tag.setAttribute("class","list-group-item")
        }

        console.log(patients[i])
        var text = document.createTextNode(patients[i].resource.name[0].family);

        tag.appendChild(text);
        tag.addEventListener('click',() => {
            selectPatient(i)
        })
        patientList.appendChild(tag)
    }
    selectPatient(currentPatientSelected)
}

function onPreviousClicked(){
    if(patientsIndexToDisplay -10 >= 0 ){
        patientsIndexToDisplay-=10;
        currentPatientSelected-=10;
        updateUIList()
    }
}

function onNextClicked(){
    if(patientsIndexToDisplay +10 < patients.length)
    {
        patientsIndexToDisplay+=10;
        currentPatientSelected+=10;
        updateUIList()
    }
}

function onUpdate(){
    inputPersonnalInformations.hidden = false;
    personnalInformations.hidden = true;
}

