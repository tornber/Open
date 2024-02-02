export const createDateFromString = (date) => {
    const [year, month, day] = date.split('-')
    return new Date(year, month, day)
}