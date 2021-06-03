module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Get vaccineIDs from vaccines */
    function getVaccineIDs(res, mysql, context, complete){
        mysql.pool.query("SELECT vaccineID as id, vacType FROM vaccines", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.vaccines  = results;
            complete();
        });
    }

    /* Get patients and their details */
    function getPatients(res, mysql, context, complete){
        mysql.pool.query("SELECT patients.patientID, vaccines.vacType as vaccine, name, dob, sex, email, phone FROM patients INNER JOIN vaccines ON vaccine = vaccines.vaccineID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.patients = results;
            complete();
        });
    }

    /* Find patient whose name starts with a given string in the req */
    function getPatientWithNameLike(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
       var query = "SELECT patients.patientID, vaccines.vacType as vaccine, name, dob, sex, email, phone FROM patients INNER JOIN vaccines ON vaccine = vaccines.vaccineID where name LIKE " + mysql.pool.escape(req.params.s + '%');
      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.patients = results;
            complete();
        });
    }

    /* Get specific patient for updating */
    function getPatient(res, mysql, context, id, complete){
        var sql = "SELECT patientID as id, vaccine, name, dob, sex, email, phone FROM patients WHERE patientID= ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.patient = results[0];
            complete();
        });
    }

    /*Display all patients. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js", "selectorFunctions.js", "updateFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        getPatients(res, mysql, context, complete);
        getVaccineIDs(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('patient', context);
            }

        }
    });

    /*Display all patients whose name starts with a given string. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js", "selectorFunctions.js", "updateFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        getPatientWithNameLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('patient', context);
            }
        }
    });

    /* Display one patient for the specific purpose of updating patinets */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js", "selectorFunctions.js", "updateFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        getPatient(res, mysql, context, req.params.id, complete);
        getVaccineIDs(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-patient', context);
            }

        }
    });

    /* Adds a patient, redirects to the patients page after adding */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO patients (patientID, vaccine, name, dob, sex, email, phone) VALUES (?,?,?,?,?,?,?)";
        var inserts = [req.body.patientID, req.body.vaccineID, req.body.name, req.body.dob, req.body.sex, req.body.email, req.body.phone];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/patients');
            }
        });
    });

    /* The URI that update data is sent to in order to update a patient */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE patients SET vaccine=?, name=?, dob=?, sex=?, email=?, phone=? WHERE patientID=?";
        var inserts = [req.body.vaccineID, req.body.name, req.body.dob, req.body.sex, req.body.email, req.body.phone, req.params.id];
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

    /* Route to delete a patient, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM patients WHERE patientID = ?";
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

   