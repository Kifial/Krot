const express = require('express');
const port = 8080;
const fs = require('fs');
const os = require('os');
const path = require('path');
const EventEmitter = require('events').EventEmitter;
const ee = new EventEmitter();
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const webpackConfig = require('./webpack.config');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const util = require('util');
const lwip = require('lwip');
const multiparty = require('multiparty');
const Busboy = require('busboy');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const mongoUrl = 'mongodb://localhost:27017/krot';
import { match } from 'react-router';
import { RouterContext } from 'react-router';
import routes from './src/routes/index.jsx';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
//import { app as reducer } from './src/reducers';

const app = express();
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(webpackMiddleware(webpack(webpackConfig), {
    noInfo: false,
    quiet: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    publicPath: '/dist/',
    index: 'index.html',
    serverSideRender: false
  }
));

app.post('/register', (req, res) => {
  const response = {
    token: ''
  };
  MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('users').findOne({
      'login': req.body.login
    }, (err, result) => {
      if (!result) {
        db.collection('users').insertOne({
          'login': req.body.login,
          'password': req.body.password,
          'email': req.body.email,
          'name': req.body.name,
          'avatar': '/assets/avatar-placeholder.png',
          'bigAvatar': '/assets/avatar-placeholder.png',
          'sourceAvatar': '/assets/avatar-placeholder.png',
          'likes': []
        }, (err, result) => {
          if (result) {
            response.token = jwt.sign({ login: req.body.login }, 'kifi');
            res.status(201).json(response);
          }
        })
      } else {
        res.sendStatus(204);
      }
      db.close();
    })
  })
});

app.post('/login', (req, res) => {
  const response = {
    token: '',
    name: '',
    avatar: '',
    email: ''
  };
  MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('users').findOne({
      'login': req.body.login,
      'password': req.body.password
    }, (err, result) => {
      if (result) {
        response.token = jwt.sign({ login: req.body.login }, 'kifi');
        response.name = result.name;
        response.email = result.email;
        response.avatar = result.avatar;
        res.status(200).json(response);
      } else {
        res.sendStatus(404);
      }
      db.close();
    })
  })
});

app.get('/userInfo', expressJWT({ secret: 'kifi' }), (req, res) => {
  let response = {
    name: '',
    email: '',
    avatar: '',
    likes: [],
  };
  MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('users').findOne({
      'login': req.user.login
    }, (err, result) => {
      if (result) {
        response = {
          name: result.name,
          email: result.email,
          avatar: result.avatar,
          likes: result.likes
        };
        res.status(200).json(response);
      } else {
        res.sendStatus(404);
      }
      db.close();
    })
  })
});

app.get('/profileInfo', expressJWT({ secret: 'kifi' }), (req, res) => {
  let response = {
    name: '',
    email: '',
    avatar: '',
    bigAvatar: ''
  };
  MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('users').findOne({
      'login': req.user.login
    }, (err, result) => {
      if (result) {
        response = {
          name: result.name,
          email: result.email,
          avatar: result.avatar,
          bigAvatar: result.bigAvatar
        };
        res.status(200).json(response);
      } else {
        res.sendStatus(404);
      }
      db.close();
    })
  })
});

app.get('/editProfileInfo', expressJWT({ secret: 'kifi' }), (req, res) => {
  let response = {
    name: '',
    email: '',
    avatar: '',
    bigAvatar: ''
  };
  MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('users').findOne({
      'login': req.user.login
    }, (err, result) => {
      if (result) {
        response = {
          name: result.name,
          email: result.email,
          avatar: result.avatar,
          bigAvatar: result.bigAvatar
        };
        res.status(200).json(response);
      } else {
        res.sendStatus(404);
      }
      db.close();
    })
  })
});

app.post('/editProfileSubmit', expressJWT({ secret: 'kifi' }), (req, res) => {
  let sourceImageName = '',
    bigImageName = '',
    smallImageName = '',
    avatarName = '',
    fileType = '',
    userName = '',
    userEmail = '';
  // takes bigImage 160x160 and resizes it to 60x60 avatar
  ee.once('makeBigThumb', (imageName) => {
    lwip.open(path.resolve(__dirname, 'assets', `${imageName}.${fileType}`), (err, image) => {
      let imageScale = 60 / image.height();
      smallImageName = uuid.v4();
      image.batch()
        .scale(imageScale)
        .writeFile(path.resolve(__dirname, 'assets', `${smallImageName}.${fileType}`), (err) => {
          if (!err) {
            ee.emit('makeSmallThumb', imageName);
          }
        });
    });
  });
  // takes bigImage 160x160 and resizes it to 32x32 avatar
  ee.once('makeSmallThumb', (imageName) => {
    lwip.open(path.resolve(__dirname, 'assets', `${imageName}.${fileType}`), (err, image) => {
      let imageScale = 32 / image.height();
      avatarName = uuid.v4();
      image.batch()
        .scale(imageScale)
        .writeFile(path.resolve(__dirname, 'assets', `${avatarName}.${fileType}`), (err) => {
          if (!err) {
            MongoClient.connect(mongoUrl, (err, db) => {
              db.collection('users').updateOne({
                'login': req.user.login
              }, {
                $set: {
                  'sourceAvatar': `/assets/${sourceImageName}.${fileType}`,
                  'bigAvatar': `/assets/${bigImageName}.${fileType}`,
                  'smallAvatar': `/assets/${smallImageName}.${fileType}`,
                  'avatar': `/assets/${avatarName}.${fileType}`,
                  'name': userName,
                  'email': userEmail
                }
              }, (err, result) => {
                if (!err) {
                  db.close();
                  let response = {
                    bigAvatar: `/assets/${bigImageName}.${fileType}`,
                    avatar: `/assets/${avatarName}.${fileType}`,
                    name: userName,
                    email: userEmail
                  };
                  res.status(200).json(response);
                }
              });
            });
          }
        })
    });
  });
  // function called when user do not changes avatar picture
  ee.once('noImage', () => {
    MongoClient.connect(mongoUrl, (err, db) => {
      db.collection('users').updateOne({
        'login': req.user.login
      }, {
        $set: {
          'name': userName,
          'email': userEmail
        }
      }, (err, result) => {
        if (!err) {
          db.close();
          let response = {
            name: userName,
            email: userEmail
          };
          res.status(200).json(response);
        }
      })
    })
  });
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    file.on('end', function() {

    });
    sourceImageName = filename;
    let splittedFileName = sourceImageName.split('.');
    fileType = splittedFileName[splittedFileName.length - 1];
    sourceImageName = uuid.v4();
    file.pipe(fs.createWriteStream(path.resolve(__dirname, 'assets', `${sourceImageName}.${fileType}`)));
  });
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    switch(fieldname) {
      case 'name':
        userName = val;
        break;
      case 'email':
        userEmail = val;
        break;
      default:
        break;
    }
  });
  busboy.on('finish', function() {
    if (sourceImageName) {
      MongoClient.connect(mongoUrl, (err, db) => {
        db.collection('users').findOne({
          'login': req.user.login
        }, (err, result) => {
          if (result) {
            // db image path is like '/assets/:filename'
            let imagePath = '';
            if (result.sourceAvatar !== '/assets/avatar-placeholder.png') {
              imagePath = result.sourceAvatar.split('/');
              imagePath = imagePath[imagePath.length - 1];
              fs.unlinkSync(path.resolve(__dirname, 'assets', imagePath));
            }
            if (result.bigAvatar !== '/assets/avatar-placeholder.png') {
              imagePath = result.bigAvatar.split('/');
              imagePath = imagePath[imagePath.length - 1];
              fs.unlinkSync(path.resolve(__dirname, 'assets', imagePath));
            }
            if (result.smallAvatar !== '/assets/avatar-placeholder.png') {
              imagePath = result.smallAvatar.split('/');
              imagePath = imagePath[imagePath.length - 1];
              fs.unlinkSync(path.resolve(__dirname, 'assets', imagePath));
            }
            if (result.avatar !== '/assets/avatar-placeholder.png') {
              imagePath = result.avatar.split('/');
              imagePath = imagePath[imagePath.length - 1];
              fs.unlinkSync(path.resolve(__dirname, 'assets', imagePath));
            }
          }
          ee.emit('deletedSuccessfully');
        });
      });
      ee.once('deletedSuccessfully', () => {
        lwip.open(path.resolve(__dirname, 'assets', `${sourceImageName}.${fileType}`), (err, image) => {
          let imageScale = 160 / image.height();
          bigImageName = uuid.v4();
          image.batch()
            .scale(imageScale)
            .crop(160, 160)
            .writeFile(path.resolve(__dirname, 'assets', `${bigImageName}.${fileType}`), (err) => {
              if (!err) {
                ee.emit('makeBigThumb', bigImageName);
              }
            })
        });
      })
    } else {
      ee.emit('noImage');
    }
  });
  req.pipe(busboy);
});

app.get('/sourceAvatar', expressJWT({ secret: 'kifi' }), (req, res) => {
  let response = {
    image: '',
    title: ''
  };
  MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('users').findOne({
      'login': req.user.login
    }, (err, result) => {
      if (result) {
        response.image = result.sourceAvatar;
        response.title = result.name;
        res.status(200).json(response);
      } else {
        res.sendStatus(404);
      }
      db.close();
    })
  })
});

app.get('/authUser', expressJWT({ secret: 'kifi' }), (req, res) => {
  MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('users').findOne({
      'login': req.user.login
    }, (err, result) => {
      if (result) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
      db.close();
    })
  })
});

app.post('/submitStory', expressJWT({ secret: 'kifi' }), (req, res) => {
  let thatDate = new Date(req.body.date);
  MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('posts').insertOne({
      'user': req.user.login,
      'title': req.body.title,
      'text': req.body.text,
      'date': setCurrentDate(thatDate),
      'numericDate': req.body.date,
      'likes': [],
      'comments': []
    }, (err, result) => {
      if (result) {
        res.sendStatus(201);
      } else {
        res.sendStatus(403);
      }
      db.close();
    })
  })
});

app.get('/myPosts', expressJWT({ secret: 'kifi' }), (req, res) => {
  const response = {
    items: []
  };
  MongoClient.connect(mongoUrl, (err, db) => {
    ee.once('startMyPostsQuery', () => {
      db.collection('posts').find({
        'user': req.user.login
      }).toArray((err, result) => {
        if (result.length) {
          let queryPromises = [];
          for (let i = 0; i < result.length; i += 1) {
            response.items.push(result[i]);
            let queryPromise = db.collection('users').findOne({
              'login': result[i].user
            });
            queryPromises.push(queryPromise);
          }
          Promise.all(queryPromises)
            .then(arrayOfResults => {
              for (let i = 0; i < arrayOfResults.length; i += 1) {
                response.items[i].avatar = arrayOfResults[i].avatar;
                response.items[i].username = arrayOfResults[i].name;
              }
              db.close();
              response.items.reverse();
              res.status(200).json(response);
            });
        } else {
          res.status(200).json(response);
        }
      });
    });
    db.collection('users').findOne({
      'login': req.user.login
    }, (err, result) => {
      response.userLikes = result.likes;
      ee.emit('startMyPostsQuery');
    });
  });
});

app.get('/feedPosts', expressJWT({ secret: 'kifi' }), (req, res) => {
  const response = {
    items: [],
    userLikes: []
  };
  MongoClient.connect(mongoUrl, (err, db) => {
    ee.once('startFeedPostsQuery', () => {
      db.collection('posts').find().toArray((err, result) => {
        if (result.length) {
          let queryPromises = [];
          for (let i = 0; i < result.length; i += 1) {
            response.items.push(result[i]);
            let queryPromise = db.collection('users').findOne({
              'login': result[i].user
            });
            queryPromises.push(queryPromise);
          }
          Promise.all(queryPromises)
            .then(arrayOfResults => {
              for (let i = 0; i < arrayOfResults.length; i += 1) {
                response.items[i].avatar = arrayOfResults[i].avatar;
                response.items[i].username = arrayOfResults[i].name;
              }
              db.close();
              response.items.reverse();
              res.status(200).json(response);
            });
        } else {
          res.status(200).json(response);
        }
      });
    });
    db.collection('users').findOne({
      'login': req.user.login
    }, (err, result) => {
      response.userLikes = result.likes;
      ee.emit('startFeedPostsQuery');
    });
  });
});

app.get('/favouritePosts', expressJWT({ secret: 'kifi' }), (req, res) => {
  const response = {
    items: [],
    userLikes: []
  };
  MongoClient.connect(mongoUrl, (err, db) => {
    ee.once('startFavouritePostsQuery', () => {
      db.collection('posts').find({
        'likes': req.user.login
      }).toArray((err, result) => {
        if (result.length) {
          let queryPromises = [];
          let queryPromise;
          for (let i = 0; i < result.length; i += 1) {
            response.items.push(result[i]);
            queryPromise = db.collection('users').findOne({
              'login': result[i].user
            });
            queryPromises.push(queryPromise);
          }
          Promise.all(queryPromises)
            .then(arrayOfResults => {
              for (let i = 0; i < arrayOfResults.length; i += 1) {
                response.items[i].avatar = arrayOfResults[i].avatar;
                response.items[i].username = arrayOfResults[i].name;
              }
              db.close();
              res.status(200).json(response);
            })
        } else {
          res.status(200).json(response);
        }
      })
    });
    db.collection('users').findOne({
      'login': req.user.login
    }, (err, result) => {
      response.userLikes = result.likes;
      ee.emit('startFavouritePostsQuery');
    })
  });
});

app.put('/likePost', expressJWT({ secret: 'kifi' }), (req, res) => {
  const response = {
    login: req.user.login,
    postLikes: [],
    userLikes: []
  };
  MongoClient.connect(mongoUrl, (err, db) => {
    let queryPromises = [];
    let queryPromise;
    // if post was liked
    if (req.body.value) {
      queryPromise = db.collection('posts').findAndModify({
        '_id': ObjectId(req.body.postId)
      }, [['_id', 'asc']], {
        $pull: { 'likes': req.user.login }
      }, {
        new: true
      });
    } else {
      //if post was not liked
      queryPromise = db.collection('posts').findAndModify({
        '_id': ObjectId(req.body.postId)
      }, [['_id', 'asc']], {
        $push: { 'likes': req.user.login }
      }, {
        new: true
      });
    }
    queryPromises.push(queryPromise);
    if (req.body.value) {
      queryPromise = db.collection('users').findAndModify({
        'login': req.user.login
      }, [['_id', 'asc']], {
        $pull: { 'likes': ObjectId(req.body.postId) }
      }, {
        new: true
      });
    } else {
      queryPromise = db.collection('users').findAndModify({
        'login': req.user.login
      }, [['_id', 'asc']], {
        $push: { 'likes': ObjectId(req.body.postId) }
      }, {
        new: true
      });
    }
    queryPromises.push(queryPromise);
    Promise.all(queryPromises)
      .then(arrayOfResults => {
        response.postLikes = arrayOfResults[0].value.likes;
        response.userLikes = arrayOfResults[1].value.likes;
        res.status(200).json(response);
      });
  });
});

app.put('/likeComment', expressJWT({ secret: 'kifi' }), (req, res) => {
  MongoClient.connect(mongoUrl, (err, db) => {
    let queryPromises = [];
    let queryPromise;
    // if comment was liked
    if (req.body.value) {
      queryPromise = db.collection('comments').findAndModify({
        '_id': ObjectId(req.body.commentId)
      }, [['_id', 'asc']], {
        $pull: { 'likes': req.user.login }
      }, {
        new: true
      });
    } else {
      //if post was not liked
      queryPromise = db.collection('comments').findAndModify({
        '_id': ObjectId(req.body.commentId)
      }, [['_id', 'asc']], {
        $push: { 'likes': req.user.login }
      }, {
        new: true
      });
    }
    queryPromises.push(queryPromise);
    if (req.body.value) {
      queryPromise = db.collection('users').findAndModify({
        'login': req.user.login
      }, [['_id', 'asc']], {
        $pull: { 'likes': ObjectId(req.body.commentId) }
      }, {
        new: true
      });
    } else {
      queryPromise = db.collection('users').findAndModify({
        'login': req.user.login
      }, [['_id', 'asc']], {
        $push: { 'likes': ObjectId(req.body.commentId) }
      }, {
        new: true
      });
    }
    queryPromises.push(queryPromise);
    Promise.all(queryPromises)
      .then(arrayOfResults => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.sendStatus(204);
      })
  });
});

app.get('/getPost/:postId', expressJWT({ secret: 'kifi' }), (req, res) => {
  let response = {};
  MongoClient.connect(mongoUrl, (err, db) => {
    ee.once('getComments', () => {
      let commentsObjectIds = response.commentsIds.map(item => {
        return ObjectId(item);
      });
      db.collection('comments').find({
        '_id': {
          $in: commentsObjectIds
        }
      }).toArray((err, items) => {
        delete response.commentsIds;
        let queryPromise,
          queryPromises = [],
          i = 0;
        response.comments = [ ...items ];
        response.comments.reverse();
        for (i = 0; i < items.length; i += 1) {
          queryPromise = db.collection('users').findOne({
            'login': items[i].user
          });
          queryPromises.push(queryPromise);
        }
        Promise.all(queryPromises)
          .then(arrayOfResults => {
            for (i = 0; i < arrayOfResults.length; i += 1) {
              response.comments[i].avatar = arrayOfResults[i].avatar;
              response.comments[i].username = arrayOfResults[i].name;
            }
            ee.emit('setUserLikes');
          });
      });
    });
    ee.once('setUserLikes', () => {
      db.collection('users').findOne({
        'login': req.user.login
      }, (err, result) => {
        if (result) {
          // set post liked or not
          for (let i = 0; i < response.likes.length; i += 1) {
            if (response.likes[i] === result.login) {
              response.liked = true;
              break;
            }
          }
          // set comments liked or not
          for (let i = 0; i < response.comments.length; i += 1) {
            for (let j = 0; j < response.comments[i].likes.length; j += 1) {
              if (response.comments[i].likes[j] === result.login) {
                response.comments[i].liked = true;
              }
            }
          }
          ee.emit('getUserAndSend');
        }
      });
    });
    ee.once('getUserAndSend', () => {
      db.collection('users').findOne({
        'login': response.user
      }, (err, result) => {
        if (result) {
          response.username = result.name;
          response.avatar = result.smallAvatar;
          db.close();
          res.status(200).json(response);
        }
      });
    });
    db.collection('posts').findOne({
      '_id': ObjectId(req.params.postId)
    }, (err, result) => {
      if (result) {
        response = {
          id: result._id,
          user: result.user,
          title: result.title,
          text: result.text,
          date: result.date,
          numericDate: result.numericDate,
          likes: result.likes,
          commentsIds: result.comments,
          comments: []
        };
        ee.emit('getComments');
      }
    })
  })
});

app.post('/submitComment', expressJWT({ secret: 'kifi' }), (req, res) => {
  let response = {};
  let date = setCurrentDate(new Date());
  MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('comments').insertOne({
      'user': req.user.login,
      'text': req.body.value,
      'post': req.body.id,
      'date': date,
      'numericDate': new Date().getTime(),
      'likes': []
    }, (err, result) => {
      if (result) {
        db.collection('posts').updateOne({
          '_id': ObjectId(req.body.id)
        }, {
          $push: {
            'comments': result.insertedId
          }
        }, (err, result) => {
          if (err) {
            console.log('comment submit error');
          }
        });
        response = {
          id: result.insertedId,
          postId: req.body.id,
          text: req.body.value,
          name: req.user.login,
          date: date,
          likes: []
        };
        db.collection('users').findOne({
          'login': req.user.login
        }, (err, result) => {
          if (result) {
            response.username = result.name;
            response.avatar = result.avatar;
            db.close();
            res.status(200).json(response);
          }
        });
      }
    });
  });
});

app.get('/assets/:fileName', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'assets', req.params.fileName));
});

app.get('*', (req, res) => {
  // let data = {};
  //
  // const store = createStore(reducer, data);
  // const preloadedState = store.getState();
  //
  // match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
  //   if (error) {
  //     res.status(500).send(error.message);
  //   } else if (redirectLocation) {
  //     res.redirect(302, redirectLocation.pathname + redirectLocation.search);
  //   } else if (renderProps) {
  //     const html = ReactDOMServer.renderToString(
  //       <Provider store={store}>
  //         <RouterContext { ...renderProps } />
  //       </Provider>
  //     );
  //     res.send(renderFullPage(html, preloadedState));
  //   }
  // });

  res.sendFile(path.resolve(__dirname, '', 'index.html'));
});

const server = app.listen(port, () => {
  console.log('Listening on port:' + port);
});

// function renderFullPage(html, preloadedState) {
//   return `
//     <!doctype html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport"
//             content="width=device-width, user-scalable=no, initial-scale=1.0">
//       <meta http-equiv="X-UA-Compatible" content="ie=edge">
//       <title>Document</title>
//       <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet">
//       <link rel="stylesheet" href="/dist/app.css">
//     </head>
//     <body>
//       <div id="wrapper">${html}</div>
//       <script>
//         window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
//       </script>
//       <script src="/dist/build.js"></script>
//      </body>
//     </html>
//   `;
// }

function setCurrentDate(date) {
  let thatMonth = date.getMonth();
  let thatDay = date.getDate();
  switch(thatMonth) {
    case 0:
      thatMonth = 'Jan';
      break;
    case 1:
      thatMonth = 'Feb';
      break;
    case 2:
      thatMonth = 'Mar';
      break;
    case 3:
      thatMonth = 'Apr';
      break;
    case 4:
      thatMonth = 'May';
      break;
    case 5:
      thatMonth = 'Jun';
      break;
    case 6:
      thatMonth = 'Jul';
      break;
    case 7:
      thatMonth = 'Aug';
      break;
    case 8:
      thatMonth = 'Sep';
      break;
    case 9:
      thatMonth = 'Oct';
      break;
    case 10:
      thatMonth = 'Nov';
      break;
    case 11:
      thatMonth = 'Dec';
      break;
    default:
      break;
  }
  return `${thatMonth} ${thatDay}`;
}
