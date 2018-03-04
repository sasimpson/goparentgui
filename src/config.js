const config = {
    production: {
        protocol: "http",
        host: "192.168.99.100",
        port: 30869
    },
    default: {
        protocol: "http",
        host: "localhost", 
        port: 8000
    },
    // development: {
    //     protocol: "http",
    //     host: "192.168.99.100", 
    //     port: 32610
    // },
    //using mitmproxy to my minikube instance of the service
    //mitmproxy -p 8081 -R http://192.168.99.100:32610
    development: {
        protocol: "http",
        host: "localhost", 
        port: 8000
    },
}

export default config