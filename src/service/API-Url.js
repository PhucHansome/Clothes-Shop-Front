class App{
    static DOMAIN_API = 'http://localhost:8092'
    static BASE_URL_AUTH = this.DOMAIN_API + '/api/auth'
    static BASE_URL_CATEGORY = this.DOMAIN_API + '/api/category'
    static BASE_URL_PRODUCT = this.DOMAIN_API + '/api/product'
    static BASE_URL_PRODUCTCOLOR = this.DOMAIN_API + '/api/product-color'
    static BASE_URL_PRODUCTIMAGE = this.DOMAIN_API + '/api/product-image'
    static BASE_URL_PRODUCTSIZE = this.DOMAIN_API + '/api/product-size'
}
module.exports = App;