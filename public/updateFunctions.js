function updateVaccine(id){
    $.ajax({
        url: '/vaccines/' + id,
        type: 'PUT',
        data: $('#update-vaccine').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateAppointment(id){
    $.ajax({
        url: '/appointments/' + id,
        type: 'PUT',
        data: $('#update-appointment').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updatePatient(id){
    $.ajax({
        url: '/patients/' + id,
        type: 'PUT',
        data: $('#update-patient').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};


function updateClinic(id){
    $.ajax({
        url: '/clinics/' + id,
        type: 'PUT',
        data: $('#update-clinic').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateClinician(id){
    $.ajax({
        url: '/clinicians/' + id,
        type: 'PUT',
        data: $('#update-clinician').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};