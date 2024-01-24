const jwt = require("jsonwebtoken");

exports.generate = function (userData, isRefresh = false) {
  return {
    access: jwt.sign(userData.toJSON(), process.env.ACCESS_KEY, {
      expiresIn: "30m",
    }),
    refresh: isRefresh? undefined:
       jwt.sign(
          { _id: userData._id, password: userData.password },
          process.env.REFRESH_KEY,
          { expiresIn: "3d" },
        )
  };
};


exports.verify = function(token, isRefresh=false){
  return new Promise((resolve, reject)=>{
    jwt.verify(token, isRefresh? process.env.REFRESH_KEY: process.env.ACCESS_KEY, function(err, data){
      if(err) reject(err)
      resolve(data);
    })
  })

}