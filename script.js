import { Patient } from "./model"

const URL_PATIENT = "http://hapi.fhir.org/baseR4/Patient"
const EMPTY_VALUE = ""
const UPDATE_PATIENT_TITLE = "Mettre à jour le patient"
const CREATE_PATIENT_TITLE = "Créer le patient"


// Patient form informations
let genders = ["male", "female", "other", "unknown"]
let matrimonialeSituation = [{code : "M", display: "Married"}, {code : "D", display: "Divorced"},  {code : "A", display: "Annuled"},  {code : "U", display: "unmarried"},  {code : "S", display: "Never Married"}]
let adressUse = ["home", "work"]
let adressType = ["postal" , "physical", "both"]
let telecomUse = ["home", "work", "temp", "old", "mobile"]
let telecomSystem = ["phone", "fax", "email", "pager", "url", "sms", "other"]
let nameUse = ["usual", "official", "temp", "nickname", "anonymous" ,"old",  "maiden"]
let namePrefix = ["Mr", "Mrs", "Miss", "Ms"]


let patientsobj = []
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
let savePatientButton = document.getElementById("savePatientButton")

let goToPatientFormButton = document.getElementById("goToPatientFormButton")
let createPatientButton = document.getElementById("createPatientButton")
let backToPatientListButton = document.getElementById("backToPatientListButton")

// Input fields 
let titlePatientForm = document.getElementById("titlePatientForm")

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
    titlePatientForm.textContent = CREATE_PATIENT_TITLE
    createPatientButton.style.display = 'block'
    savePatientButton.style.display = 'none'
})

backToPatientListButton.addEventListener("click", () => {
    patientListSection.style.display = 'block'
    createPatientSection.style.display = 'none'
})

createPatientButton.addEventListener("click", () => {
    createPatient()
})

updateButton.addEventListener("click", () => {
    resetPatientFields()
    displayUpdatePatientForm()
})

savePatientButton.addEventListener("click", () => {
    updatePatient()
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
        if (this.readyState == 4 && this.status == 200) {
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
    let newName = nameInputField.value

}

function displayUpdatePatientForm(){
    resetPatientFields()
    titlePatientForm.textContent = UPDATE_PATIENT_TITLE

    patientListSection.style.display = 'none'
    createPatientSection.style.display = 'block'
    createPatientButton.style.display = 'none'
    savePatientButton.style.display = 'block'

    let patientToUpdate = patientsobj[currentPatientSelected]

        nameInputField.value = patientToUpdate.getName()
        nameUsageDropdown.value = patientToUpdate.getName()
        denominationDropdown.value = patientToUpdate.getPrefix()
        birthdatePicker.value = patientToUpdate.getNaissance()
        cityInputField.value = patientToUpdate.getCity()
        streetInputField.value = patientToUpdate.getStreet()
        zipcodeInputField.value = patientToUpdate.getZipcode()
        stateInputField.value = patientToUpdate.getState()
        countryInputField.value = patientToUpdate.getCountry()
        adressUsageDropdown.value = patientToUpdate.getAddressUse()
        adressTypeDropdown.value = patientToUpdate.getAddressType()
        phoneNumberInputField.value = patientToUpdate.getTelecomValue()
        telecomSystemDropdown.value = patientToUpdate.getTelecomSystem()
        telecomUsageDropdown.value = patientToUpdate.getTelecomValue()
        genderDropdown.value = patientToUpdate.getGender()
        maritalStatusDropdown.value = patientToUpdate.getSituationMatrimonaiel()
}

function updatePatient(){

    let newName = nameInputField.value
    let newNameUsage = nameUsageDropdown.value
    let newMatrimonialSituation = maritalStatusDropdown.value
    let newPrefix = denominationDropdown.value
    let newBirthDate = birthDate.value
    let newCity = cityInputField.value
    let newStreet = streetInputField.value
    let newZipcode = zipcodeInputField.value
    let newState = stateInputField.value
    let newCountry = countryInputField.value
    let newAdressUse = adressUsageDropdown.value
    let newAdressType = adressTypeDropdown.valu
    let newGender = genderDropdown.value

    let newPhoneNumber = phoneNumberInputField.value
    let newTelecomSystem = telecomSystemDropdown.value
    let newTelecomUse = telecomUsageDropdown.value

    if(newPrefix != null){
        newPatient.name[0].prefix[0] = newPrefix
    }
    if(newNameUsage != null){
        newPatient.name[0].use = newNameUsage
    }
    if(newMatrimonialSituation != null){
        newPatient.maritalStatus.coding[0].display = newMatrimonialSituation
        newPatient.maritalStatus.coding[0].code =  matrimonialeSituation.find( x => x.display == newMatrimonialSituation) 
    }

    if(newCity != null){
        newPatient.address[0].city = newCity
    }
    if(newStreet != null){
        newPatient.address[0].line[0] = newStreet
    }
    if(newZipcode != null){
        newPatient.address[0].postalCode = newZipcode
    }
    if(newState != null){
        newPatient.address[0].state = newState
    }
    if(newCountry != null){
        newPatient.address[0].country = newCountry
    }
    if(newAdressUse != null){
        newPatient.address[0].use = newAdressUse
    }
    if(newAdressType != null){
        newPatient.address[0].type = newAdressType
    }

    if(newName != ""){
        newPatient.name[0].family = newName
    }
    if(newTelecomSystem != null){
        newPatient.telecom[0].system = newTelecomSystem
    }
    if(newPhoneNumber != null){
        newPatient.telecom[0].value = newPhoneNumber
    }
    if(newTelecomUse != null){
        newPatient.telecom[0].use = newTelecomUse
    }
    if(newGender != ""){
        newPatient.gender = newGender
    }
    if(newBirthDate != null){
        newPatient.birthDate = newBirthDate
    }


    console.log(newPatient)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Le patient à été mis à jour")
        }
    };    
    xhttp.open("PUT", URL_PATIENT, true);
    xhttp.setRequestHeader("Accept","application/fhir+json")
    xhttp.setRequestHeader("Content-Type","application/fhir+json")
    xhttp.send(JSON.stringify(newPatient));
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
        patientsobj.push(new Patient(newPatients[i].resource))
    }
   
    for(let i = 0 ; i < patientsobj.length; i++){
        console.log(patientsobj[i])
    }
    updateUIList()
    selectPatient(currentPatientSelected)
}


function selectPatient(patientIndex){  

    currentPatientSelected = patientIndex
    var currentPatient = patientsobj[currentPatientSelected]
    console.log(currentPatient)
   
    var selectedPatient = document.getElementsByClassName("list-group-item active")
    selectedPatient[0].className = "list-group-item"

    var patientNotSelected = document.getElementsByClassName("list-group-item")
    patientNotSelected[currentPatientSelected%10].className = "list-group-item active"

    patientName.textContent = "Nom : " + currentPatient.getName()
    patientBirthday.textContent = "Naissance : " + currentPatient.getNaissance()
    patientGender.textContent = "Genre : " + currentPatient.getGender()
    patientMarried.textContent = "Situation matrimoniale : " + currentPatient.getSituationMatrimonaiel()
    patientCity.textContent = "Ville : " + currentPatient.getCity()
    patientStreet.textContent = "Rue : " + currentPatient.getStreet()
    patientZipCode.textContent = "Code postal : " + currentPatient.getZipcode()
    patientState.textContent = "Etat : " + currentPatient.getZipcode()
    patientCountry.textContent = "Pays : " + currentPatient.getCountry()
    patientAdress.textContent = "Type d'adresse : " + currentPatient.getAddressUse()
    patientSystem.textContent = "Système : " + currentPatient.getTelecomSystem()
    patientValue.textContent = "Valeur : " + currentPatient.getTelecomValue()
     patientUsage.textContent = "Usage : " + currentPatient.getTelecomUsage()
}


function resetPatientFields(){
    patientName.textContent = "Nom : " + EMPTY_VALUE
    patientBirthday.textContent = "Naissance : " +EMPTY_VALUE
    patientGender.textContent = "Genre : " +EMPTY_VALUE

    nameUsageDropdown.value = null
    maritalStatusDropdown.value = null
    adressUsageDropdown.value = null
    adressTypeDropdown.value = null
    denominationDropdown.value = null
    genderDropdown.value = null
    telecomSystemDropdown.value = null
    telecomUsageDropdown.value = null

    patientCity.textContent = "Ville : " + EMPTY_VALUE
    patientStreet.textContent = "Rue : " + EMPTY_VALUE
    patientZipCode.textContent = "Code postal : " + EMPTY_VALUE
    patientState.textContent = "Etat " +EMPTY_VALUE
    patientCountry.textContent = "Pays : " +EMPTY_VALUE
    patientAdress.textContent = "Type d'adresse : " +EMPTY_VALUE

    patientSystem.textContent = "Système : " +EMPTY_VALUE
    patientValue.textContent = "Valeur : " + EMPTY_VALUE
    patientUsage.textContent = "Usage : " +EMPTY_VALUE
}

function getPatientsSize(){
    return patientsobj.length
}

function getSelectedPatientId(){
    return patientsobj[currentPatientSelected].id
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

        
            var text = document.createTextNode(patientsobj[i].getName());
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
    if(patientsIndexToDisplay +10 < patientsobj.length)
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

