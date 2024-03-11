//Routes
const responder = require('../models/Responder');

function convertDate(data) {
  for(let i=0; i<data.length; i++) {
    let oDate = new Date();
    oDate = data[i].date;
    data[i].ndate = oDate.toDateString();
  }
}
module.exports.convertDate = convertDate;


function add(server){

  server.get('/', function (req, resp){
    let searchQuery = {};
    responder.postModel.find(searchQuery).lean().then(function(post_data){
      convertDate(post_data);
      resp.render('main',{
        layout      : 'index',
        title       : 'Forum Home',
        'post-data' : post_data
      });
    }).catch(responder.errorFn);
  });
  
  server.post('/Home/', function(req, resp){
    let searchQuery = {};
    let loginQuery = { username: req.body.user };
    responder.accountModel.findOne(loginQuery).lean().then(function(account_data){
      responder.postModel.find(searchQuery).lean().then(function(post_data){

        //checks if it found the user.

        //it found the user
        if(account_data != undefined && account_data._id != null){
          if(req.body.pass == account_data.password) {
            convertDate(post_data);
            resp.render('main',{
              layout      : 'index',
              title       : 'Forum Home',
              'post-data' : post_data
            });
          //user is found, but password is incorrect.
          } else {
            resp.render('login',{
              layout  : 'login',
              title   : 'Log In',
              errorMsg: 'Invalid password.'
            });
          }
        //user is not found.
        }else{ 
          resp.render('login',{
            layout  : 'login',
            title   : 'Log In',
            errorMsg: 'User not found.'
          });
        }

      }).catch(responder.errorFn); // post data
    }).catch(responder.errorFn); // account data
  });
  
  
  server.get('/create-post', function (req, resp){
    resp.render('create_post',{
      layout: 'index',
      title : 'Create Post'
    });
  });
  

  server.get('/profile', function (req, resp){
    resp.render('profile',{
      layout: 'profile',
      title : 'Profile'
    });
  });

  server.get('/users/:username', function (req, resp){
    let userQuery = { username: req.params.username };
    let postQuery = { author: req.params.username};

    responder.accountModel.findOne(userQuery).lean().then(function(account_data) {
      responder.postModel.find(postQuery).lean().then(function (post_data) {
        resp.render('profile',{
          layout        : 'profile',
          title         : account_data.username + '\'s Profile' ,
          'account-data': account_data,
          posts         : post_data
        });
      }).catch(responder.errorFn);
    }).catch(responder.errorFn);
  });

  server.get('/login', function (req, resp){
    resp.render('login',{
      layout  : 'login',
      title   : 'Log In',
      errorMsg: null
    });
  });

  server.get('/register', function (req, resp){
    resp.render('register',{
      layout: 'login',
      title : 'Log In'
    });
  });
  
  server.get('/posts/:postid', function (req, resp){
    let postQuery = { id : req.params.postid };
    let commentQuery = { postID : req.params.postid };
    let userQuery = { username : 'Diego' }; // TEMPORARY: Diego is assumed to be the 'logged in' user.
    responder.postModel.findOne(postQuery).lean().then(function(post_data){
      responder.commentModel.find(commentQuery).lean().then(function(comment_data) {
        responder.accountModel.findOne(userQuery).lean().then(function(user){
          post_data.loggedIn = (post_data.author == user.username);
          for(comment of comment_data){
            if(comment.author == user.username){
              comment.loggedIn = true;
            }
          }
          post_data.ndate = post_data.date.toDateString();
          convertDate(comment_data);
          resp.render('post',{
            layout          : 'index',
            title           : post_data.title,
            'post-data'     : post_data,
            'comment-data'  : comment_data,
            postLogged      : post_data.loggedIn,
          });
        }).catch(responder.errorFn); // diego(user)Query end
      }).catch(responder.errorFn); // commentQuery end
    }).catch(responder.errorFn); // postQuery end
  });

  server.get('/posts/:postid/edit', function (req, resp){
    let postQuery = { id : req.params.postid };
    let loggedUser = 'Diego'; // TEMPORARY: Diego is assumed to be the 'logged in' user.
    responder.postModel.findOne(postQuery).lean().then(function(post_data){
      if(post_data.author == loggedUser) {
        resp.render('edit_post',{
          layout      : 'index',
          title       : 'Edit Post',
          'post-data' : post_data
        });
      }else{
        resp.render('error',{
          layout: 'blackBg',
          title : 'Error',
          msg   : 'You\'re not supposed to be here :)'
        });
      }
    }).catch(responder.errorFn);
  });

  // I don't think this is safe...LOL
  server.get('/users/:user/edit', function (req, resp){
    let userQuery = { username: req.params.user };
    let loggedUser = 'Diego'; // TEMPORARY: Diego is assumed to be the 'logged in' user.
    responder.accountModel.findOne(userQuery).lean().then(function(account_data){
      if(req.params.user == loggedUser){
        resp.render('profile_edit',{
          layout        : 'profile',
          title         : 'Edit Profile',
          'account-data': account_data
        });
      }else{
        resp.render('error',{
          layout: 'blackBg',
          title : 'Error',
          msg   : 'You\'re not supposed to be here :)'
        });
      }
    }).catch(responder.errorFn);
  });

  //error page for debugging
  server.get('/error', function (req, resp){
    resp.render('error',{
      layout: 'blackBg',
      title: 'Error',
      msg: 'You\'re not supposed to be here :)'
    });
  });
}

module.exports.add = add;

//Note: There are other ways to declare routes. Another way is to
//      use a structure called router. It would look like this:
//      const router = express.Router()
