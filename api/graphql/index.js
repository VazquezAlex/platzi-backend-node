// Third-party imports.
const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default');
const { expressMiddleware } = require('@apollo/server/express4');
const { loadFiles } = require('@graphql-tools/load-files');

// Local imports.
const resolvers = require('./resolvers');

// const resolvers = {
//     Query: {
//         hello: () => "Hello World",
//         getPerson: (_, args) => `Hello my name is ${ args.name }, I'm ${ args.age } years old!`,
//         getInt: (_, { age }) => age,
//         getFloat: (_, { price }) => price,
//         getString: () => "Hi!",
//         getBoolean: () => true,
//         getID: () => "1892842932",
//         getNumbers: (_, { numbers }) => numbers,
//         getProduct: () => {

//         },
//     }
// }

const useGraphQL = async (app) => {
    const server = new ApolloServer({
        typeDefs: await loadFiles('./api/**/*.graphql'),
        resolvers: resolvers,
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
