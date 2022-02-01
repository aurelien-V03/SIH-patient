const URL_PATIENT = "http://hapi.fhir.org/baseR4/Patient"


// Recuperes tous les patients via l'API REST
export function fetchPatients(onFetchPatients) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var parsedResult = JSON.parse(this.responseText)
            onFetchPatients(parsedResult.entry)
        }
    };    
  xhttp.open("GET", URL_PATIENT, true);
  xhttp.setRequestHeader("Accept","application/fhir+json")
  xhttp.setRequestHeader("Content-Type","application/fhir+json")
  xhttp.send();
}


// Supprime un patient
export function deletePatient(patientId){

    var url = URL_PATIENT+"/"+ patientId
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           alert("Le patient N° " + patientId +  " a été supprimé")
        }
    };    
  xhttp.open("DELETE", url, true);
  xhttp.setRequestHeader("Accept","application/fhir+json")
  xhttp.setRequestHeader("Content-Type","application/fhir+json")
  xhttp.send();
}

export function updatePatient(newName, newNameUsage, newMatSituation, newPrefix, newBirthDate, newCity, newStreet, newZipCode, newState, newCountry, newAdressUse, newAdressType, newGender, newPhoneNumber, newTelecomSsystem, newTelecomUse, patientToUpdate){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Le patient à été mis à jour")
        }
    };    
    xhttp.open("PUT", URL_PATIENT, true);
    xhttp.setRequestHeader("Accept","application/fhir+json")
    xhttp.setRequestHeader("Content-Type","application/fhir+json")
    xhttp.send(JSON.stringify(patientToUpdate));
}


export function createPatient(name, firstName, nameUse, maritalStatus,
    nameDenomination, birthdate, city, street, zipCode, state, country, 
    adressType, adressUsage, gender, numberPhone, telecomSystemType,
    telecomUsage, resetCreatePatientForm){
    

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