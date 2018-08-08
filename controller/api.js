module.exports = {

    parseJson: async (req, res, next) => {
        try {
            console.log('req.body');
            console.log(req.body);
            res.status(200).json({
                'msg':'hello'
            });
        } catch(err){
            next(err);
        }
    }

}