export const saveState = (state) => {
    try{
        const serializedState =JSON.stringify(state);
        localStorage.setItem("store", serializedState)
    } catch (e) {
        console.log(e)
    }
};