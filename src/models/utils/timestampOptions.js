export default {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: function () {
        return Math.round(new Date().getTime());
    }
}