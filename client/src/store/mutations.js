export default {
    saveUserType (state,user) {
        state.list.push(Object.assign({ }, user));
    }
}