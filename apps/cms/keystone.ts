import { config } from '@keystone-6/core'
import { lists } from './schema'
import { withAuth, session } from './auth'
import { insertSeedData } from './seed'

const MiB = 10

const PORT = 3022

export default withAuth(
  config({
    server: {
      port: PORT,
      maxFileSize: MiB * 1024 * 1024,
      cors: {
        origin: process.env.FRONT_URL || 'http://localhost:3000',
        credentials: true,
      },
      extendExpressApp: (app, createContext) => {
        app.use('/api/rest', async (req, res, next) => {
          res.locals.__ks_ctx = await createContext(req, res)
          next()
        })

        app.get('/api/rest/users', async (req, res) => {
          const result = await res.locals.__ks_ctx.query.User.findMany()
          res.json(result)
        })
        app.get('/api/rest/films', async (req, res) => {
          const result = await res.locals.__ks_ctx.query.Film.findMany()
          res.json(result)
        })
      },
    },
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
      async onConnect(context) {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(context)
          // process.exit();
        }
      },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    storage: {
      my_local_images: {
        kind: 'local',
        type: 'image',
        generateUrl: (path) => `http://localhost:${PORT}/images${path}`,
        serverRoute: {
          path: '/images',
        },
        storagePath: 'public/images',
      },
    },
    lists,
    session,
  })
)
