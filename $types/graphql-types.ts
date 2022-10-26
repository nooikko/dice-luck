export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateProject = {
  name: Scalars['String'];
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateUser = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  createUser: User;
  deleteProject: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  loginJwt: Scalars['String'];
  loginMagic: Scalars['Boolean'];
  resendMagic: Scalars['Boolean'];
  validateMagic: Scalars['String'];
};

export type MutationCreateProjectArgs = {
  project: CreateProject;
};

export type MutationCreateUserArgs = {
  user: CreateUser;
};

export type MutationDeleteProjectArgs = {
  id: Scalars['String'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};

export type MutationLoginJwtArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationLoginMagicArgs = {
  email: Scalars['String'];
};

export type MutationResendMagicArgs = {
  email: Scalars['String'];
};

export type MutationValidateMagicArgs = {
  slug: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['String'];
  name: Scalars['String'];
  owner: User;
  users?: Maybe<Array<User>>;
};

export type Query = {
  __typename?: 'Query';
  getProject?: Maybe<Project>;
  getUser?: Maybe<User>;
  getUsers: Array<Maybe<User>>;
};

export type QueryGetProjectArgs = {
  id: Scalars['String'];
};

export type QueryGetUserArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  ownedProjects: Array<Project>;
  password: Scalars['String'];
  projects: Array<Project>;
};
