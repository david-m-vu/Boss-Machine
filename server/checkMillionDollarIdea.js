const checkMillionDollarIdea = (req, res, next) => {
    let numWeeks = Number(req.body.numWeeks);
    let weeklyRevenue = Number(req.body.weeklyRevenue);
    let expectedReturn = numWeeks * weeklyRevenue;
    
    if (!numWeeks || !weeklyRevenue || isNaN(numWeeks) || isNaN(weeklyRevenue) || expectedReturn < 1000000) {
        return res.status(400).send();    
    }
    next();
};
 
// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
