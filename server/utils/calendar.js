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

exports.generateSlots = (date, appointments, service_duration, user_type) => {
    const convertTimeToMinutes = (time) => {
        if (!time) return null;
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const startOfDay = convertTimeToMinutes(date.open_time);
    const endOfDay = convertTimeToMinutes(date.close_time);
    const breakStart = convertTimeToMinutes(date.break_start) || null;
    const breakEnd = convertTimeToMinutes(date.break_end) || null;
    const timeNow = convertTimeToMinutes(new Date().getHours() + ':' + new Date().getMinutes())

    let currentTime = startOfDay;
    let slots = [];

    while (currentTime < endOfDay) {
        let status = 'free';
        let appointment = null;

        const hours = Math.floor(currentTime / 60).toString().padStart(2, '0');
        const minutes = (currentTime % 60).toString().padStart(2, '0');

        if (currentTime >= breakStart && currentTime < breakEnd) {
            status = 'break';
        }

        appointments.forEach(app => {
            const appointmentStart = convertTimeToMinutes(app.start_time);
            const appointmentEnd = appointmentStart + app.duration;

            if (currentTime >= appointmentStart && currentTime < appointmentEnd) {
                status = 'booked';
                appointment = app;
            }
        });

        const isToday = formatDate(new Date(date.work_date)) === formatDate(new Date())

        if (isToday && currentTime < timeNow) {
            status = 'past';
        }

        let slot = { slot: `${hours}:${minutes}`, status };

        appointment ? slot.appointment = appointment : null

        slots.push(slot);
        currentTime += 30;
    };

    if (user_type === 'customer') {
        const requiredSlots = Math.ceil(service_duration / 30);

        for (let i = 0; i < slots.length; i++) {
            if (slots[i].status === 'free') {
                let canBook = true;

                for (let j = 0; j < requiredSlots; j++) {
                    if (!slots[i + j] || slots[i + j].status !== 'free') {
                        canBook = false;
                        break;
                    }
                }

                if (!canBook) {
                    slots[i].status = 'not-available';
                }
            }
        }
    }

    return slots;
};