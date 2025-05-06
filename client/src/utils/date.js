export const formatDate = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

export function getStartOfWeek(date) {
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
}

export function getDayName(date) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
}

export function getWeekDays(currentWeekIndex) {
    const today = new Date();
    const baseMonday = getStartOfWeek(today);
    const monday = new Date(baseMonday);
    monday.setDate(baseMonday.getDate() + currentWeekIndex * 7);

    return Array.from({ length: 7 }, (_, i) => {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        return day;
    });
}

export function getDaysInMonth (year, month) {
    const daysInMonth = new Date(year, month, 0).getDate();
  
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(formatDate(new Date(year, month - 1, day)));
    }
  
    return days;
};

export function getStartDayOfMonth(year, month) {
    const date = new Date(year, month - 1, 1);
    return date.getDay();
}

export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];