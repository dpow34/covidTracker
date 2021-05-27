module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Gets all clinics and their details */
    function getClinics(res, mysql, context, complete){
        mysql.pool.query("SELECT clinicID, clinicName, address, parking, publicTransport, phone FROM clinics", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.clinics = results;
            complete();
        });
    }

    /* Find clinic whose name starts with a given string in the req */
    function getClinicWithNameLike(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
       var query = "SELECT clinicID, clinicName, address, parking, publicTransport, phone FROM clinics WHERE clinicName LIKE  " + mysql.pool.escape(req.params.s + '%');
      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.clinics = results;
            complete();
        });
    }

    /* Get details about a specific clinic for updating */
    function getClinic(res, mysql, context, id, complete){
        var sql = "SELECT clinicID as id, clinicName, address, parking, publicTransport, phone FROM clinics WHERE clinicID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.clinic = results[0];
            complete();
        });
    }

    /*Display all clinics. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js","updateFunctions.js", "selectorFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        getClinics(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('clinics', context);
            }

        }
    });

    /*Display all clinics whose name starts with a given string. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js","updateFunctions.js", "selectorFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        getClinicWithNameLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('clinics', context);
            }
        }
    });

    /* Display one clinic for the specific purpose of updating clinic */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js","updateFunctions.js", "selectorFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        getClinic(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-clinic', context);
            }

        }
    });

    /* Adds a clinic, redirects to the clinic page after adding */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO clinics (clinicID, clinicName, address, parking, publicTransport, phone) VALUES (?,?,?,?,?,?)";
        var inserts = [req.body.clinicID, req.body.clinicName, req.body.address, req.body.parking, req.body.publicTransport, req.body.phone];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/clinics');
            }
        });
    });

    /* The URI that update data is sent to in order to update a clinic */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE clinics SET clinicName=?, address=?, parking=?, publicTransport=?, phone=? WHERE clinicID=?";
        var inserts = [req.body.clinicName, req.body.address, req.body.parking, req.body.publicTransport, req.body.phone, req.params.id];
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

    /* Route to delete a clinic, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM clinics WHERE clinicID = ?";
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

   