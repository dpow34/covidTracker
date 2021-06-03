function searchPatientByFirstName() {
    //get the first name 
    var first_name_search_string  = document.getElementById('first_name_search_string').value
    if (first_name_search_string.length != 0) {
        //construct the URL and redirect to it
        window.location = '/patients/search/' + encodeURI(first_name_search_string)
    }
}


function searchVaccineID() {
    //get the first name 
    var vaccineID  = document.getElementById('vaccineID_search').value
    if (vaccineID.length != 0) {
        //construct the URL and redirect to it
        window.location = '/vaccines/search/' + encodeURI(vaccineID)
    }
}


function searchAppointments() {
    //get the first name 
    var appointmentID  = document.getElementById('appointmentID_search').value
    if (appointmentID.length != 0){
        //construct the URL and redirect to it
        window.location = '/appointments/search/' + encodeURI(appointmentID)
    }
}

function searchClinics() {
    //get the first name 
    var clinicName  = document.getElementById('clinic_search').value
    if (clinicName.length != 0){
        //construct the URL and redirect to it
        window.location = '/clinics/search/' + encodeURI(clinicName)
    }
}

function searchClinicians() {
    //get the first name 
    var clinicianName  = document.getElementById('clinician_search').value
    if (clinicianName.length != 0) {
        //construct the URL and redirect to it
        window.location = '/clinicians/search/' + encodeURI(clinicianName)
    }
}

function searchDistributors() {
    //get the first name 
    var distributorID  = document.getElementById('distributorID_search').value
    if (distributorID.length != 0) {
        //construct the URL and redirect to it
        window.location = '/distributors/search/' + encodeURI(distributorID)
    }
}