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

export enum Archetype {
  Artificer = 'ARTIFICER',
  Barbarian = 'BARBARIAN',
  Bard = 'BARD',
  BloodHunter = 'BLOOD_HUNTER',
  Cleric = 'CLERIC',
  Druid = 'DRUID',
  Fighter = 'FIGHTER',
  Monk = 'MONK',
  Paladin = 'PALADIN',
  Ranger = 'RANGER',
  Rogue = 'ROGUE',
  Sorcerer = 'SORCERER',
  Warlock = 'WARLOCK',
  Wizard = 'WIZARD',
}

export type ArchetypeLevel = {
  __typename?: 'ArchetypeLevel';
  archetype: Archetype;
  character: Character;
  id: Scalars['String'];
};

export type Character = {
  __typename?: 'Character';
  archetypeLevels: Array<Maybe<ArchetypeLevel>>;
  id: Scalars['String'];
  name: Scalars['String'];
  project: Project;
  rolls: Array<Maybe<Roll>>;
  user: User;
};

export type CreateArchetypeLevelInput = {
  archetype: Archetype;
  characterId: Scalars['String'];
  level: Scalars['Int'];
};

export type CreateCharacterInput = {
  name: Scalars['String'];
  projectId: Scalars['String'];
};

export type CreateProject = {
  name: Scalars['String'];
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateRollInput = {
  characterId: Scalars['String'];
  hasAdvantage?: InputMaybe<Scalars['Boolean']>;
  hasDisadvantage?: InputMaybe<Scalars['Boolean']>;
  hasInpiration?: InputMaybe<Scalars['Boolean']>;
  hasLucky?: InputMaybe<Scalars['Boolean']>;
  isNormalRoll: Scalars['Boolean'];
  modifier: Scalars['Int'];
  parentId?: InputMaybe<Scalars['String']>;
  result: Scalars['Int'];
  sides: Scalars['Int'];
  type: RollType;
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateUser = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArchetypeLevel?: Maybe<ArchetypeLevel>;
  createCharacter: Character;
  createProject: Project;
  createRoll: Roll;
  createUser: User;
  deleteArchetypeLevel?: Maybe<Scalars['Boolean']>;
  deleteCharacter: Scalars['Boolean'];
  deleteProject: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  loginJwt: Scalars['String'];
  loginMagic: Scalars['Boolean'];
  resendMagic: Scalars['Boolean'];
  validateMagic: Scalars['String'];
};

export type MutationCreateArchetypeLevelArgs = {
  input: CreateArchetypeLevelInput;
};

export type MutationCreateCharacterArgs = {
  input?: InputMaybe<CreateCharacterInput>;
};

export type MutationCreateProjectArgs = {
  input: CreateProject;
};

export type MutationCreateRollArgs = {
  input?: InputMaybe<CreateRollInput>;
};

export type MutationCreateUserArgs = {
  user: CreateUser;
};

export type MutationDeleteArchetypeLevelArgs = {
  id: Scalars['String'];
};

export type MutationDeleteCharacterArgs = {
  id: Scalars['String'];
};

export type MutationDeleteProjectArgs = {
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
  characters?: Maybe<Array<Character>>;
  id: Scalars['String'];
  name: Scalars['String'];
  owner: User;
  users?: Maybe<Array<User>>;
};

export type Query = {
  __typename?: 'Query';
  getArchetypeLevel?: Maybe<ArchetypeLevel>;
  getCharacter?: Maybe<Character>;
  getCharacters: Array<Maybe<Character>>;
  getMe?: Maybe<User>;
  getMyRolls: Array<Maybe<Roll>>;
  getProject?: Maybe<Project>;
  getRoll?: Maybe<Roll>;
  getRollsByCharacter: Array<Maybe<Roll>>;
  getRollsByUser: Array<Maybe<Roll>>;
  getUser?: Maybe<User>;
  getUsers: Array<Maybe<User>>;
};

export type QueryGetArchetypeLevelArgs = {
  id: Scalars['String'];
};

export type QueryGetCharacterArgs = {
  id: Scalars['String'];
};

export type QueryGetProjectArgs = {
  id: Scalars['String'];
};

export type QueryGetRollArgs = {
  id: Scalars['String'];
};

export type QueryGetRollsByCharacterArgs = {
  id: Scalars['String'];
};

export type QueryGetRollsByUserArgs = {
  id: Scalars['String'];
};

export type QueryGetUserArgs = {
  id: Scalars['String'];
};

export type Roll = {
  __typename?: 'Roll';
  character: Character;
  hasAdvantage: Scalars['Boolean'];
  hasDisadvantage: Scalars['Boolean'];
  hasInpiration: Scalars['Boolean'];
  hasLucky: Scalars['Boolean'];
  id: Scalars['String'];
  modifier: Scalars['Int'];
  parent: RollParent;
  result: Scalars['Int'];
  siblings: Array<Maybe<Roll>>;
  sides: Scalars['Int'];
  user: User;
};

export type RollParent = {
  __typename?: 'RollParent';
  character: Character;
  id: Scalars['ID'];
  result: Scalars['Int'];
  rolls: Array<Maybe<Roll>>;
  sides: Scalars['Int'];
  type: RollType;
  user: User;
};

export enum RollType {
  Attack = 'ATTACK',
  SavingThrow = 'SAVING_THROW',
  SkillCheck = 'SKILL_CHECK',
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  ownedProjects: Array<Project>;
  projects: Array<Project>;
};
