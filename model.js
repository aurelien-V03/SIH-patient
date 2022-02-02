
export class Patient {
    
    resourceType = "Patient"
    meta = {}
    text = {}
    identifier = {}
    birthDate = null
    gender = null
    id = null
    name = []
    address = []
    telecom = []
    maritalStatus = {
        "coding" : []
    }

    constructor(json){
        if(json.gender != undefined){
            this.gender = json.gender
        }
        if(json.birthDate != undefined){
            this.birthDate = json.birthDate
        }
        if(json.meta != undefined){
            this.meta = json.meta
        }
        if(json.id != undefined){
            this.id = json.id
        }
        if(json.name != undefined){
            this.name = json.name
        }
        if(json.text != undefined){
            this.text = json.text
        }
        if(json.identifier != undefined){
            this.identifier = json.identifier
        }

        if(json.address != undefined){
            this.address = json.address
        }
        if(json.telecom != undefined){
            this.telecom = json.telecom
        }
        if(json.maritalStatus != undefined){
            this.maritalStatus = json.maritalStatus
        }
    }

    getName(){
        if(this.name.length > 0){
            let firstName = this.name[0]
            if(firstName.family != undefined){
                return firstName.family
            }
            else return ""
        }
        else{
            return ""
        }
    }

    getPrefix(){
        if(this.name.length > 0){
            let firstName = this.name[0]
            if(firstName.prefix != undefined){
                return firstName.prefix[0]
            }
            else return ""
        }
        else{
            return ""
        }
    }

    getNaissance(){
        if(this.birthDate != null){
            return this.birthDate
        }
        else{
            return ""
        }
    }

    getGender(){
        if(this.gender != null){
            return this.gender
        }
        else{
            return ""
        }
    }

    getSituationMatrimonaiel(){
        if(this.maritalStatus != undefined){
            if(this.maritalStatus.coding != undefined && this.maritalStatus.coding.length > 0){
                if(this.maritalStatus.coding[0].display != undefined){
                    return this.maritalStatus.coding[0].display
                }
            }
        }
        return ""
    }

    getCity(){
        if(this.address.length > 0){
            let firstAddress = this.address[0]
            if(firstAddress.city != undefined){
                return firstAddress.city
            }
            else return ""
        }
        else{
            return ""
        }
    }

    getStreet(){
        if(this.address.length > 0){
            let firstAddress = this.address[0]
            if(firstAddress.line != undefined){
                return firstAddress.line[0]
            }
            else return ""
        }
        else{
            return ""
        }
    }

    getZipcode(){
        if(this.address.length > 0){
            let firstAddress = this.address[0]
            if(firstAddress.postalCode != undefined){
                return firstAddress.postalCode
            }
            else return ""
        }
        else{
            return ""
        }
    }

    getState(){
        if(this.address.length > 0){
            let firstAddress = this.address[0]
            if(firstAddress.state != undefined){
                return firstAddress.state
            }
            else return ""
        }
        else{
            return ""
        }
    }

    getCountry(){
        if(this.address.length > 0){
            let firstAddress = this.address[0]
            if(firstAddress.country != undefined){
                return firstAddress.country
            }
            else return ""
        }
        else{
            return ""
        }
    }

    getAddressUse(){
        if(this.address.length > 0){
            let firstAddress = this.address[0]
            if(firstAddress.use != undefined){
                return firstAddress.use
            }
            else return ""
        }
        else{
            return ""
        }
    }
    
    getAddressType(){
        if(this.address.length > 0){
            let firstAddress = this.address[0]
            if(firstAddress.type != undefined){
                return firstAddress.type
            }
            else return ""
        }
        else{
            return ""
        }
    }

    getTelecomSystem(){
        if(this.telecom.length > 0){
            let firstTelecom = this.telecom[0]
            if(firstTelecom.system != undefined){
                return firstTelecom.system
            }
            else return ""
        }
        else{
            return ""
        }
    }

    getTelecomValue(){
        if(this.telecom.length > 0){
            let firstTelecom = this.telecom[0]
            if(firstTelecom.value != undefined){
                return firstTelecom.value
            }
            else return ""
        }
        else{
            return ""
        }
    }

    getTelecomUsage(){
        if(this.telecom.length > 0){
            let firstTelecom = this.telecom[0]
            if(firstTelecom.use != undefined){
                return firstTelecom.use
            }
            else return ""
        }
        else{
            return ""
        }
    }

    setNewName(newName, newFirstName, newNameUse, newPrefix){
      
            this.name[0] = {
                "use": newNameUse,
                "text": newName + " " + newFirstName,
                "family": newName,
                "given": [],
                "prefix": [
                    newPrefix
                ]
            }
        
    }

    setNewTelecom(newTelecomSystem, newNumberPhone, newTelecomUsage){
        this.telecom[0] =
        {
            "system" : newTelecomSystem,
            "value": newNumberPhone,
            "use" : newTelecomUsage
        }
    }


    setNewGender(newGender){
        this.gender = newGender
    }

    setNewBirthDate(newBirthdate){
        this.birthDate = newBirthdate
    }   

    setNewMaritalStatus(newMaritalStatusDisplay, newMartialStatusCode){
        this.maritalStatus.coding[0] = {
        "system":"http://hl7.org/fhir/v3/MaritalStatus",
        "code": newMartialStatusCode,
        "display": newMaritalStatusDisplay}
    }
}