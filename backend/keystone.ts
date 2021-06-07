import { createAuth } from '@keystone-next/auth'
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { insertSeedData } from './seed-data';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long they stay signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    //TODO: Add in initial roles here
  }
})

export default withAuth(config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    }
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    async onConnect(keystone) {
      console.log('Connected to the database');
      if (process.argv.includes('--seed-data')) {
        await insertSeedData(keystone);
      }
    },
  },
  lists: createSchema({
    // Schema items go in here
    User,  //same as User: User
    Product,
    ProductImage,
  }),
  ui: {
    // show the UI only for people who pass this test
    isAccessAllowed: ({ session }) => {
      console.log(session);
      return !!session?.data;
    },
  },
  //TODO: Add session values here
  session: withItemData(statelessSessions(sessionConfig), {
    // GraphQl Query
    User: 'id name email'
  })
}));