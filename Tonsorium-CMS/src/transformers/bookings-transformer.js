class BookingsTransformer {
    transformBooking(booking){
      return transform(booking);
    }
      
    transformMultiple(booking){
      let data = [];
      for (let i = 0; i < booking.length; i++) {
        data.push(transform(booking[i]));
      }
      return data;
    }
  }
  
  module.exports = BookingsTransformer;
  
  const transform = (booking) => {
    return {
      _id: booking._id,
    };
  };
  
  
  
  
  
  
  