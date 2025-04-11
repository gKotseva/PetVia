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

exports.generateSlots = (schedule, appointments, service_duration, user_type) => {
    const convertTimeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const startOfDay = convertTimeToMinutes(schedule.open_time);
    const endOfDay = convertTimeToMinutes(schedule.close_time);
    const breakStart = convertTimeToMinutes(schedule.break_start);
    const breakEnd = convertTimeToMinutes(schedule.break_end);

    let currentTime = startOfDay;
    let slots = [];

    while (currentTime < endOfDay){
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

        let slot = {slot: `${hours}:${minutes}`, status};

        if (appointment && user_type === 'salon') {
            slot.appointment = appointment;
        }

        slots.push(slot);
        currentTime += 30;
    }
    
    if (user_type === 'customer'){
        const requiredSlots = Math.ceil(service_duration / 30);
    let validIndexes = new Set();
    
    for (let i = 0; i <= slots.length - requiredSlots; i++) {
        let isFree = true;
    
        for (let j = 0; j < requiredSlots; j++) {
            if (slots[i + j].status !== 'free') {
                isFree = false;
                break;
            }
        }

        if (isFree) {
            for (let j = 0; j < requiredSlots; j++) {
                validIndexes.add(i + j);
            }
        }
    }
    
    slots = slots.map((slot, index) => {
        if (slot.status === 'free' && !validIndexes.has(index)) {
            return { ...slot, status: 'not-available' };
        }
        return slot;
    });
    }

    return slots;
};