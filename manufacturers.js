module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Find get all manufacturers */
    function getManufacturers(res, mysql, context, complete){
        mysql.pool.query("SELECT manufactID, administered FROM manufacturers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.manufacturers = results;
            complete();
        });
    }

    /* Find manufactID that matches given req */
    function searchManufacturer(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
       var query = "SELECT manufactID, administered FROM manufacturers WHERE manufactID = " + mysql.pool.escape(req.params.s);
      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.manufacturers = results;
            complete();
        });
    }

    /*Display all manufacturer table. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        getManufacturers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('manufacturers', context);
            }

        }
    });

    /*Display manufacturer whose manufactID matches given ID. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        searchManufacturer(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('manufacturers', context);
            }
        }
    });

    /* Adds a manufacturer, redirects to the manufacturers page after adding */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO manufacturers (manufactID, administered) VALUES (?,?)";
        var inserts = [req.body.manufactID, req.body.administered];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/manufacturers');
            }
        });
    });


    /* Route to delete a manufacturer, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM manufacturers WHERE manufactID = ?";
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

   