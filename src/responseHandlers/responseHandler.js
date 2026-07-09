const successResponse = (statusCode,status,message,data,res) =>{
    return res.status(statusCode).json({
        status:status,
        message:message,
        data:data
    })
}

const errorResponse = (statusCode,status,message,res) =>{
    return res.status(statusCode).json({
        status:status,
        message:message
    })
}

export { successResponse, errorResponse }