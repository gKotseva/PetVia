export const today = new Date();

export const months = {
    0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June",
    6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"
};

export const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

export const isPastDate = (date) => {
    const todayCopy = new Date(today);
    todayCopy.setHours(0, 0, 0, 0);
    return date < todayCopy;
};

  