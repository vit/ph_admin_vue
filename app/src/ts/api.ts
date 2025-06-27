
const rpcURL = import.meta.env.VITE_API_BASE+'/rpc'


import { useAuthStore } from '@/stores/auth'
// import { storeToRefs } from 'pinia'

const authStore = useAuthStore()


function callRPC( method: string, payload: any ) {
    const requestBody = {
        method: method,
        payload: payload
    }

    const token = localStorage.getItem('token')
    const auth_header = token ? {'Authorization': `Bearer ${token}`} : {}

    const request = new Request(rpcURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...auth_header
        },
        body: JSON.stringify( requestBody )
    })

    return fetch( request ).then(response => {
        console.log("status: ", response.status)
        if(response.status==401) {
            authStore.logout()
        }
        return response.json()
    })
}

// export default { callRPC }
export { callRPC }

