export const cars= [
    {
        id: '00001',
        make: 'Toyota',
        model: 'Corolla',
        year: '2015',
        date: '10 Nov 2022', // selling date
        seller: {
            id: 'D0001',
            name: 'Amiah Pruitt',
            email: 'olen_legros@gmail.com	',
            phoneNumber: '272-940-8266',
            address: '908 Jack Locks',
            country: 'Greenland',
            state: 'Virginia',
            city: 'Rancho Cordova',
            zipCode: '85807',
            company: 'Upwork',
            isVerified: true, // email verification
            status: 'active', // "active" or "banned"
            role: 'Dealer',  // "Super Admin" or "Inspector" or "Dealer"
        },
        auction: {
            status: 'active', // "active" or "wait_auction" or "expired"
            date: '8 Jan 2023', // auction date
            time:'10:20 AM',
            duration: '1 hour',
            price: '211,110 AED' // seller's price
        },
        inspection_status: 'No Deal',
        online_price: '$0.00',
        asked_price: '$40,000.00',
        offered_price: '$30,000.00',
        inspector:{
            id: 'INS00001',
            name: 'Amiah Pruitt',
            email: 'olen_legros@gmail.com	',
            phoneNumber: '272-940-8266',
            address: '908 Jack Locks',
            country: 'Greenland',
            state: 'Virginia',
            city: 'Rancho Cordova',
            zipCode: '85807',
            company: 'Upwork',
            isVerified: true, // email verification
            status: 'active', // "active" or "banned"
            role: 'Inspector',  // "Super Admin" or "Inspector" or "Dealer"
        },
        bidders:[
            {
            bidder:{
                id: 'D0001',
                name: 'Amiah Pruitt',
                email: 'olen_legros@gmail.com	',
                phoneNumber: '272-940-8266',
                address: '908 Jack Locks',
                country: 'Greenland',
                state: 'Virginia',
                city: 'Rancho Cordova',
                zipCode: '85807',
                company: 'Upwork',
                isVerified: true, // email verification
                status: 'active', // "active" or "banned"
                role: 'Dealer',  // "Super Admin" or "Inspector" or "Dealer"
            },
            time: '11:10 am',
            bid: '$40,000',
            },
        ],
    },
]
