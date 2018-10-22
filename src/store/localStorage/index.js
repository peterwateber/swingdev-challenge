export const loadState = () => {
    try {
        const serializeState = localStorage.getItem('photos');
        if (serializeState) {
            return JSON.parse(serializeState);
        }
        return false;
    } catch (ex) {
        return false;
    }
};


export const saveState = state => {
    try {
        const serializeState = JSON.stringify(state);
        localStorage.setItem('photos', serializeState);
    } catch (ex) {

    }
}