let socket;

module.exports = {
    handleSocketConnection(s) {
        console.log('connected to socket');
        socket= s;
    }, 
    getSocket() {
        return socket;
    }
}