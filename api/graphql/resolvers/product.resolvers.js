
const product = (_, { id }) => {
    return {
        id,
        name: 'Producto 1',
        price: 321.4,
        description: "Lorem ipsum dolor sit amet.",
        image: "https://image.com",
        createdAt: new Date().toISOString(),
    }
}

const products = (_, args) => {
    return []
}


module.exports = {
    product,
    products,
}
