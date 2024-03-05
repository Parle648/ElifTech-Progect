import { host } from "../../../shared/constants/host"

export default function sendOrder(data: any) {
    return new Promise((resolve, reject) => {
        try {
            resolve(fetch(`${host}/api/mail/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }))
        } catch (err) {
            reject(err)
        }
    })
    .then((response: any) => response.json())
}