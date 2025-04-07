exports.getSchedule = (salonId) => {
    const query = `select * from salon_schedule where salon_id = ${salonId};`
  
    return query;
}