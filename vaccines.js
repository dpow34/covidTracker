module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /*Get all distributorIDs from distributors*/
    function getDistributorIDs(res, mysql, context, complete){
        mysql.pool.query("SELECT distributorID as id, name, status FROM distributors", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.distributors  = results;
            complete();
        });
    }

    /*Get all vaccines and their details*/
    function getVaccines(res, mysql, context, complete){
        mysql.pool.query("SELECT vaccines.vaccineID, distributors.name AS distroName, vacType FROM vaccines INNER JOIN distributors ON distroName = distributors.distributorID", function(error, results, fields){
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
        var sql = "SELECT vaccineID as id, distroName, vacType FROM vaccines WHERE vaccineID = ?";
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
         var query = "SELECT vaccines.vaccineID, distributors.name AS distroName, vacType FROM vaccines INNER JOIN distributors ON distroName = distributors.distributorID WHERE vaccineID = " + mysql.pool.escape(req.params.s);
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
        getDistributorIDs(res, mysql, context, complete);
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
        getDistributorIDs(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-vaccine', context);
            }

        }
    });

    /* Adds a vaccine, redirects to the vaccines page after adding */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO vaccines (vaccineID, distroName, vacType) VALUES (?,?,?)";
        var inserts = [req.body.vaccineID, req.body.distributorID, req.body.vacType];
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
        var sql = "UPDATE vaccines SET distroName=?, vacType=? WHERE vaccineID=?";
        var inserts = [req.body.distributorID, req.body.vacType, req.params.id];
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

   