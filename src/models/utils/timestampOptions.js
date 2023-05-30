export default {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    currentTime: function () {
        return Math.round(new Date().getTime());
    }
}