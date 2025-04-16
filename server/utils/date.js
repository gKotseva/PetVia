exports.formatDate = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

exports.checkDateStatus = (data) => {
    const past = []
    const future = []

    const today = new Date()
    const formattedToday = this.formatDate(today)

    data.map(e => {
        const formattedCurrentDay = this.formatDate(e.appointment_date)
        e.appointment_date = formattedCurrentDay
        if (formattedCurrentDay >= formattedToday) {
            future.push(e)
        } else {
            past.push(e)
        }
    })

    return({past: past, future: future})
}