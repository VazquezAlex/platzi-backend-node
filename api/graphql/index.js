// Third-party imports.
const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default');
const { expressMiddleware } = require('@apollo/server/express4');
const { loadFiles } = require('@graphql-tools/load-files');

const resolvers = {
    Query: {
        hello: () => "Hello World",
        getPerson: (_, args) => `Hello my name is ${ args.name }, I'm ${ args.age } years old!`,
        getInt: (_, { age }) => age,
        getFloat: (_, { price }) => price,
        getString: () => "Hi!",
        getBoolean: () => true,
        getID: () => "1892842932",
        getNumbers: (_, { numbers }) => numbers,
        getProduct: () => {
            return {
                id: '12345',
                name: 'Producto 1',
                price: 321.4,
                description: "Lorem ipsum dolor sit amet.",
                image: "https://image.com",
                createdAt: new Date().toISOString(),
            }
        },
    }
}

const useGraphQL = async (app) => {
    const server = new ApolloServer({
        typeDefs: await loadFiles('./api/**/*.graphql'),
        resolvers,
        playground: true,
        plugins: [
            ApolloServerPluginLandingPageLocalDefault
        ]
    });

    await server.start();

    app.use(expressMiddleware(server, {
        context: async ({ req }) => ({
            token: req.headers.token,
        })
    }));
}

module.exports = useGraphQL;
