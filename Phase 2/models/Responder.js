const { mongoose, Schema} = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mcforum');

function errorFn(err){
    console.log('Error found. Please trace!');
    console.error(err);
}
module.exports.errorFn = errorFn;

//insert code here
const accountSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    bio: { type: String },
    'profile-pic': { type: String }
},{ versionKey: false });
const accountModel = mongoose.model('account', accountSchema);
module.exports.accountModel = accountModel;

const postSchema = new mongoose.Schema({
    id: { type: Number },
    title: { type: String },
    author: { type: String },
    'profile-pic': { type: String },
    body: { type: String },
    tags: [{type: String}],
    replies: { type: Number },
    likes: { type: Number},
    dislikes: { type: Number },
    date: { type: Date }
},{ versionKey: false });
const postModel = mongoose.model('post', postSchema);
module.exports.postModel = postModel;

const commentSchema = new mongoose.Schema({
    id: { type: Number },
    postID: { type: Number },
    author: { type: String },
    'profile-pic': { type: String },
    content: { type: String },
    likes: { type: Number },
    dislikes: { type: Number },
    date: { type: Date },
    parentComment: { type: Schema.Types.ObjectID, ref: 'comment', default: null },
    replies: [{ type: Schema.Types.ObjectID, ref: 'comment' }],
    ndate: { type: String }
},{ versionKey: false });
commentSchema.pre("save", function (next){
    var i = this;
    i.ndate(i.date.toDateString());
    next();
});
commentSchema.pre("find", function (next){
    this.populate({path:"replies",
        populate:{path:"author"}
    });
    next();
});
const commentModel = mongoose.model('comment', commentSchema);
module.exports.commentModel = commentModel;



function finalClose(){
    console.log('Connection closed!');
    mongoose.connection.close();
    process.exit();
}

process.on('SIGTERM',finalClose);  //general termination signal
process.on('SIGINT',finalClose);   //catches when ctrl + c is used
process.on('SIGQUIT', finalClose); //catches other termination commands

