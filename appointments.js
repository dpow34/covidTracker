module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Get patientIDs from patients */
    function getPatientIDs(res, mysql, context, complete){
        mysql.pool.query("SELECT patientID as id, name FROM patients", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.patients  = results;
            complete();
        });
    }

    /* Get clinicIDs from clinics */
    function getClinicIDs(res, mysql, context, complete){
        mysql.pool.query("SELECT clinicID as id, clinicName FROM clinics", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.clinics  = results;
            complete();
        });
    }

    /* Get appointments and their details */
    function getAppts(res, mysql, context, complete){
        mysql.pool.query("SELECT appointmentID, clinic, patient, vaccinePref, appointment FROM appointments", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.appointments = results;
            complete();
        });
    }

    /* Find appointment that matches a given string in the req */
    function apptSearch(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
       var query = "SELECT appointmentID, clinic, patient, vaccinePref, appointment FROM appointments WHERE appointmentID = " + mysql.pool.escape(req.params.s + '%');
      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.appointments = results;
            complete();
        });
    }

    /* Get specific appointment for updating */
    function getAppointment(res, mysql, context, id, complete){
        var sql = "SELECT appointmentID as id, clinic, patient, vaccinePref, appointment FROM appointments WHERE appointmentID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.appointment = results[0];
            complete();
        });
    }

    /*Display all appointments. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectorFunctions.js", "updateFunctions.js", "deleteFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        getAppts(res, mysql, context, complete);
        getClinicIDs(res, mysql, context, complete);
        getPatientIDs(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('appointments', context);
            }

        }
    });

    /*Display appointments that matches a given string. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectorFunctions.js", "updateFunctions.js", "deleteFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        apptSearch(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('appointments', context);
            }
        }
    });

    /* Display one appointment for the specific purpose of updating appointments */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectorFunctions.js", "updateFunctions.js", "deleteFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        getAppointment(res, mysql, context, req.params.id, complete);
        getClinicIDs(res, mysql, context, complete);
        getPatientIDs(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('update-appointments', context);
            }

        }
    });

    /* Adds a appointment, redirects to the appointments page after adding */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO appointments (appointmentID, clinic, patient, vaccinePref, appointment) VALUES (?,?,?,?,?)";
        var inserts = [req.body.appointmentID, req.body.clinicID, req.body.patientID, req.body.vacType, req.body.appointment];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/appointments');
            }
        });
    });

    /* The URI that update data is sent to in order to update an appointment */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE appointments SET clinic=?, patient=?, vaccinePref=?, appointment=? WHERE appointmentID=?";
        var inserts = [req.body.clinicID, req.body.patientID, req.body.vacType, req.body.appointment, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    /* Route to delete a appointment, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM appointments WHERE appointmentID = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();

   
