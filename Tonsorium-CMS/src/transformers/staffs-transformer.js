class StaffsTransformer {
    async transformStaff(user){
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
  
  module.exports = StaffsTransformer;
  
  const transform = async (user) => {
    return {
      id: user.id,
      _id: user._id,
      staffName: user.staffName,
      staffPosition: user.staffPosition,
      staffDescription: user.staffDescription,
      availableDays: user.availableDays,
      image: `http://localhost:8080/backend/uploads/staffs/${user.image}`
    };
  };
  
  
  
  
  
  
  