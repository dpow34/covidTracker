function deleteManufacturer(manufactID){
    $.ajax({
        url: '/manufacturers/' + manufactID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteClinician(clinicianID){
  $.ajax({
      url: '/clinicians/' + clinicianID,
      type: 'DELETE',
      success: function(result){
          window.location.reload(true);
      }
  })
};

function deleteClinic(clinicID){
  $.ajax({
      url: '/clinics/' + clinicID,
      type: 'DELETE',
      success: function(result){
          window.location.reload(true);
      }
  })
};

function deletePatient(patientID){
  $.ajax({
      url: '/patients/' + patientID,
      type: 'DELETE',
      success: function(result){
          window.location.reload(true);
      }
  })
};

function deleteAppointment(appointmentID){
  $.ajax({
      url: '/appointments/' + appointmentID,
      type: 'DELETE',
      success: function(result){
          window.location.reload(true);
      }
  })
};

function deleteVaccine(vaccineID){
  $.ajax({
      url: '/vaccines/' + vaccineID,
      type: 'DELETE',
      success: function(result){
          window.location.reload(true);
      }
  })
};
