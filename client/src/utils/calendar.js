export const today = new Date();

export const months = {
    1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
    7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"
};

export const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

export const prevMonth = () => {
    setVisibleMonth((prev) => (prev === 0 ? 11 : prev - 1));
};

export const nextMonth = () => {
    setVisibleMonth((prev) => (prev === 11 ? 0 : prev + 1));
};

export const isPastDate = (date) => {
    const todayCopy = new Date(today);
    todayCopy.setHours(0, 0, 0, 0);
    return date < todayCopy;
};