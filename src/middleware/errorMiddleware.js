export const errorMiddlware = (err, req, res, next) => {
    // err.statusCode =  500
    // err.status = err.status || "failed"

    console.log("error -->",err);
    return res.status(500).json({
        status: false,
        message : err
    })
    // console.log("global error middleware -->",err.message);

    // if(err.message == "faaltu ka errror"){
    //     res.status(500).json({
    //         status: false,
    //         message : "janiii db rorah a"
    //     })
    // }
}