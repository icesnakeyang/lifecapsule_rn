import {AsyncStorage} from "react-native";

export default class DataStore {
    fetchPostData(url, requestBody, token) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': "application/json;charset=UTF-8",
                    token: token
                }
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                }
            }).then((data) => {
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    fetchData(url) {
        fetch(url)
            .then((response) => {
            })
            .catch((error) => {
            })

        return

        return new Promise((resolve, reject) => {
            this.fetchLocalData(url)
                .then((response) => {
                    if (response && this.checkTimeValid(response.timestamp)) {
                        resolve(response)
                    } else {
                        throw new Error('Read local data error')
                    }
                })
                .catch((error) => {
                    this.fetchNetData(url)
                        .then((response) => {
                            resolve(this.wrapData(response))
                        })
                        .catch((error) => {
                            reject(error)
                        })
                })
        })
    }

    fetchLocalData(key) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(key, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(e)
                    }
                } else {
                    reject(error)
                }
            })
        })
    }

    fetchNetData(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Network response error')
            }).then((responseData) => {
                resolve(responseData)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    saveData(key, data) {
        if (!key || !data) {
            return
        }
        AsyncStorage.setItem(key, JSON.stringify(this.wrapData(data)))
    }

    removeData(key) {
        let item1=AsyncStorage.getItem(key)
        AsyncStorage.removeItem(key, (error) => {
            return false
        })
        let item2=AsyncStorage.getItem(key)
        return true
    }

    wrapData(data) {
        return {
            data: data,
            timestamp: new Date().getTime()
        }
    }

    checkTimeValid(timestamp) {
        const currentDate = new Date()
        const targetDate = new Date()
        targetDate.setTime(timestamp)
        if (currentDate.getMonth() !== targetDate.getMonth()) {
            return false
        }
        if (currentDate.getDate() !== targetDate.getDate()) {
            return false
        }
        if (currentDate.getHours() - targetDate.getHours() > 1) {
            return false
        }
        return true
    }
}