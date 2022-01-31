const URL_PATIENT = "http://test.fhir.org/r4/Patient"
const UNKNOWN_VALUE = "Inconnu"

// Patient form informations
let genders = ["male", "female", "other", "unknown"]
let matrimonialeSituation = [{code : "M", display: "Married"}, {code : "D", display: "Divorced"},  {code : "A", display: "Annuled"},  {code : "U", display: "unmarried"},  {code : "S", display: "Never Married"}]
let adressUse = ["home", "work"]
let adressType = ["postal" , "physical", "both"]

let telecomUse = ["home", "work", "temp", "old", "mobile"]
let telecomSystem = ["phone", "fax", "email", "pager", "url", "sms", "other"]

let nameUse = ["usual", "official", "temp", "nickname", "anonymous" ,"old",  "maiden"]
let namePrefix = ["Mr", "Mrs", "Miss", "Ms"]


let patients = [] 
let patientsIndexToDisplay = 0 
let currentPatientSelected = 0

let createPatientSection = document.getElementById("createPatientSection")
let patientListSection = document.getElementById("patientContent")

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

let goToPatientFormButton = document.getElementById("goToPatientFormButton")
let createPatientButton = document.getElementById("createPatientButton")
let backToPatientListButton = document.getElementById("backToPatientListButton")

// Input fields 
let genderDropdown = document.getElementById("genderDropdown")
let adressTypeDropdown = document.getElementById("adressTypeDropdown")
let adressUsageDropdown = document.getElementById("adressUsageDropdown")
let telecomSystemDropdown = document.getElementById("telecomSystemDropdown")
let telecomUsageDropdown = document.getElementById("telecomUsageDropdown")
let nameUsageDropdown = document.getElementById("nameUsageDropdown")
let denominationDropdown = document.getElementById("denominationDropdown")
let maritalStatusDropdown = document.getElementById("maritalStatusDropdown")

let birthdatePicker = document.getElementById("birthDatePicker")
let nameInputField = document.getElementById("inputFieldCreateName")
let firtsNameInputField = document.getElementById("inputFieldCreateFirstName")
let cityInputField = document.getElementById("inputFieldCreateCity")
let streetInputField = document.getElementById("inputFieldCreateStreet")
let zipcodeInputField = document.getElementById("inputFieldCreateZipcode")
let stateInputField = document.getElementById("inputFieldCreateState")
let countryInputField = document.getElementById("inputFieldCreateCountry")
let phoneNumberInputField = document.getElementById("inputFieldCreatePhoneNumber")


window.addEventListener("load", () => {
    fetchPatients()
    populateSelect(genderDropdown, genders)
    populateSelect(adressTypeDropdown, adressType)
    populateSelect(adressUsageDropdown, adressUse)
    populateSelect(telecomSystemDropdown, telecomSystem)
    populateSelect(telecomUsageDropdown, telecomUse)
    populateSelect(nameUsageDropdown, nameUse)
    populateSelect(denominationDropdown, namePrefix)
    populateSelect(maritalStatusDropdown, matrimonialeSituation.map( matSituation =>  matSituation.display))
})

previousButton.addEventListener("click", () => {
    onPreviousClicked()
})
nextButton.addEventListener("click", () => {
    onNextClicked()
})

deleteButton.addEventListener("click", () => {
    deletePatient()
})

goToPatientFormButton.addEventListener("click", () => {
    patientListSection.style.display = 'none'
    createPatientSection.style.display = 'block'
})

backToPatientListButton.addEventListener("click", () => {
    patientListSection.style.display = 'block'
    createPatientSection.style.display = 'none'
})

createPatientButton.addEventListener("click", () => {
    createPatient()
})

// remplies un menu deroulant a partir d'une liste
function populateSelect(selectedId, values){

    for(i = 0 ; i < values.length ; i++){
        let option = document.createElement("option")
        let text = document.createTextNode(values[i])
        option.appendChild(text)
        option.setAttribute("value", values[i])
        selectedId.appendChild(option)
    }
}

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

function createPatient(){
    let name = nameInputField.value
    let firstName = firtsNameInputField.value
    let nameUse = nameUsageDropdown.value
    let maritalStatus =  matrimonialeSituation.find( x => x.display == maritalStatusDropdown.value) 
    let nameDenomination = denominationDropdown.value
    let birthdate = birthdatePicker.value
    let city = cityInputField.value
    let street = streetInputField.value
    let zipCode = zipcodeInputField.value
    let state = stateInputField.value
    let country = countryInputField.value
    let adressType = adressTypeDropdown.value
    let adressUsage = adressUsageDropdown.value
    let gender = genderDropdown.value
    let numberPhone = phoneNumberInputField.value
    let telecomSystemType = telecomSystemDropdown.value
    let telecomUsage = telecomUsageDropdown.value

    let json = {
        "resourceType":"Patient",
        "meta":{"versionId":"1","lastUpdated":"2022-01-31T09:19:20.834+00:00"},
        "text":{"status":"generated","div":"<div xmlns=\"http://www.w3.org/1999/xhtml\"><p>Patient: Fhirman, Sam</p></div>"},
        "identifier":[{"type":{"coding":[{"system":"http://hl7.org/fhir/v2/0203","code":"NI","display":"National unique individual identifier"}],
        "text":"IHI"},"system":"http://ns.electronichealth.net.au/id/hi/ihi/1.0","value":"8003608166690503"},
        {"use":"usual","type":{"coding":[{"system":"http://hl7.org/fhir/v2/0203","code":"MR"}]},
        "system":"urn:oid:1.2.36.146.595.217.0.1","value":"6666","period":{"start":"2001-05-06"},"assigner":{"display":"Acme Healthcare"}}],
        "name": [
            {
                "use": nameUse,
                "text": name + " " + firstName,
                "family": name,
                "given": [],
                "prefix": [
                    nameDenomination
                ]
            }
        ],
        "telecom" : [
            {
                "system" : telecomSystemType,
                "value": numberPhone,
                "use" : telecomUsage
            }
        ],
        "gender" : gender,
        "birthDate" : birthdate,
        "address" : [
            {
                "use" : adressUsage,
                "type" : adressType,
                
                "line" : [
                    street
                ],
                "city": city,
                "state" : state,
                "postalCode" : zipCode,
                "country" : country
            }
        ],
        "maritalStatus":{"coding":[{"system":"http://hl7.org/fhir/v3/MaritalStatus","code": maritalStatus.code,"display": maritalStatus.display}]}

    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            var parsedResult = JSON.parse(this.responseText)
            resetCreatePatientForm()
            alert("Le patient à été crée")

        }
    };    
    xhttp.open("POST", URL_PATIENT, true);
    xhttp.setRequestHeader("Accept","application/fhir+json")
    xhttp.setRequestHeader("Content-Type","application/fhir+json")
    xhttp.send(JSON.stringify(json));
}



function resetCreatePatientForm(){
    nameInputField.value = ""
    firtsNameInputField.value = ""
    cityInputField.value = ""
    streetInputField.value = ""
    zipcodeInputField.value = ""
    stateInputField.value = ""
    countryInputField.value = ""
    phoneNumberInputField.value = ""
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
            tag.setAttribute("class","list-group-item active")
        }
        else{
            tag.setAttribute("class","list-group-item")
        }

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

