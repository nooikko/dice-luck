import { PrismaClient, User } from '@prisma/client';

export interface TokenData {
  email: User['email'];
  name?: User['name'];
  id: User['id'];
  verified: User['verified'];
  validated?: boolean;
  iat?: number;
}

export interface Context {
  prisma: PrismaClient;
  cookies: {
    [key: string]: string;
  };
  unpackedToken: TokenData;
}

export type ResolverFn<Args, Output> = (parent: any, args: Args, ctx: Context) => Output;
