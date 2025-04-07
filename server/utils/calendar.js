const { formatDate } = require("./date")

exports.checkDayStatus = (dates, month, year) => {
    const today = new Date();
    const formattedToday = formatDate(today);
    const daysInMonth = new Date(year, month, 0).getDate();

    const schedule = [...Array(daysInMonth)].map((_, index) => {
        const date = new Date(year, month - 1, index + 1);
        const isPast = index + 1 < today.getDate();
        const isFuture = index + 1 > today.getDate();
        const isToday = index + 1 === today.getDate();

        const foundItem = dates.find(item => formatDate(new Date(item.work_date)) === formatDate(date));

        const isWorking = foundItem ? { ...foundItem, work_date: formatDate(new Date(foundItem.work_date)) } : false;

        return {
            date: formatDate(date),
            isPast, 
            isFuture, 
            isToday, 
            isWorking
        };
    });

    return schedule
};

