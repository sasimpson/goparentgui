const config = {
    production: {
        protocol: "http",
        host: "192.168.99.100",
        port: 32610
    },
    default: {
        protocol: "http",
        host: "localhost", 
        port: 8000
    },
    development: {
        protocol: "http",
        host: "localhost", 
        port: 8000
    },
}

export default config