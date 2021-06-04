module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Find get all distributors */
    function getDistributors(res, mysql, context, complete){
        mysql.pool.query("SELECT distributorID, name, status FROM distributors", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.distributors = results;
            complete();
        });
    }

    /* Find distributor that matches given req */
    function searchDistributor(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
       var query = "SELECT distributorID, name, status FROM distributors WHERE name LIKE " + mysql.pool.escape(req.params.s + '%');
      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.distributors = results;
            complete();
        });
    }

    /*Display all distributor table. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        getDistributors(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('distributors', context);
            }

        }
    });

    /*Display distributor whose distributor matches given name. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js", "searchFunctions.js"];
        var mysql = req.app.get('mysql');
        searchDistributor(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('distributors', context);
            }
        }
    });

    /* Adds a distributor, redirects to the distributors page after adding */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO distributors (distributorID, name, status) VALUES (?,?, ?)";
        var inserts = [req.body.distributorID, req.body.distroName, req.body.status];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/distributors');
            }
        });
    });


    /* Route to delete a distributor, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM distributors WHERE distributorID = ?";
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

   