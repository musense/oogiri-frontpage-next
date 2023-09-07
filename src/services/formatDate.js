export default function formatDate(
    date = undefined,
    locale = 'ko-KR'
) {
    const d = date ? new Date(date) : new Date()

    let options
    switch (locale) {
        case 'jp': {
            options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour12: false,
                hour: "numeric",
                minute: "numeric",
            }
        } break;
        case 'ko-KR': {
            options = {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            }
        } break;
        default:
            break;
    }
    return new Intl.DateTimeFormat(locale, options).format(d);
}
