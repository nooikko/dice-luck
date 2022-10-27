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

export type Character = {
  __typename?: 'Character';
  classLevels: Array<Maybe<ClassLevel>>;
  id: Scalars['String'];
  name: Scalars['String'];
  project: Project;
  rolls: Array<Maybe<Roll>>;
  user: User;
};

export type Class = {
  __typename?: 'Class';
  id: Scalars['String'];
  name: Scalars['String'];
  subclasses: Array<Scalars['String']>;
};

export type ClassLevel = {
  __typename?: 'ClassLevel';
  character: Character;
  class: Class;
  id: Scalars['String'];
};

export type CreateCharacterInput = {
  name: Scalars['String'];
  projectId: Scalars['String'];
};

export type CreateClassInput = {
  name: Scalars['String'];
  subclasses: Array<Scalars['String']>;
};

export type CreateClassLevelInput = {
  characterId: Scalars['String'];
  classId: Scalars['String'];
  name: Scalars['String'];
};

export type CreateProject = {
  name: Scalars['String'];
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateRollInput = {
  sides: Scalars['Int'];
};

export type CreateUser = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCharacter: Character;
  createClass?: Maybe<Class>;
  createClassLevel?: Maybe<ClassLevel>;
  createProject: Project;
  createRoll: Project;
  createUser: User;
  deleteCharacter: Scalars['Boolean'];
  deleteClass?: Maybe<Scalars['Boolean']>;
  deleteClassLevel?: Maybe<Scalars['Boolean']>;
  deleteProject: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  loginJwt: Scalars['String'];
  loginMagic: Scalars['Boolean'];
  resendMagic: Scalars['Boolean'];
  validateMagic: Scalars['String'];
};

export type MutationCreateCharacterArgs = {
  input?: InputMaybe<CreateCharacterInput>;
};

export type MutationCreateClassArgs = {
  input: CreateClassInput;
};

export type MutationCreateClassLevelArgs = {
  input: CreateClassLevelInput;
};

export type MutationCreateProjectArgs = {
  project: CreateProject;
};

export type MutationCreateUserArgs = {
  user: CreateUser;
};

export type MutationDeleteCharacterArgs = {
  id: Scalars['String'];
};

export type MutationDeleteClassArgs = {
  id: Scalars['String'];
};

export type MutationDeleteClassLevelArgs = {
  id: Scalars['String'];
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
  getCharacter?: Maybe<Character>;
  getCharacters: Array<Maybe<Character>>;
  getClass?: Maybe<Class>;
  getClassLevel?: Maybe<ClassLevel>;
  getProject?: Maybe<Project>;
  getRoll?: Maybe<Roll>;
  getRollsByCharacter: Array<Maybe<Roll>>;
  getRollsByUser: Array<Maybe<Roll>>;
  getUser?: Maybe<User>;
  getUsers: Array<Maybe<User>>;
};

export type QueryGetCharacterArgs = {
  id: Scalars['String'];
};

export type QueryGetClassArgs = {
  id: Scalars['String'];
};

export type QueryGetClassLevelArgs = {
  id: Scalars['String'];
};

export type QueryGetProjectArgs = {
  id: Scalars['String'];
};

export type QueryGetRollArgs = {
  id: Scalars['String'];
};

export type QueryGetRollsByCharacterArgs = {
  characterId: Scalars['String'];
};

export type QueryGetUserArgs = {
  id: Scalars['String'];
};

export type Roll = {
  __typename?: 'Roll';
  advantage: Scalars['Boolean'];
  character: Character;
  disadvantag: Scalars['Boolean'];
  id: Scalars['String'];
  inspiration: Scalars['Boolean'];
  modifier: Scalars['Int'];
  result: Scalars['Int'];
  sides: Scalars['Int'];
  user: User;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  ownedProjects: Array<Project>;
  password: Scalars['String'];
  projects: Array<Project>;
};
