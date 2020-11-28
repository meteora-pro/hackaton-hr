module.exports = [
  {
    // Соединение для local окружения
    name: "default",
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USERNAME || "postgres",
    password: process.env.POSTGRES_PASSWORD || "ilt0q1drzye",
    database: process.env.DB_NAME || "local_api",
    logging: false,
    dropSchema: false,
    entities: [
      "apps/api/src/app/**/*.entity.ts",
    ],
    synchronize: true,
    migrationsRun: true,
    cli: {
      entitiesDir: ["apps/api/src/**/entities"],
      migrationsDir: ["apps/api/src/app/migrations"],
      subscribersDir: ["apps/api/src/subscribers"],
    },
  }
];
