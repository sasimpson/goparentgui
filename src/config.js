const config = {
    production: {
        protocol: "https",
        host: "goparent-181120.appspot.com",
        port: 80
    },
    default: {
        protocol: "http",
        host: "localhost", 
        port: 8080
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
        port: 8080
    },
}

export default config