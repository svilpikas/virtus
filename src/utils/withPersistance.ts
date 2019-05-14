export default reducer => (state, action) => {
    let s = state;
    if (!s) {
        try {
            const lStore = localStorage.getItem("store");
            s = lStore ? JSON.parse(lStore) : undefined;
        } catch (e) {
            // tslint:disable-next-line: no-console
            console.log(e);
        }
    }
    return reducer(s, action);
};
