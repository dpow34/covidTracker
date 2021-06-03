function selectVaccine(vacType){
    $("#vacType").val(vacType);
}

function selectVaccine2(vaccine){
    if(vaccine == 'Pfizer'){
        $(':input:radio:eq(0)').attr('checked', 'checked');
    }
    if(vaccine == 'Moderna'){
        $(':input:radio:eq(1)').attr('checked', 'checked');
    }
    if(vaccine == 'Johnson'){
        $(':input:radio:eq(2)').attr('checked', 'checked');
    }
}


function selectSex(sex){
    if(sex == 'Male'){
        $(':input:radio:eq(0)').attr('checked', 'checked');
    }
    if(sex == 'Female'){
        $(':input:radio:eq(1)').attr('checked', 'checked');
    }
}

function selectParking(parking){
    if(parking == 'True'){
        $(':input:radio:eq(0)').attr('checked', 'checked');
    }
    if(parking == 'False'){
        $(':input:radio:eq(1)').attr('checked', 'checked');
    }
}

function selectPubTrans(trans){
    if(trans == 'True'){
        $(':input:radio:eq(2)').attr('checked', 'checked');
    }
    if(trans == 'False'){
        $(':input:radio:eq(3)').attr('checked', 'checked');
    }
}

function selectCert(cert){
    if(cert == 'True'){
        $(':input:radio:eq(2)').attr('checked', 'checked');
    }
    if(cert == 'False'){
        $(':input:radio:eq(3)').attr('checked', 'checked');
    }
}


function selectDistributorID(id){
    $("#distributorID-selector").val(id);
}

function selectClinicID(id){
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
