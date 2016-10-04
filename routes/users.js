var express = require('express');
var request = require('request');
var nools = require('nools');

var router = express.Router();

/* GET users listing. */
router.get('/:name', function (req, res) {
    runFlow(req.params.name, res)
    res.status(200).send('Pls check your console for your secret msg');
});

function runFlow(name, res)
{
    // Create a flow froms the nools template
    var flow = nools.getFlow("flow1");
    flow = (flow == null) ? nools.compile("flows/flow1.nools") : flow;

    // Get the defined Message 'class'
    var Message = flow.getDefined('message');
    
    // Create the session
    var session = flow.getSession();
    
    // Add the facts to the session i.e an instance of the 'Class' defined in Nools template. 
    // Assert func is ONLY used before the flow is run.
    // TODO: These facts will need to go into the DB for persistant storage.
    session.assert(new Message(name));
//    session.assert(new Message("hello"));
//    session.assert(new Message("hello world"));
    
    //now fire(run) the rules 
    session.match(function(err){
        if(err){
            console.error(err.stack);
        }else{
            console.log("done");
            session.dispose();

        }
    });  
}


module.exports = router;