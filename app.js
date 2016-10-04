var express = require('express');
var path = require('path');
var logger = require('morgan');
var nools = require('nools');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Enable verbose logging.
app.use(logger('dev'));

app.use('/', routes);
app.use('/users', users);
/*
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
*/
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send(err.message);
});

app.listen(3000, function () {
  console.log('Ready');
});

module.exports = app;

function main()
{
    // Create a flow froms the nools template
    var flow = nools.compile("flows/flow1.nools");

    // Get the defined Message 'class'
    var Message = flow.getDefined('message');
    
    // Create the session
    var session = flow.getSession();
    
    // Add the facts to the session i.e an instance of the 'Class' defined in Nools template. 
    // Assert func is ONLY used before the flow is run.
    // TODO: These facts will need to go into the DB for persistant storage.
    session.assert(new Message("Ganesan"));
//    session.assert(new Message("hello"));
//    session.assert(new Message("hello world"));
    
    //now fire(run) the rules 
    session.match(function(err){
        if(err){
            console.error(err.stack);
        }else{
            console.log("done");
        }
    });  
}

//main();
