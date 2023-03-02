//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");



const app=express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


let items=["cook","butter","rice"];
let workitems=[];

app.get("/",function(req,res)
{
    let day=date.getDay();
    res.render("list",{listTitle: day, newitem: items});

});

app.get("/work",function(req,res)
{
    
    res.render("list",{listTitle:"Work Items" , newitem:workitems});

});

app.post("/work",function(req,res)
{
    let workitem=req.body.newItem;

    workitems.push(workitem);
    res.redirect("/work");
})

app.post("/",function(req,res)
{
    let item=req.body.newItem;
    if(req.body.list==="Work Items")
    {
        workitems.push(item); 
        res.redirect("/work");
    }
    else 
    {
        items.push(item);    
        res.redirect("/");
    }
});


app.listen(3000,function()
{
    console.log("server is running perfectly");

});