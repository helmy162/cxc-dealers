
export function carStatus( car ) {
    
    let liveStatus;
    const endDate = new Date(car?.auction?.end_at);
    const startDate = new Date(car?.auction?.start_at);
    const currentTime = new Date();
    const difference = endDate - currentTime;
    if(car?.status?.toLocaleLowerCase() !== 'approved' && car?.car?.status?.toLocaleLowerCase() !== 'approved'){
        liveStatus = 'pending';
    }
    else if(currentTime < startDate) {
        liveStatus = 'upcoming';
    }
    else if (difference < 0) {
        liveStatus = 'expired';
    }
    else{
        liveStatus = 'live';
    }
    
    

    return liveStatus;
    
}

export function carTimer( productStatus ) {
    let timeRemaining;
        if (productStatus < 0 || productStatus === null) {
            timeRemaining = '';
            return;
        }
        const hours = Math.floor(productStatus / 1000 / 60 / 60);
        const minutes = Math.floor((productStatus / 1000 / 60) % 60);
        const seconds = Math.floor((productStatus / 1000) % 60);
        timeRemaining = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return timeRemaining;

}