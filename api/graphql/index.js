// Third-party imports.
const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default');
const { buildContext } = require('graphql-passport');
const { expressMiddleware } = require('@apollo/server/express4');
const { loadFiles } = require('@graphql-tools/load-files');
const { typeDefs: scalarsypeDefs, resolvers: scalarsResolvers } = require('graphql-scalars');

// Local imports.
const resolvers = require('./resolvers');

// Sample of resolvers 👇🏻.
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

    const typeDefs = [
        ...await loadFiles('./api/**/*.graphql'),
        scalarsypeDefs,
    ];

    const allResolvers = [
        resolvers,
        scalarsResolvers,
    ]

    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: allResolvers,
        context: ({ req, res}) => buildContext({ req, res }),
        playground: true,
        plugins: [
            ApolloServerPluginLandingPageLocalDefault
        ]
    });

    await server.start();

    app.use(
        '/graphql',
        expressMiddleware(server, {
            context: async ({req, res}) => buildContext({req, res})
        }),
    );
}

module.exports = useGraphQL;
