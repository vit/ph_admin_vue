
const rpcURL = 'http://api.physcon.my/rpc'

function callRPC( method: string, payload: any ) {
    const requestBody = {
        method: method,
        payload: payload
    }

    const request = new Request(rpcURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( requestBody )
    })

    return fetch( request ).then(response => response.json())
}

// export default { callRPC }
export { callRPC }

