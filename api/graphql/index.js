// Third-party imports.
const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default');
const { expressMiddleware } = require('@apollo/server/express4');

const typeDefs = `
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello World'
    }
}

const useGraphQL = async (app) => {
    const server = new ApolloServer({
        typeDefs,
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
