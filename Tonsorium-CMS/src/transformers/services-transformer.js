class ServicesTransformer {
  async transformService(user){
    return await transform(user);
  }
    
  async transformMultiple(user){
    let data = [];
    for (let i = 0; i < user.length; i++) {
      data.push(await transform(user[i]));
    }
    return data;
  }
}

module.exports = ServicesTransformer;

const transform = async (user) => {
  return {
    id:user.id,
    _id: user._id,
    serviceName: user.serviceName,
    price: user.price,
    serviceDescription: user.serviceDescription
  };
};






