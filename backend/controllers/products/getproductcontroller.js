const mongoose = require("mongoose");

const ProductCollection = require("../../models/ProductSchema");

const getproductcontroller = async (req, res) => {
    try {
        // console.log(req.params)   //req.pram ek array h

        const { id, category, name, subcategory } = req.params; //array destructuring used

        let products; //let can reassign but can't redeclare;initially products is an emty data

        if (category) {
            const searchcategory = category.toLowerCase(); //.toLowerCase func remove then also work
            products = await ProductCollection.find({
                //database ke lia find use
                category: { $regex: new RegExp(searchcategory, "i") }, //i for case insensitivity; farak nhi padta aapne kese likha h bus spelling same honi chahiye
            });
        }
        else if (name) {
            const searchname = name.toLowerCase();
            products = await ProductCollection.find({
                name: { $regex: new RegExp(searchname, "i") },
            });
        }
        else if (subcategory) {
            const searchsubcategory = subcategory.toLowerCase();
            products = await ProductCollection.find({
                sub_category: { $regex: new RegExp(searchsubcategory, "i") },
            });
        }
        else if (id) {
            products = await ProductCollection.find({
                _id: id, //_id=mongodb id
            });
        }
        else if (req.path.includes("/random")) {
            products = await ProductCollection.aggregate([
                {
                    $sample: {                                  //9 random products lane ke lia
                        size: 9
                    }
                }
            ]);
        }
        else if (req.path.includes("/top-rated")) {
            products = await ProductCollection.find().sort({ rating: -1 }).limit(9);    //descending order; .sort= sort krna h on the basis of rating(key in database); .limit(9)= 9 items want
        }
        else if (req.path.includes("/lowtohigh")) {
            products = await ProductCollection.find().sort({ new_price: 1 }).limit(9);  //1= Ascending order; new_price name(key) h database me ;usko ascending order me sort krna h; .limit(9)= 9 items want
        }
        else if (req.path.includes("/hightolow")) {
            products = await ProductCollection.find().sort({ new_price: -1 }).limit(9); //-1=Descending order
        }
        else {
            products = await ProductCollection.find(); //.find() se all data come from database
            console.log(`product fetched successfully`);
        }

        if (!products || products.length === 0)
            return res.status(404).send({ message: "products not found" });

        res.status(200).send(products);
    }
    catch (error) {
        res.status(504).send({
            message: "Error in fetching product",
        });
        console.log(`Error occured:${error}`);
    }
};

module.exports = getproductcontroller;
