import {AsyncStorage} from "react-native";

export default class DataStore {
    fetchPostData(url, postParams) {
        return new Promise((resolve, reject) => {
            fetch(url, postParams)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                })
                .then((data) => {
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        })
    }

    fetchData(url) {
        console.log('read net work')
        console.log(url)
        fetch(url)
            .then((response) => {
                console.log(11)
                console.log(response)
            })
            .catch((error) => {
                console.log(12)
                console.log(error)
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
                        console.log(e)
                    }
                } else {
                    reject(error)
                    console.log(error)
                }
            })
        })
    }

    fetchNetData(url) {


        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Network response error')
                })
                .then((responseData) => {
                    this.saveData(url, responseData)
                    resolve(responseData)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    saveData(key, data, callback) {
        if (!key || !data) {
            return
        }
        AsyncStorage.setItem(key, JSON.stringify(this.wrapData(data)), callback)
    }

    wrapData(data) {
        return {
            data: data,
            timestamp: new Date().getTime()
        }
    }

    checkTimeValid(timestamp) {
        console.log('check time')
        const currentDate = new Date()
        const targetDate = new Date()
        targetDate.setTime(timestamp)
        if (currentDate.getMonth() !== targetDate.getMonth()) {
            console.log(1)
            return false
        }
        if (currentDate.getDate() !== targetDate.getDate()) {
            console.log(2)
            return false
        }
        console.log(currentDate.getHours())
        console.log(targetDate.getHours())
        if (currentDate.getHours() - targetDate.getHours() > 1) {
            console.log(3)
            return false
        }
        console.log(4)
        return true
    }
}