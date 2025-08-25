export function basicMidleware(req, res, next) {
    console.log('Requisição recebida em:', );
    console.log(`${req.method} - ${req.path} ${req.statusCode} : ${req.ip} | ${new Date().toString()}`);
    next();
}