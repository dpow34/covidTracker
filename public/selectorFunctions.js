function selectVaccine(pfizer, moderna, johnson){
    console.log(1);
    if(pfizer == True){
        document.querySelector('#pfizer').checked = true;
    }
    if(moderna == True){
        document.querySelector('#moderna').checked = true;
    }
    if(johnson == True){
        document.querySelector('#johnson').checked = true;
    }
}


function selectManufactID(id){
    $("#manufactID-selector").val(id);
}

function selectClinicID(id){
    console.log(id);
    $("#clinic").val(id);
}

function selectPatientID(id){
    $("#patient").val(id);
}

function selectAppointment(id){
    $("#appointment").val(id);
}

function selectVaccineID(id){
    $("#vaccineID-selector").val(id);
}
