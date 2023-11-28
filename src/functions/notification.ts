import { Notify } from 'quasar'

//define the popup notification message, postition, time, color, and the progress bar
const notify = (message: string) => {
    Notify.create({
        message: message,
        position: 'top',
        timeout: 1500,
        color: 'red',
        progress: true
    });
}


export {
    notify
}
