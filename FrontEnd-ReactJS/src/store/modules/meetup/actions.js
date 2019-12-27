export function createMeetupRequest(data) {
    return {
        type: '@meetup/CREATE_MEETUP_REQUEST',
        payload: { data },
    };
}

export function updateMeetupRequest(id, data) {
    return {
        type: '@meetup/UPDATE_MEETUP_REQUEST',
        payload: { id, data },
    };
}

export function subscribeMeetupRequest(meetupId) {
    return {
        type: '@meetup/SUBSCRIBE_MEETUP_REQUEST',
        payload: { meetupId },
    };
}

export function loadSubscribedMeetupsRequest() {
    return {
        type: '@meetup/LOAD_SUBSCRIBED_MEETUPS_REQUEST',
    };
}

export function loadSubscribedMeetupsSucess(subscribedMeetups) {
    return {
        type: '@meetup/LOAD_SUBSCRIBED_MEETUPS_SUCESS',
        payload: { subscribedMeetups },
    };
}