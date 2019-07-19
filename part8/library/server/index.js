const {ApolloServer, gql, UserInputError, AuthenticationError} = require(
    'apollo-server');
const Author = require('./models/author');
const Book = require('./models/book');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

mongoose.set('useFindAndModify', false);

const MONGODB_URI = 'mongodb+srv://swkeever:salasana@cluster0-wyhhb.mongodb.net/part8-library?retryWrites=true&w=majority';
const JWT_SECRET = 'helloworld12345';

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI, {useNewUrlParser: true}).
    then(() => console.log('connected to MongoDB')).
    catch((error) => console.error('error connection to MongoDB:',
        error.message));

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(authorName: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      authorName: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    
    createUser(username: String!, favoriteGenre: String!): User
    
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => {
      return Book.collection.countDocuments();
    },
    authorCount: () => {
      return Author.collection.countDocuments();
    },
    allBooks: (root, args) => {
      let filter = {};

      if (args.author) {
        filter = {...filter, author: args.author};
      }

      if (args.genre) {
        filter = {
          ...filter,
          genres: {
            $in: [args.genre],
          },
        };
      }

      return Book.find(filter);
    },
    allAuthors: () => {
      return Author.find({});
    },
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated');
      }

      const book = {
        title: args.title,
        published: args.published,
        genres: args.genres,
      }

      const author = await Author.findOne({ 
        name: args.authorName 
      });

      if (!author) {
        const newAuthor = new Author({
          name: args.authorName,
          born: null,
          bookCount: 1,
        });

        const savedAuthor = await newAuthor.save();

        const updatedBook = new Book({
          ...book,
          author: savedAuthor._id,
        });

        const savedBook = await updatedBook.save();

        return {
          ...book,
          id: savedBook._id,
          author: {
            id: savedAuthor._id,
            name: savedAuthor.name,
            bookCount: 1,
            born: null,
          }
        };
      } else {
        const updatedAuthor = {
          name: author.name,
          born: author.born,
          bookCount: author.bookCount ? author.bookCount + 1 : 1,
        };

        console.log('updatedAuthor');
        console.log(updatedAuthor)

        const savedAuthor = await Author.findByIdAndUpdate(author._id, updatedAuthor, { new: true });

        const updatedBook = new Book({
          ...book,
          author: savedAuthor._id,
        });

        const savedBook = await updatedBook.save();

        return {
          ...book,
          id: savedBook._id,
          author: {
            id: savedAuthor._id,
            name: savedAuthor.name,
            born: savedAuthor.born,
            bookCount: savedAuthor.book,
          }
        }
      }
    },
    editAuthor: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated');
      }

      const author = await Author.findOne({name: args.name});
      author.born = args.setBornTo;
      return author.save().
          catch((error) => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            });
          });
    },
    createUser: (root, args) => {
      const user = new User({...args});

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username});

      if (!user || args.password !== 'secred') {
        throw new AuthenticationError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, JWT_SECRET),
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;


    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      );

      const currentUser = await User.findById(decodedToken.id);

      

      return { currentUser };
    }

    return null;
  },
});

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`);
});