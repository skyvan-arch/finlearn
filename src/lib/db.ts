import { PrismaClient } from "@prisma/client"
import { createClient } from "@libsql/client"
import { PrismaLibSQL } from "@prisma/adapter-libsql"

function makePrisma() {
  if (process.env.TURSO_DATABASE_URL) {
    const libsql = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN ?? "",
    })
    const adapter = new PrismaLibSQL(libsql)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new PrismaClient({ adapter } as any)
  }
  return new PrismaClient({ log: ["error"] })
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? makePrisma()
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
