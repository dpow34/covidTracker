module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Gets all clinicIDs in clinics */
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

    /* Gets all clinicians and their personal details */
    function getClinicians(res, mysql, context, complete){
        mysql.pool.query("SELECT clinicians.clinicianID, name, clinics.clinicName AS clinic, dob, sex, email, clinicians.phone, certification FROM clinicians INNER JOIN clinics ON clinic = clinics.clinicID ", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.clinicians = results;
            complete();
        });
    }

    /* Find clinician whose name starts with a given string in the req */
    function getClinicianWithNameLike(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
       var query = "SELECT clinicians.clinicianID, name, clinics.clinicName AS clinic, dob, sex, email, clinicians.phone, certification FROM clinicians INNER JOIN clinics ON clinic = clinics.clinicID WHERE name LIKE " + mysql.pool.escape(req.params.s + '%');
      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.clinicians = results;
            complete();
        });
    }

    /* Gets details of specific clinician for updating */
    function getClinician(res, mysql, context, id, complete){
        var sql = "SELECT clinicianID as id, clinic, name, dob, sex, email, phone, certification FROM clinicians WHERE clinicianID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.clinician = results[0];
            complete();
        });
    }

    /*Display all clinicians. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js", "selectorFunctions.js", "updateFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        getClinicians(res, mysql, context, complete);
        getClinicIDs(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('clinicians', context);
            }

        }
    });

    /*Display all clinicians whose name starts with a given string. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js", "selectorFunctions.js", "updateFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        getClinicianWithNameLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('clinicians', context);
            }
        }
    });

    /* Display one clinician for the specific purpose of updating clinician */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js", "selectorFunctions.js", "updateFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        getClinician(res, mysql, context, req.params.id, complete);
        getClinicIDs(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-clinician', context);
            }

        }
    });

    /* Adds a clinician, redirects to the clincians page after adding */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO clinicians (clinicianID, clinic, name, dob, sex, email, phone, certification) VALUES (?,?,?,?,?,?,?,?)";
        var inserts = [req.body.clinicianID, req.body.clinicID, req.body.name, req.body.dob, req.body.sex, req.body.email, req.body.phone, req.body.certification];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/clinicians');
            }
        });
    });

    /* The URI that update data is sent to in order to update a clinician */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE clinicians SET clinic=?, name=?, dob=?, sex=?, email=?, phone=?, certification=? WHERE clinicianID=?";
        if (req.body.name == 0 || req.body.dob == 0 || req.body.email == 0 || req.body.phone == 0 || req.body.phone[3] != '-' || req.body.phone[7] != '-') {
            return;
        }
        var inserts = [req.body.clinicID, req.body.name, req.body.dob, req.body.sex, req.body.email, req.body.phone, req.body.certification, req.params.id];
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

    /* Route to delete a clinician, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM clinicians WHERE clinicianID = ?";
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

   