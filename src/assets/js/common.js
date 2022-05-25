export default {
    install(app) {
        app.config.globalProperties.$msToHMS = ( ms ) => {
            // 1- Convert to seconds:
            let seconds = ms / 1000;
            // 2- Extract hours:
            let hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
            seconds = seconds % 3600; // seconds remaining after extracting hours
            // 3- Extract minutes:
            let minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
            // 4- Keep only seconds not extracted to minutes:
            seconds = seconds % 60;

            return String(hours).padStart(2, '0')+":"+String(minutes).padStart(2, '0')+":"+String(seconds).padStart(2, '0')
        }
        
    }
}