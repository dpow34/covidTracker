module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /*Get all manufactIDs from manufacturers*/
    function getManufactIDs(res, mysql, context, complete){
        mysql.pool.query("SELECT manufactID as id FROM manufacturers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.manufacturers  = results;
            complete();
        });
    }

    /*Get all vaccines and their details*/
    function getVaccines(res, mysql, context, complete){
        mysql.pool.query("SELECT vaccineID, manufactID, pfizer, moderna, johnson FROM vaccines", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.vaccines = results;
            complete();
        });
    }

    /*Get specific vaccine for updating*/
    function getVaccine(res, mysql, context, id, complete){
        var sql = "SELECT vaccineID as id, manufactID, pfizer, moderna, johnson FROM vaccines WHERE vaccineID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.vaccine = results[0];
            complete();
        });
    }

    /* Find vaccineID that matches given req */
    function vaccineSearch(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
         var query = "SELECT vaccineID as vaccineID, manufactID, pfizer, moderna, johnson FROM vaccines WHERE vaccineID = " + mysql.pool.escape(req.params.s);
        mysql.pool.query(query, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.vaccines = results;
              complete();
          });
      }

    /*Display all vaccines. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js", "selectorFunctions.js", "updateFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        getVaccines(res, mysql, context, complete);
        getManufactIDs(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('vaccines', context);
            }

        }
    });

    /*Display all vaccines that match a given string. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js", "selectorFunctions.js", "updateFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        vaccineSearch(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('vaccines', context);
            }
        }
    });

    /* Display one vaccine for the specific purpose of updating vaccines */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js", "selectorFunctions.js", "updateFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        getVaccine(res, mysql, context, req.params.id, complete);
        getManufactIDs(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-vaccine', context);
            }

        }
    });

    /* Adds a vaccine, redirects to the vaccines page after adding */
    router.post('/', function(req, res){
        console.log(req.body);
        if(req.body.vacType == 'Pfizer'){
            req.body.pfizer = 'True';
            req.body.moderna = 'False';
            req.body.johnson = 'False';
        }
        if(req.body.vacType == 'Moderna'){
            req.body.pfizer = 'False';
            req.body.moderna = 'True';
            req.body.johnson = 'False';
        }
        if(req.body.vacType == 'Johnson'){
            req.body.pfizer = 'False';
            req.body.moderna = 'False';
            req.body.johnson = 'True';
        }
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO vaccines (vaccineID, manufactID, pfizer, moderna, johnson) VALUES (?,?,?,?,?)";
        var inserts = [req.body.vaccineID, req.body.manufactID, req.body.pfizer, req.body.moderna, req.body.johnson];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/vaccines');
            }
        });
    });

    /* The URI that update data is sent to in order to update a vaccine */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        if(req.body.vacType == 'Pfizer'){
            req.body.pfizer = 'True';
            req.body.moderna = 'False';
            req.body.johnson = 'False';
        }
        if(req.body.vacType == 'Moderna'){
            req.body.pfizer = 'False';
            req.body.moderna = 'True';
            req.body.johnson = 'False';
        }
        if(req.body.vacType == 'Johnson'){
            req.body.pfizer = 'False';
            req.body.moderna = 'False';
            req.body.johnson = 'True';
        }
        var sql = "UPDATE vaccines SET manufactID=?, pfizer=?, moderna=?, johnson=? WHERE vaccineID=?";
        var inserts = [req.body.manufactID, req.body.pfizer, req.body.moderna, req.body.johnson, req.params.id];
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

    /* Route to delete a vaccine, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM vaccines WHERE vaccineID = ?";
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

   