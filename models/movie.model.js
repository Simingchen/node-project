var mongoose =require("mongoose");

var movieSchema = mongoose.Schema({
    //电影名称、导演、国家、语言、上映时间、图片、简介
    title:String,
    director:String,
    country:String, 
    language:String,
    year:Number,
    poster:String,
    summary:String,
    flash:String   
});

mongoose.model("movie",movieSchema);