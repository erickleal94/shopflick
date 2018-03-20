export function getFeed(callback) {

    this.setTimeout(() => {
        return callback.onSuccess(require('../../data/feed.json'))
    }, 1.5*1000);

}