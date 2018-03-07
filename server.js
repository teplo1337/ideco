const express         = require('express'),
      app             = express(),
      mongodb         = require('mongodb'),
      mongoClient     = mongodb.MongoClient,
      bodyParser      = require('body-parser'),
      parseJson       = bodyParser.json(),
      dbUri           = 'mongodb://root:1@ds012198.mlab.com:12198/itgro';

/* date */

let date = {
    now: () => {
        let date = new Date();
        let now = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        return now;
    } 
}

/* router */

let router = (app, db) => {
    
    const collection = db.collection('flights');
 
    /* rest api */

    app.get('/api/', parseJson, (req, res) => {
        console.log(req.query);
        collection.find(
            {
                "$and": [
                    {
                        "$or": [
                            { "takeoff.city": (req.query.city) ? {"$regex": req.query.city} : {
                                    "$exists": "<string>"
                                }
                            },
                            { "landing.city": (req.query.city) ? {"$regex": req.query.city} : {
                                    "$exists": "<string>"
                                }
                            },
                        ],
                    },
                    {
                        "status": (req.query.status) ? req.query.status : {
                            "$exists": true
                        }
                    }

                ]
            }
        ).toArray((err, result) => {
            (err) ? res.status(500).send(err) : res.status(200).send(result);
        });
    });

    app.post('/api/', parseJson, (req, res) => {
        const data = {
            name: req.body.name,
            takeoff: req.body.takeoff,
            landing: req.body.landing,
            status: req.body.status,
            type: req.body.type
        }
        if (checkData(data)) {
            collection.insert(data, function(err, result) {
                (err) ? res.status(200).end() : res.status(200).send(result);
            });
        } else {
            res.status(500).end();
        }
    });

    app.put('/api/', parseJson, (req, res) => {
        const data = {
            name: req.body.name,
            takeoff: req.body.takeoff,
            landing: req.body.landing,
            status: req.body.status,
            type: req.body.type
        }
        if (req.body._id && checkData(data)) {
            collection.findOneAndUpdate(
                { _id: new mongodb.ObjectID(req.body._id)},
                { $set: data }, (err, result) => {
                    (err) ? res.status(200).send(err) : res.status(200).send(result);
              }
            );
        } else {
            res.status(500).end();
        }

    });
    
    app.delete('/api/:id', (req, res) => {
        collection.remove({_id: new mongodb.ObjectID(req.params.id)}, (err, result) => {
            (err) ? res.status(500).send(err) : res.status(200).send(result);
        });
    });
}

const checkData = (data) => {
    for (key in data) {
        if (!data[key]) return false;
        return true;
    }
}

/* db connect */

mongoClient.connect(dbUri, (err, db) => {
    router(app, db);
});

/* start server */

app.listen(9999, function () {
    console.log('listen 9999'+ ' at ' + date.now());

});