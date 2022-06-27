import { config } from '@keystone-6/core'
import { lists } from './schema'
import { withAuth, session } from './auth'
import { insertSeedData } from './seed'

const MiB = 10

const PORT = process.env.PORT || 3022

export default withAuth(
  config({
    server: {
      port: +PORT,
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
      provider: 'postgresql',
      url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/keystone',
      useMigrations: true,
      idField: {
        kind: 'uuid',
      },
      async onConnect(context) {
        const firstFilm = await context.prisma.Film.findFirst({})
        if (!firstFilm) {
          await insertSeedData(context)
        }
      },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    storage: {
      local: {
        kind: 'local',
        type: 'image',
        generateUrl: (path) => `http://localhost:${PORT}/images${path}`,
        serverRoute: {
          path: '/images',
        },
        storagePath: 'public/images',
      },
      minio_s3: {
        kind: 's3',
        type: 'image',
        bucketName: 'for-local-testing',
        region: 'us-west-2',
        accessKeyId: 'vTWOl8c06CsLk1W4',
        secretAccessKey: 'Fr6zRM3VdUzQ42cosjaWYnUrlWjS1j7C',
        endpoint: 'http://127.0.0.1:9000/',
        forcePathStyle: true,
      },
    },
    lists,
    session,
  })
)
