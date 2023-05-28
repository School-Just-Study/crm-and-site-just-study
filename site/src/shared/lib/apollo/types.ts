/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  CalendarDay: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Object: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AuthCartData = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['Decimal']['input'];
  secondName: Scalars['String']['input'];
};

export type AuthenticatedItem = User;

export type AvatarUser = {
  __typename?: 'AvatarUser';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<ImageFieldOutput>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type AvatarUserCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type AvatarUserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
};

export type AvatarUserRelateToOneForCreateInput = {
  connect?: InputMaybe<AvatarUserWhereUniqueInput>;
  create?: InputMaybe<AvatarUserCreateInput>;
};

export type AvatarUserRelateToOneForUpdateInput = {
  connect?: InputMaybe<AvatarUserWhereUniqueInput>;
  create?: InputMaybe<AvatarUserCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AvatarUserUpdateArgs = {
  data: AvatarUserUpdateInput;
  where: AvatarUserWhereUniqueInput;
};

export type AvatarUserUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type AvatarUserWhereInput = {
  AND?: InputMaybe<Array<AvatarUserWhereInput>>;
  NOT?: InputMaybe<Array<AvatarUserWhereInput>>;
  OR?: InputMaybe<Array<AvatarUserWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type AvatarUserWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilter>;
};

export type CalendarDayFilter = {
  equals?: InputMaybe<Scalars['CalendarDay']['input']>;
  gt?: InputMaybe<Scalars['CalendarDay']['input']>;
  gte?: InputMaybe<Scalars['CalendarDay']['input']>;
  in?: InputMaybe<Array<Scalars['CalendarDay']['input']>>;
  lt?: InputMaybe<Scalars['CalendarDay']['input']>;
  lte?: InputMaybe<Scalars['CalendarDay']['input']>;
  not?: InputMaybe<CalendarDayFilter>;
  notIn?: InputMaybe<Array<Scalars['CalendarDay']['input']>>;
};

export type CalendarDayNullableFilter = {
  equals?: InputMaybe<Scalars['CalendarDay']['input']>;
  gt?: InputMaybe<Scalars['CalendarDay']['input']>;
  gte?: InputMaybe<Scalars['CalendarDay']['input']>;
  in?: InputMaybe<Array<Scalars['CalendarDay']['input']>>;
  lt?: InputMaybe<Scalars['CalendarDay']['input']>;
  lte?: InputMaybe<Scalars['CalendarDay']['input']>;
  not?: InputMaybe<CalendarDayNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['CalendarDay']['input']>>;
};

export type Cart = {
  __typename?: 'Cart';
  amount?: Maybe<Scalars['Int']['output']>;
  amountUSD?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<CartItem>>;
  itemsCount?: Maybe<Scalars['Int']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  linkForUser?: Maybe<Scalars['String']['output']>;
  nextPayment?: Maybe<Scalars['Int']['output']>;
  nextPaymentUSD?: Maybe<Scalars['Int']['output']>;
  quantityPayments?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
};


export type CartItemsArgs = {
  cursor?: InputMaybe<CartItemWhereUniqueInput>;
  orderBy?: Array<CartItemOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CartItemWhereInput;
};


export type CartItemsCountArgs = {
  where?: CartItemWhereInput;
};

export type CartData = {
  currency: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['Decimal']['input']>;
  secondName?: InputMaybe<Scalars['String']['input']>;
};

export type CartItem = {
  __typename?: 'CartItem';
  cart?: Maybe<Cart>;
  id: Scalars['ID']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  originalPriceUSD?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  priceUSD?: Maybe<Scalars['Int']['output']>;
  service?: Maybe<Service>;
  subscription?: Maybe<Subscription>;
};

export type CartItemCreateInput = {
  cart?: InputMaybe<CartRelateToOneForCreateInput>;
  price?: InputMaybe<Scalars['Int']['input']>;
  service?: InputMaybe<ServiceRelateToOneForCreateInput>;
  subscription?: InputMaybe<SubscriptionRelateToOneForCreateInput>;
};

export type CartItemManyRelationFilter = {
  every?: InputMaybe<CartItemWhereInput>;
  none?: InputMaybe<CartItemWhereInput>;
  some?: InputMaybe<CartItemWhereInput>;
};

export type CartItemOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
};

export type CartItemRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CartItemWhereUniqueInput>>;
  create?: InputMaybe<Array<CartItemCreateInput>>;
  disconnect?: InputMaybe<Array<CartItemWhereUniqueInput>>;
  set?: InputMaybe<Array<CartItemWhereUniqueInput>>;
};

export type CartItemUpdateArgs = {
  data: CartItemUpdateInput;
  where: CartItemWhereUniqueInput;
};

export type CartItemUpdateInput = {
  cart?: InputMaybe<CartRelateToOneForUpdateInput>;
  price?: InputMaybe<Scalars['Int']['input']>;
  service?: InputMaybe<ServiceRelateToOneForUpdateInput>;
  subscription?: InputMaybe<SubscriptionRelateToOneForUpdateInput>;
};

export type CartItemWhereInput = {
  AND?: InputMaybe<Array<CartItemWhereInput>>;
  NOT?: InputMaybe<Array<CartItemWhereInput>>;
  OR?: InputMaybe<Array<CartItemWhereInput>>;
  cart?: InputMaybe<CartWhereInput>;
  id?: InputMaybe<IdFilter>;
  price?: InputMaybe<IntNullableFilter>;
  service?: InputMaybe<ServiceWhereInput>;
  subscription?: InputMaybe<SubscriptionWhereInput>;
};

export type CartItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CartOrderByInput = {
  currency?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  quantityPayments?: InputMaybe<OrderDirection>;
};

export type CartRelateToOneForCreateInput = {
  connect?: InputMaybe<CartWhereUniqueInput>;
};

export type CartRelateToOneForUpdateInput = {
  connect?: InputMaybe<CartWhereUniqueInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CartUpdateArgs = {
  data: CartUpdateInput;
  where: CartWhereUniqueInput;
};

export type CartUpdateInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<CartItemRelateToManyForUpdateInput>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  quantityPayments?: InputMaybe<Scalars['Int']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type CartWhereInput = {
  AND?: InputMaybe<Array<CartWhereInput>>;
  NOT?: InputMaybe<Array<CartWhereInput>>;
  OR?: InputMaybe<Array<CartWhereInput>>;
  currency?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  items?: InputMaybe<CartItemManyRelationFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  quantityPayments?: InputMaybe<IntNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type CartWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Category = {
  __typename?: 'Category';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Product>>;
  productsCount?: Maybe<Scalars['Int']['output']>;
};


export type CategoryProductsArgs = {
  cursor?: InputMaybe<ProductWhereUniqueInput>;
  orderBy?: Array<ProductOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductWhereInput;
};


export type CategoryProductsCountArgs = {
  where?: ProductWhereInput;
};

export type CategoryCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<ProductRelateToManyForCreateInput>;
};

export type CategoryManyRelationFilter = {
  every?: InputMaybe<CategoryWhereInput>;
  none?: InputMaybe<CategoryWhereInput>;
  some?: InputMaybe<CategoryWhereInput>;
};

export type CategoryOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type CategoryRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  create?: InputMaybe<Array<CategoryCreateInput>>;
};

export type CategoryRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  create?: InputMaybe<Array<CategoryCreateInput>>;
  disconnect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  set?: InputMaybe<Array<CategoryWhereUniqueInput>>;
};

export type CategoryRelateToOneForCreateInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  create?: InputMaybe<CategoryCreateInput>;
};

export type CategoryRelateToOneForUpdateInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  create?: InputMaybe<CategoryCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CategoryUpdateArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<ProductRelateToManyForUpdateInput>;
};

export type CategoryWhereInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  language?: InputMaybe<StringFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  products?: InputMaybe<ProductManyRelationFilter>;
};

export type CategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Client = {
  __typename?: 'Client';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  goal?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  levelStudent?: Maybe<ClientLevelStudentType>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['Decimal']['output']>;
  profession?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Array<SourceClient>>;
  sourceCount?: Maybe<Scalars['Int']['output']>;
  statusClient?: Maybe<ClientStatusClientType>;
  teachers?: Maybe<Array<Manager>>;
  teachersCount?: Maybe<Scalars['Int']['output']>;
  ymClientId?: Maybe<Scalars['String']['output']>;
};


export type ClientSourceArgs = {
  cursor?: InputMaybe<SourceClientWhereUniqueInput>;
  orderBy?: Array<SourceClientOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: SourceClientWhereInput;
};


export type ClientSourceCountArgs = {
  where?: SourceClientWhereInput;
};


export type ClientTeachersArgs = {
  cursor?: InputMaybe<ManagerWhereUniqueInput>;
  orderBy?: Array<ManagerOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ManagerWhereInput;
};


export type ClientTeachersCountArgs = {
  where?: ManagerWhereInput;
};

export type ClientCreateInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  goal?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  levelStudent?: InputMaybe<ClientLevelStudentType>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['Decimal']['input']>;
  profession?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<SourceClientRelateToManyForCreateInput>;
  statusClient?: InputMaybe<ClientStatusClientType>;
  teachers?: InputMaybe<ManagerRelateToManyForCreateInput>;
  ymClientId?: InputMaybe<Scalars['String']['input']>;
};

export enum ClientLevelStudentType {
  A1 = 'a1',
  A2 = 'a2',
  B1 = 'b1',
  B2 = 'b2',
  C1 = 'c1'
}

export type ClientLevelStudentTypeNullableFilter = {
  equals?: InputMaybe<ClientLevelStudentType>;
  in?: InputMaybe<Array<ClientLevelStudentType>>;
  not?: InputMaybe<ClientLevelStudentTypeNullableFilter>;
  notIn?: InputMaybe<Array<ClientLevelStudentType>>;
};

export type ClientOrderByInput = {
  comment?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  goal?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  levelStudent?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  phone?: InputMaybe<OrderDirection>;
  profession?: InputMaybe<OrderDirection>;
  statusClient?: InputMaybe<OrderDirection>;
  ymClientId?: InputMaybe<OrderDirection>;
};

export type ClientRelateToOneForCreateInput = {
  connect?: InputMaybe<ClientWhereUniqueInput>;
  create?: InputMaybe<ClientCreateInput>;
};

export type ClientRelateToOneForUpdateInput = {
  connect?: InputMaybe<ClientWhereUniqueInput>;
  create?: InputMaybe<ClientCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ClientStatusClientType {
  LowQualityLead = 'LowQualityLead',
  Client = 'client',
  DecisionAfterTrialLesson = 'decisionAfterTrialLesson',
  DisabledClient = 'disabledClient',
  FinishedClient = 'finishedClient',
  FirstCall = 'firstCall',
  New = 'new',
  PayedFirstLesson = 'payedFirstLesson',
  RecordFirstLesson = 'recordFirstLesson',
  Rejection = 'rejection',
  SpeakingClub = 'speakingClub',
  TrialLesson = 'trialLesson'
}

export type ClientStatusClientTypeNullableFilter = {
  equals?: InputMaybe<ClientStatusClientType>;
  in?: InputMaybe<Array<ClientStatusClientType>>;
  not?: InputMaybe<ClientStatusClientTypeNullableFilter>;
  notIn?: InputMaybe<Array<ClientStatusClientType>>;
};

export type ClientUpdateArgs = {
  data: ClientUpdateInput;
  where: ClientWhereUniqueInput;
};

export type ClientUpdateInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  goal?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  levelStudent?: InputMaybe<ClientLevelStudentType>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['Decimal']['input']>;
  profession?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<SourceClientRelateToManyForUpdateInput>;
  statusClient?: InputMaybe<ClientStatusClientType>;
  teachers?: InputMaybe<ManagerRelateToManyForUpdateInput>;
  ymClientId?: InputMaybe<Scalars['String']['input']>;
};

export type ClientWhereInput = {
  AND?: InputMaybe<Array<ClientWhereInput>>;
  NOT?: InputMaybe<Array<ClientWhereInput>>;
  OR?: InputMaybe<Array<ClientWhereInput>>;
  comment?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  goal?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  language?: InputMaybe<StringFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  levelStudent?: InputMaybe<ClientLevelStudentTypeNullableFilter>;
  name?: InputMaybe<StringFilter>;
  phone?: InputMaybe<DecimalNullableFilter>;
  profession?: InputMaybe<StringFilter>;
  source?: InputMaybe<SourceClientManyRelationFilter>;
  statusClient?: InputMaybe<ClientStatusClientTypeNullableFilter>;
  teachers?: InputMaybe<ManagerManyRelationFilter>;
  ymClientId?: InputMaybe<StringFilter>;
};

export type ClientWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRoleType>;
};

export type Currency = {
  __typename?: 'Currency';
  charCode?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  nominal?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

export type CurrencyCreateInput = {
  charCode?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  nominal?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrencyOrderByInput = {
  charCode?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  nominal?: InputMaybe<OrderDirection>;
  value?: InputMaybe<OrderDirection>;
};

export type CurrencyUpdateArgs = {
  data: CurrencyUpdateInput;
  where: CurrencyWhereUniqueInput;
};

export type CurrencyUpdateInput = {
  charCode?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  nominal?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrencyWhereInput = {
  AND?: InputMaybe<Array<CurrencyWhereInput>>;
  NOT?: InputMaybe<Array<CurrencyWhereInput>>;
  OR?: InputMaybe<Array<CurrencyWhereInput>>;
  charCode?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  nominal?: InputMaybe<IntFilter>;
  value?: InputMaybe<IntFilter>;
};

export type CurrencyWhereUniqueInput = {
  charCode?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DecimalNullableFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<DecimalNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type Direction = {
  __typename?: 'Direction';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  goals?: Maybe<Array<DirectionGoal>>;
  goalsCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<ImageFieldOutput>;
  language?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Product>>;
  productsCount?: Maybe<Scalars['Int']['output']>;
  results?: Maybe<Array<DirectionResult>>;
  resultsCount?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  statusView?: Maybe<Scalars['String']['output']>;
};


export type DirectionGoalsArgs = {
  cursor?: InputMaybe<DirectionGoalWhereUniqueInput>;
  orderBy?: Array<DirectionGoalOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: DirectionGoalWhereInput;
};


export type DirectionGoalsCountArgs = {
  where?: DirectionGoalWhereInput;
};


export type DirectionProductsArgs = {
  cursor?: InputMaybe<ProductWhereUniqueInput>;
  orderBy?: Array<ProductOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductWhereInput;
};


export type DirectionProductsCountArgs = {
  where?: ProductWhereInput;
};


export type DirectionResultsArgs = {
  cursor?: InputMaybe<DirectionResultWhereUniqueInput>;
  orderBy?: Array<DirectionResultOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: DirectionResultWhereInput;
};


export type DirectionResultsCountArgs = {
  where?: DirectionResultWhereInput;
};

export type DirectionCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  goals?: InputMaybe<DirectionGoalRelateToManyForCreateInput>;
  image?: InputMaybe<ImageFieldInput>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<ProductRelateToManyForCreateInput>;
  results?: InputMaybe<DirectionResultRelateToManyForCreateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
};

export type DirectionGoal = {
  __typename?: 'DirectionGoal';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<ImageFieldOutput>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  statusView?: Maybe<Scalars['String']['output']>;
};

export type DirectionGoalCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
};

export type DirectionGoalManyRelationFilter = {
  every?: InputMaybe<DirectionGoalWhereInput>;
  none?: InputMaybe<DirectionGoalWhereInput>;
  some?: InputMaybe<DirectionGoalWhereInput>;
};

export type DirectionGoalOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  statusView?: InputMaybe<OrderDirection>;
};

export type DirectionGoalRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<DirectionGoalWhereUniqueInput>>;
  create?: InputMaybe<Array<DirectionGoalCreateInput>>;
};

export type DirectionGoalRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<DirectionGoalWhereUniqueInput>>;
  create?: InputMaybe<Array<DirectionGoalCreateInput>>;
  disconnect?: InputMaybe<Array<DirectionGoalWhereUniqueInput>>;
  set?: InputMaybe<Array<DirectionGoalWhereUniqueInput>>;
};

export type DirectionGoalUpdateArgs = {
  data: DirectionGoalUpdateInput;
  where: DirectionGoalWhereUniqueInput;
};

export type DirectionGoalUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
};

export type DirectionGoalWhereInput = {
  AND?: InputMaybe<Array<DirectionGoalWhereInput>>;
  NOT?: InputMaybe<Array<DirectionGoalWhereInput>>;
  OR?: InputMaybe<Array<DirectionGoalWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  statusView?: InputMaybe<StringFilter>;
};

export type DirectionGoalWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type DirectionOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  statusView?: InputMaybe<OrderDirection>;
};

export type DirectionResult = {
  __typename?: 'DirectionResult';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  statusView?: Maybe<Scalars['String']['output']>;
};

export type DirectionResultCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
};

export type DirectionResultManyRelationFilter = {
  every?: InputMaybe<DirectionResultWhereInput>;
  none?: InputMaybe<DirectionResultWhereInput>;
  some?: InputMaybe<DirectionResultWhereInput>;
};

export type DirectionResultOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  statusView?: InputMaybe<OrderDirection>;
};

export type DirectionResultRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<DirectionResultWhereUniqueInput>>;
  create?: InputMaybe<Array<DirectionResultCreateInput>>;
};

export type DirectionResultRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<DirectionResultWhereUniqueInput>>;
  create?: InputMaybe<Array<DirectionResultCreateInput>>;
  disconnect?: InputMaybe<Array<DirectionResultWhereUniqueInput>>;
  set?: InputMaybe<Array<DirectionResultWhereUniqueInput>>;
};

export type DirectionResultUpdateArgs = {
  data: DirectionResultUpdateInput;
  where: DirectionResultWhereUniqueInput;
};

export type DirectionResultUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
};

export type DirectionResultWhereInput = {
  AND?: InputMaybe<Array<DirectionResultWhereInput>>;
  NOT?: InputMaybe<Array<DirectionResultWhereInput>>;
  OR?: InputMaybe<Array<DirectionResultWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  statusView?: InputMaybe<StringFilter>;
};

export type DirectionResultWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type DirectionUpdateArgs = {
  data: DirectionUpdateInput;
  where: DirectionWhereUniqueInput;
};

export type DirectionUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  goals?: InputMaybe<DirectionGoalRelateToManyForUpdateInput>;
  image?: InputMaybe<ImageFieldInput>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<ProductRelateToManyForUpdateInput>;
  results?: InputMaybe<DirectionResultRelateToManyForUpdateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
};

export type DirectionWhereInput = {
  AND?: InputMaybe<Array<DirectionWhereInput>>;
  NOT?: InputMaybe<Array<DirectionWhereInput>>;
  OR?: InputMaybe<Array<DirectionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  goals?: InputMaybe<DirectionGoalManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  language?: InputMaybe<StringFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  products?: InputMaybe<ProductManyRelationFilter>;
  results?: InputMaybe<DirectionResultManyRelationFilter>;
  slug?: InputMaybe<StringFilter>;
  statusView?: InputMaybe<StringFilter>;
};

export type DirectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Faq = {
  __typename?: 'Faq';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  desc?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  products?: Maybe<Array<Product>>;
  productsCount?: Maybe<Scalars['Int']['output']>;
  statusView?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type FaqProductsArgs = {
  cursor?: InputMaybe<ProductWhereUniqueInput>;
  orderBy?: Array<ProductOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductWhereInput;
};


export type FaqProductsCountArgs = {
  where?: ProductWhereInput;
};

export type FaqCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  desc?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  products?: InputMaybe<ProductRelateToManyForCreateInput>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FaqOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  desc?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  statusView?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type FaqUpdateArgs = {
  data: FaqUpdateInput;
  where: FaqWhereUniqueInput;
};

export type FaqUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  desc?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  products?: InputMaybe<ProductRelateToManyForUpdateInput>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FaqWhereInput = {
  AND?: InputMaybe<Array<FaqWhereInput>>;
  NOT?: InputMaybe<Array<FaqWhereInput>>;
  OR?: InputMaybe<Array<FaqWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  desc?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  language?: InputMaybe<StringFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  products?: InputMaybe<ProductManyRelationFilter>;
  statusView?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FaqWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type GetTeacherScheduleData = {
  end: Scalars['String']['input'];
  start: Scalars['String']['input'];
  teacherId: Scalars['ID']['input'];
};

export type GetTeacherScheduleResponse = {
  __typename?: 'GetTeacherScheduleResponse';
  cutoff?: Maybe<Array<Scalars['Object']['output']>>;
  lessons?: Maybe<Array<Scalars['Object']['output']>>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Image = {
  __typename?: 'Image';
  filename?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<ImageFieldOutput>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ImageCreateInput = {
  filename?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export enum ImageExtension {
  Gif = 'gif',
  Jpg = 'jpg',
  Png = 'png',
  Webp = 'webp'
}

export type ImageFieldInput = {
  upload: Scalars['Upload']['input'];
};

export type ImageFieldOutput = {
  __typename?: 'ImageFieldOutput';
  extension: ImageExtension;
  filesize: Scalars['Int']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type ImageOrderByInput = {
  filename?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
};

export type ImageRelateToOneForCreateInput = {
  connect?: InputMaybe<ImageWhereUniqueInput>;
  create?: InputMaybe<ImageCreateInput>;
};

export type ImageRelateToOneForUpdateInput = {
  connect?: InputMaybe<ImageWhereUniqueInput>;
  create?: InputMaybe<ImageCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ImageUpdateArgs = {
  data: ImageUpdateInput;
  where: ImageWhereUniqueInput;
};

export type ImageUpdateInput = {
  filename?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ImageWhereInput = {
  AND?: InputMaybe<Array<ImageWhereInput>>;
  NOT?: InputMaybe<Array<ImageWhereInput>>;
  OR?: InputMaybe<Array<ImageWhereInput>>;
  filename?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
};

export type ImageWhereUniqueInput = {
  filename?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String']['input'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String']['output'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fieldMeta?: Maybe<Scalars['JSON']['output']>;
  isFilterable: Scalars['Boolean']['output'];
  isNonNull?: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>;
  isOrderable: Scalars['Boolean']['output'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String']['output'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String']['output'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int']['output'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export enum KeystoneAdminUiFieldMetaIsNonNull {
  Create = 'create',
  Read = 'read',
  Update = 'update'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean']['output'];
  hideDelete: Scalars['Boolean']['output'];
  initialColumns: Array<Scalars['String']['output']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean']['output'];
  isSingleton: Scalars['Boolean']['output'];
  itemQueryName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  labelField: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  pageSize: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  plural: Scalars['String']['output'];
  singular: Scalars['String']['output'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String']['output'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Lesson = {
  __typename?: 'Lesson';
  burned?: Maybe<Scalars['Boolean']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  notAlert?: Maybe<Scalars['Boolean']['output']>;
  notified?: Maybe<Scalars['Boolean']['output']>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  statusLesson?: Maybe<Scalars['String']['output']>;
  students?: Maybe<Array<User>>;
  studentsCount?: Maybe<Scalars['Int']['output']>;
  subscriptions?: Maybe<Array<UserSubscription>>;
  subscriptionsCount?: Maybe<Scalars['Int']['output']>;
  teachers?: Maybe<Array<Manager>>;
  teachersCount?: Maybe<Scalars['Int']['output']>;
  timeZone?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  trial?: Maybe<Scalars['Boolean']['output']>;
};


export type LessonStudentsArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type LessonStudentsCountArgs = {
  where?: UserWhereInput;
};


export type LessonSubscriptionsArgs = {
  cursor?: InputMaybe<UserSubscriptionWhereUniqueInput>;
  orderBy?: Array<UserSubscriptionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserSubscriptionWhereInput;
};


export type LessonSubscriptionsCountArgs = {
  where?: UserSubscriptionWhereInput;
};


export type LessonTeachersArgs = {
  cursor?: InputMaybe<ManagerWhereUniqueInput>;
  orderBy?: Array<ManagerOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ManagerWhereInput;
};


export type LessonTeachersCountArgs = {
  where?: ManagerWhereInput;
};

export type LessonCreateInput = {
  burned?: InputMaybe<Scalars['Boolean']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  notAlert?: InputMaybe<Scalars['Boolean']['input']>;
  notified?: InputMaybe<Scalars['Boolean']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  statusLesson?: InputMaybe<Scalars['String']['input']>;
  students?: InputMaybe<UserRelateToManyForCreateInput>;
  subscriptions?: InputMaybe<UserSubscriptionRelateToManyForCreateInput>;
  teachers?: InputMaybe<ManagerRelateToManyForCreateInput>;
  timeZone?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  trial?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LessonManyRelationFilter = {
  every?: InputMaybe<LessonWhereInput>;
  none?: InputMaybe<LessonWhereInput>;
  some?: InputMaybe<LessonWhereInput>;
};

export type LessonOrderByInput = {
  burned?: InputMaybe<OrderDirection>;
  comment?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  endTime?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  notAlert?: InputMaybe<OrderDirection>;
  notified?: InputMaybe<OrderDirection>;
  startTime?: InputMaybe<OrderDirection>;
  statusLesson?: InputMaybe<OrderDirection>;
  timeZone?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
  trial?: InputMaybe<OrderDirection>;
};

export type LessonRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<LessonWhereUniqueInput>>;
  create?: InputMaybe<Array<LessonCreateInput>>;
};

export type LessonRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<LessonWhereUniqueInput>>;
  create?: InputMaybe<Array<LessonCreateInput>>;
  disconnect?: InputMaybe<Array<LessonWhereUniqueInput>>;
  set?: InputMaybe<Array<LessonWhereUniqueInput>>;
};

export type LessonSchedule = {
  __typename?: 'LessonSchedule';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  endPeriod?: Maybe<Scalars['CalendarDay']['output']>;
  id: Scalars['ID']['output'];
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  schedule?: Maybe<Array<LessonScheduleItem>>;
  scheduleCount?: Maybe<Scalars['Int']['output']>;
  startPeriod?: Maybe<Scalars['CalendarDay']['output']>;
  statusView?: Maybe<Scalars['String']['output']>;
  students?: Maybe<Array<User>>;
  studentsCount?: Maybe<Scalars['Int']['output']>;
  teachers?: Maybe<Array<Manager>>;
  teachersCount?: Maybe<Scalars['Int']['output']>;
  timeZone?: Maybe<Scalars['String']['output']>;
};


export type LessonScheduleScheduleArgs = {
  cursor?: InputMaybe<LessonScheduleItemWhereUniqueInput>;
  orderBy?: Array<LessonScheduleItemOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LessonScheduleItemWhereInput;
};


export type LessonScheduleScheduleCountArgs = {
  where?: LessonScheduleItemWhereInput;
};


export type LessonScheduleStudentsArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type LessonScheduleStudentsCountArgs = {
  where?: UserWhereInput;
};


export type LessonScheduleTeachersArgs = {
  cursor?: InputMaybe<ManagerWhereUniqueInput>;
  orderBy?: Array<ManagerOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ManagerWhereInput;
};


export type LessonScheduleTeachersCountArgs = {
  where?: ManagerWhereInput;
};

export type LessonScheduleCreateInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  endPeriod?: InputMaybe<Scalars['CalendarDay']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  schedule?: InputMaybe<LessonScheduleItemRelateToManyForCreateInput>;
  startPeriod?: InputMaybe<Scalars['CalendarDay']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  students?: InputMaybe<UserRelateToManyForCreateInput>;
  teachers?: InputMaybe<ManagerRelateToManyForCreateInput>;
  timeZone?: InputMaybe<Scalars['String']['input']>;
};

export type LessonScheduleItem = {
  __typename?: 'LessonScheduleItem';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dayOfWeek?: Maybe<Scalars['Int']['output']>;
  endTime?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  startTime?: Maybe<Scalars['String']['output']>;
};

export type LessonScheduleItemCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
};

export type LessonScheduleItemManyRelationFilter = {
  every?: InputMaybe<LessonScheduleItemWhereInput>;
  none?: InputMaybe<LessonScheduleItemWhereInput>;
  some?: InputMaybe<LessonScheduleItemWhereInput>;
};

export type LessonScheduleItemOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  dayOfWeek?: InputMaybe<OrderDirection>;
  endTime?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  startTime?: InputMaybe<OrderDirection>;
};

export type LessonScheduleItemRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<LessonScheduleItemWhereUniqueInput>>;
  create?: InputMaybe<Array<LessonScheduleItemCreateInput>>;
};

export type LessonScheduleItemRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<LessonScheduleItemWhereUniqueInput>>;
  create?: InputMaybe<Array<LessonScheduleItemCreateInput>>;
  disconnect?: InputMaybe<Array<LessonScheduleItemWhereUniqueInput>>;
  set?: InputMaybe<Array<LessonScheduleItemWhereUniqueInput>>;
};

export type LessonScheduleItemUpdateArgs = {
  data: LessonScheduleItemUpdateInput;
  where: LessonScheduleItemWhereUniqueInput;
};

export type LessonScheduleItemUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
};

export type LessonScheduleItemWhereInput = {
  AND?: InputMaybe<Array<LessonScheduleItemWhereInput>>;
  NOT?: InputMaybe<Array<LessonScheduleItemWhereInput>>;
  OR?: InputMaybe<Array<LessonScheduleItemWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  dayOfWeek?: InputMaybe<IntFilter>;
  endTime?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  startTime?: InputMaybe<StringFilter>;
};

export type LessonScheduleItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type LessonScheduleOrderByInput = {
  comment?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  endPeriod?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  startPeriod?: InputMaybe<OrderDirection>;
  statusView?: InputMaybe<OrderDirection>;
  timeZone?: InputMaybe<OrderDirection>;
};

export type LessonScheduleUpdateArgs = {
  data: LessonScheduleUpdateInput;
  where: LessonScheduleWhereUniqueInput;
};

export type LessonScheduleUpdateInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  endPeriod?: InputMaybe<Scalars['CalendarDay']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  schedule?: InputMaybe<LessonScheduleItemRelateToManyForUpdateInput>;
  startPeriod?: InputMaybe<Scalars['CalendarDay']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  students?: InputMaybe<UserRelateToManyForUpdateInput>;
  teachers?: InputMaybe<ManagerRelateToManyForUpdateInput>;
  timeZone?: InputMaybe<Scalars['String']['input']>;
};

export type LessonScheduleWhereInput = {
  AND?: InputMaybe<Array<LessonScheduleWhereInput>>;
  NOT?: InputMaybe<Array<LessonScheduleWhereInput>>;
  OR?: InputMaybe<Array<LessonScheduleWhereInput>>;
  comment?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  endPeriod?: InputMaybe<CalendarDayNullableFilter>;
  id?: InputMaybe<IdFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  schedule?: InputMaybe<LessonScheduleItemManyRelationFilter>;
  startPeriod?: InputMaybe<CalendarDayFilter>;
  statusView?: InputMaybe<StringFilter>;
  students?: InputMaybe<UserManyRelationFilter>;
  teachers?: InputMaybe<ManagerManyRelationFilter>;
  timeZone?: InputMaybe<StringFilter>;
};

export type LessonScheduleWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type LessonUpdateArgs = {
  data: LessonUpdateInput;
  where: LessonWhereUniqueInput;
};

export type LessonUpdateInput = {
  burned?: InputMaybe<Scalars['Boolean']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  notAlert?: InputMaybe<Scalars['Boolean']['input']>;
  notified?: InputMaybe<Scalars['Boolean']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  statusLesson?: InputMaybe<Scalars['String']['input']>;
  students?: InputMaybe<UserRelateToManyForUpdateInput>;
  subscriptions?: InputMaybe<UserSubscriptionRelateToManyForUpdateInput>;
  teachers?: InputMaybe<ManagerRelateToManyForUpdateInput>;
  timeZone?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  trial?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LessonWhereInput = {
  AND?: InputMaybe<Array<LessonWhereInput>>;
  NOT?: InputMaybe<Array<LessonWhereInput>>;
  OR?: InputMaybe<Array<LessonWhereInput>>;
  burned?: InputMaybe<BooleanFilter>;
  comment?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  endTime?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  notAlert?: InputMaybe<BooleanFilter>;
  notified?: InputMaybe<BooleanFilter>;
  startTime?: InputMaybe<DateTimeFilter>;
  statusLesson?: InputMaybe<StringFilter>;
  students?: InputMaybe<UserManyRelationFilter>;
  subscriptions?: InputMaybe<UserSubscriptionManyRelationFilter>;
  teachers?: InputMaybe<ManagerManyRelationFilter>;
  timeZone?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  trial?: InputMaybe<BooleanFilter>;
};

export type LessonWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Link = {
  __typename?: 'Link';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type LinkCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type LinkOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  link?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
};

export type LinkUpdateArgs = {
  data: LinkUpdateInput;
  where: LinkWhereUniqueInput;
};

export type LinkUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type LinkWhereInput = {
  AND?: InputMaybe<Array<LinkWhereInput>>;
  NOT?: InputMaybe<Array<LinkWhereInput>>;
  OR?: InputMaybe<Array<LinkWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  link?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type LinkWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export enum MagicLinkRedemptionErrorCode {
  Failure = 'FAILURE',
  TokenExpired = 'TOKEN_EXPIRED',
  TokenRedeemed = 'TOKEN_REDEEMED'
}

export type Mailing = {
  __typename?: 'Mailing';
  clients?: Maybe<Array<User>>;
  clientsCount?: Maybe<Scalars['Int']['output']>;
  content?: Maybe<Mailing_Content_Document>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  statusClient?: Maybe<Array<MailingStatusClientType>>;
  title?: Maybe<Scalars['String']['output']>;
};


export type MailingClientsArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type MailingClientsCountArgs = {
  where?: UserWhereInput;
};

export type MailingCreateInput = {
  clients?: InputMaybe<UserRelateToManyForCreateInput>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  statusClient?: InputMaybe<Array<MailingStatusClientType>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MailingOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export enum MailingStatusClientType {
  LowQualityLead = 'LowQualityLead',
  Client = 'client',
  DecisionAfterTrialLesson = 'decisionAfterTrialLesson',
  DisabledClient = 'disabledClient',
  FinishedClient = 'finishedClient',
  FirstCall = 'firstCall',
  New = 'new',
  PayedFirstLesson = 'payedFirstLesson',
  RecordFirstLesson = 'recordFirstLesson',
  Rejection = 'rejection',
  SpeakingClub = 'speakingClub',
  TrialLesson = 'trialLesson'
}

export type MailingUpdateArgs = {
  data: MailingUpdateInput;
  where: MailingWhereUniqueInput;
};

export type MailingUpdateInput = {
  clients?: InputMaybe<UserRelateToManyForUpdateInput>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  statusClient?: InputMaybe<Array<MailingStatusClientType>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MailingWhereInput = {
  AND?: InputMaybe<Array<MailingWhereInput>>;
  NOT?: InputMaybe<Array<MailingWhereInput>>;
  OR?: InputMaybe<Array<MailingWhereInput>>;
  clients?: InputMaybe<UserManyRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  language?: InputMaybe<StringFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type MailingWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Mailing_Content_Document = {
  __typename?: 'Mailing_content_Document';
  document: Scalars['JSON']['output'];
};


export type Mailing_Content_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type Manager = {
  __typename?: 'Manager';
  calendar?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  cutoff?: Maybe<Array<WorkTimeCutoff>>;
  cutoffCount?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  linkOnlineLesson?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['Decimal']['output']>;
  teacher?: Maybe<Scalars['Boolean']['output']>;
  timeZone?: Maybe<Scalars['String']['output']>;
  work?: Maybe<Scalars['Boolean']['output']>;
  workTime?: Maybe<Array<WorkTime>>;
  workTimeCount?: Maybe<Scalars['Int']['output']>;
};


export type ManagerCutoffArgs = {
  cursor?: InputMaybe<WorkTimeCutoffWhereUniqueInput>;
  orderBy?: Array<WorkTimeCutoffOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: WorkTimeCutoffWhereInput;
};


export type ManagerCutoffCountArgs = {
  where?: WorkTimeCutoffWhereInput;
};


export type ManagerWorkTimeArgs = {
  cursor?: InputMaybe<WorkTimeWhereUniqueInput>;
  orderBy?: Array<WorkTimeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: WorkTimeWhereInput;
};


export type ManagerWorkTimeCountArgs = {
  where?: WorkTimeWhereInput;
};

export type ManagerCreateInput = {
  calendar?: InputMaybe<Scalars['String']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  cutoff?: InputMaybe<WorkTimeCutoffRelateToManyForCreateInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  linkOnlineLesson?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['Decimal']['input']>;
  teacher?: InputMaybe<Scalars['Boolean']['input']>;
  timeZone?: InputMaybe<Scalars['String']['input']>;
  work?: InputMaybe<Scalars['Boolean']['input']>;
  workTime?: InputMaybe<WorkTimeRelateToManyForCreateInput>;
};

export type ManagerManyRelationFilter = {
  every?: InputMaybe<ManagerWhereInput>;
  none?: InputMaybe<ManagerWhereInput>;
  some?: InputMaybe<ManagerWhereInput>;
};

export type ManagerOrderByInput = {
  calendar?: InputMaybe<OrderDirection>;
  comment?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  linkOnlineLesson?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  phone?: InputMaybe<OrderDirection>;
  teacher?: InputMaybe<OrderDirection>;
  timeZone?: InputMaybe<OrderDirection>;
  work?: InputMaybe<OrderDirection>;
};

export type ManagerRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ManagerWhereUniqueInput>>;
  create?: InputMaybe<Array<ManagerCreateInput>>;
};

export type ManagerRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ManagerWhereUniqueInput>>;
  create?: InputMaybe<Array<ManagerCreateInput>>;
  disconnect?: InputMaybe<Array<ManagerWhereUniqueInput>>;
  set?: InputMaybe<Array<ManagerWhereUniqueInput>>;
};

export type ManagerRelateToOneForCreateInput = {
  connect?: InputMaybe<ManagerWhereUniqueInput>;
  create?: InputMaybe<ManagerCreateInput>;
};

export type ManagerRelateToOneForUpdateInput = {
  connect?: InputMaybe<ManagerWhereUniqueInput>;
  create?: InputMaybe<ManagerCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ManagerUpdateArgs = {
  data: ManagerUpdateInput;
  where: ManagerWhereUniqueInput;
};

export type ManagerUpdateInput = {
  calendar?: InputMaybe<Scalars['String']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  cutoff?: InputMaybe<WorkTimeCutoffRelateToManyForUpdateInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  linkOnlineLesson?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['Decimal']['input']>;
  teacher?: InputMaybe<Scalars['Boolean']['input']>;
  timeZone?: InputMaybe<Scalars['String']['input']>;
  work?: InputMaybe<Scalars['Boolean']['input']>;
  workTime?: InputMaybe<WorkTimeRelateToManyForUpdateInput>;
};

export type ManagerWhereInput = {
  AND?: InputMaybe<Array<ManagerWhereInput>>;
  NOT?: InputMaybe<Array<ManagerWhereInput>>;
  OR?: InputMaybe<Array<ManagerWhereInput>>;
  calendar?: InputMaybe<StringFilter>;
  comment?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  cutoff?: InputMaybe<WorkTimeCutoffManyRelationFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  language?: InputMaybe<StringFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  linkOnlineLesson?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  phone?: InputMaybe<DecimalNullableFilter>;
  teacher?: InputMaybe<BooleanFilter>;
  timeZone?: InputMaybe<StringFilter>;
  work?: InputMaybe<BooleanFilter>;
  workTime?: InputMaybe<WorkTimeManyRelationFilter>;
};

export type ManagerWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Marketing = {
  __typename?: 'Marketing';
  aboutGeorge?: Maybe<Scalars['Boolean']['output']>;
  advantages?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<ImageFieldOutput>;
  language?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  reviews?: Maybe<Scalars['Boolean']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  statusView?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type MarketingCreateInput = {
  aboutGeorge?: InputMaybe<Scalars['Boolean']['input']>;
  advantages?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  reviews?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MarketingOrderByInput = {
  aboutGeorge?: InputMaybe<OrderDirection>;
  advantages?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  reviews?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  statusView?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type MarketingUpdateArgs = {
  data: MarketingUpdateInput;
  where: MarketingWhereUniqueInput;
};

export type MarketingUpdateInput = {
  aboutGeorge?: InputMaybe<Scalars['Boolean']['input']>;
  advantages?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  reviews?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MarketingWhereInput = {
  AND?: InputMaybe<Array<MarketingWhereInput>>;
  NOT?: InputMaybe<Array<MarketingWhereInput>>;
  OR?: InputMaybe<Array<MarketingWhereInput>>;
  aboutGeorge?: InputMaybe<BooleanFilter>;
  advantages?: InputMaybe<BooleanFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  language?: InputMaybe<StringFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  reviews?: InputMaybe<BooleanFilter>;
  slug?: InputMaybe<StringFilter>;
  statusView?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type MarketingWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authCart?: Maybe<Client>;
  authWithEmail?: Maybe<Scalars['String']['output']>;
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  cart?: Maybe<PaymentResponse>;
  checkout?: Maybe<PaymentResponse>;
  createAvatarUser?: Maybe<AvatarUser>;
  createAvatarUsers?: Maybe<Array<Maybe<AvatarUser>>>;
  createCartItem?: Maybe<CartItem>;
  createCartItems?: Maybe<Array<Maybe<CartItem>>>;
  createCategories?: Maybe<Array<Maybe<Category>>>;
  createCategory?: Maybe<Category>;
  createClient?: Maybe<Client>;
  createClients?: Maybe<Array<Maybe<Client>>>;
  createCurrencies?: Maybe<Array<Maybe<Currency>>>;
  createCurrency?: Maybe<Currency>;
  createDirection?: Maybe<Direction>;
  createDirectionGoal?: Maybe<DirectionGoal>;
  createDirectionGoals?: Maybe<Array<Maybe<DirectionGoal>>>;
  createDirectionResult?: Maybe<DirectionResult>;
  createDirectionResults?: Maybe<Array<Maybe<DirectionResult>>>;
  createDirections?: Maybe<Array<Maybe<Direction>>>;
  createFaq?: Maybe<Faq>;
  createFaqs?: Maybe<Array<Maybe<Faq>>>;
  createImage?: Maybe<Image>;
  createImages?: Maybe<Array<Maybe<Image>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createLesson?: Maybe<Lesson>;
  createLessonSchedule?: Maybe<LessonSchedule>;
  createLessonScheduleItem?: Maybe<LessonScheduleItem>;
  createLessonScheduleItems?: Maybe<Array<Maybe<LessonScheduleItem>>>;
  createLessonSchedules?: Maybe<Array<Maybe<LessonSchedule>>>;
  createLessons?: Maybe<Array<Maybe<Lesson>>>;
  createLink?: Maybe<Link>;
  createLinks?: Maybe<Array<Maybe<Link>>>;
  createMailing?: Maybe<Mailing>;
  createMailings?: Maybe<Array<Maybe<Mailing>>>;
  createManager?: Maybe<Manager>;
  createManagers?: Maybe<Array<Maybe<Manager>>>;
  createMarketing?: Maybe<Marketing>;
  createMarketings?: Maybe<Array<Maybe<Marketing>>>;
  createOrder?: Maybe<Order>;
  createOrders?: Maybe<Array<Maybe<Order>>>;
  createPage?: Maybe<Page>;
  createPages?: Maybe<Array<Maybe<Page>>>;
  createPayment?: Maybe<Payment>;
  createPayments?: Maybe<Array<Maybe<Payment>>>;
  createPost?: Maybe<Post>;
  createPosts?: Maybe<Array<Maybe<Post>>>;
  createProduct?: Maybe<Product>;
  createProductReview?: Maybe<ProductReview>;
  createProductReviews?: Maybe<Array<Maybe<ProductReview>>>;
  createProducts?: Maybe<Array<Maybe<Product>>>;
  createService?: Maybe<Service>;
  createServices?: Maybe<Array<Maybe<Service>>>;
  createSourceClient?: Maybe<SourceClient>;
  createSourceClients?: Maybe<Array<Maybe<SourceClient>>>;
  createSubscription?: Maybe<Subscription>;
  createSubscriptions?: Maybe<Array<Maybe<Subscription>>>;
  createTag?: Maybe<Tag>;
  createTags?: Maybe<Array<Maybe<Tag>>>;
  createUser?: Maybe<User>;
  createUserService?: Maybe<UserService>;
  createUserServices?: Maybe<Array<Maybe<UserService>>>;
  createUserSubscription?: Maybe<UserSubscription>;
  createUserSubscriptions?: Maybe<Array<Maybe<UserSubscription>>>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  createWorkTime?: Maybe<WorkTime>;
  createWorkTimeCutoff?: Maybe<WorkTimeCutoff>;
  createWorkTimeCutoffs?: Maybe<Array<Maybe<WorkTimeCutoff>>>;
  createWorkTimes?: Maybe<Array<Maybe<WorkTime>>>;
  deleteAvatarUser?: Maybe<AvatarUser>;
  deleteAvatarUsers?: Maybe<Array<Maybe<AvatarUser>>>;
  deleteCart?: Maybe<Cart>;
  deleteCartItem?: Maybe<CartItem>;
  deleteCartItems?: Maybe<Array<Maybe<CartItem>>>;
  deleteCarts?: Maybe<Array<Maybe<Cart>>>;
  deleteCategories?: Maybe<Array<Maybe<Category>>>;
  deleteCategory?: Maybe<Category>;
  deleteClient?: Maybe<Client>;
  deleteClients?: Maybe<Array<Maybe<Client>>>;
  deleteCurrencies?: Maybe<Array<Maybe<Currency>>>;
  deleteCurrency?: Maybe<Currency>;
  deleteDirection?: Maybe<Direction>;
  deleteDirectionGoal?: Maybe<DirectionGoal>;
  deleteDirectionGoals?: Maybe<Array<Maybe<DirectionGoal>>>;
  deleteDirectionResult?: Maybe<DirectionResult>;
  deleteDirectionResults?: Maybe<Array<Maybe<DirectionResult>>>;
  deleteDirections?: Maybe<Array<Maybe<Direction>>>;
  deleteFaq?: Maybe<Faq>;
  deleteFaqs?: Maybe<Array<Maybe<Faq>>>;
  deleteImage?: Maybe<Image>;
  deleteImages?: Maybe<Array<Maybe<Image>>>;
  deleteLesson?: Maybe<Lesson>;
  deleteLessonSchedule?: Maybe<LessonSchedule>;
  deleteLessonScheduleItem?: Maybe<LessonScheduleItem>;
  deleteLessonScheduleItems?: Maybe<Array<Maybe<LessonScheduleItem>>>;
  deleteLessonSchedules?: Maybe<Array<Maybe<LessonSchedule>>>;
  deleteLessons?: Maybe<Array<Maybe<Lesson>>>;
  deleteLink?: Maybe<Link>;
  deleteLinks?: Maybe<Array<Maybe<Link>>>;
  deleteMailing?: Maybe<Mailing>;
  deleteMailings?: Maybe<Array<Maybe<Mailing>>>;
  deleteManager?: Maybe<Manager>;
  deleteManagers?: Maybe<Array<Maybe<Manager>>>;
  deleteMarketing?: Maybe<Marketing>;
  deleteMarketings?: Maybe<Array<Maybe<Marketing>>>;
  deleteOrder?: Maybe<Order>;
  deleteOrders?: Maybe<Array<Maybe<Order>>>;
  deletePage?: Maybe<Page>;
  deletePages?: Maybe<Array<Maybe<Page>>>;
  deletePayment?: Maybe<Payment>;
  deletePayments?: Maybe<Array<Maybe<Payment>>>;
  deletePost?: Maybe<Post>;
  deletePosts?: Maybe<Array<Maybe<Post>>>;
  deleteProduct?: Maybe<Product>;
  deleteProductReview?: Maybe<ProductReview>;
  deleteProductReviews?: Maybe<Array<Maybe<ProductReview>>>;
  deleteProducts?: Maybe<Array<Maybe<Product>>>;
  deleteService?: Maybe<Service>;
  deleteServices?: Maybe<Array<Maybe<Service>>>;
  deleteSourceClient?: Maybe<SourceClient>;
  deleteSourceClients?: Maybe<Array<Maybe<SourceClient>>>;
  deleteSubscription?: Maybe<Subscription>;
  deleteSubscriptions?: Maybe<Array<Maybe<Subscription>>>;
  deleteTag?: Maybe<Tag>;
  deleteTags?: Maybe<Array<Maybe<Tag>>>;
  deleteUser?: Maybe<User>;
  deleteUserService?: Maybe<UserService>;
  deleteUserServices?: Maybe<Array<Maybe<UserService>>>;
  deleteUserSubscription?: Maybe<UserSubscription>;
  deleteUserSubscriptions?: Maybe<Array<Maybe<UserSubscription>>>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  deleteWorkTime?: Maybe<WorkTime>;
  deleteWorkTimeCutoff?: Maybe<WorkTimeCutoff>;
  deleteWorkTimeCutoffs?: Maybe<Array<Maybe<WorkTimeCutoff>>>;
  deleteWorkTimes?: Maybe<Array<Maybe<WorkTime>>>;
  endSession: Scalars['Boolean']['output'];
  payment?: Maybe<PaymentResponse>;
  redeemUserMagicAuthToken: RedeemUserMagicAuthTokenResult;
  sendUserMagicAuthLink: Scalars['Boolean']['output'];
  updateAvatarUser?: Maybe<AvatarUser>;
  updateAvatarUsers?: Maybe<Array<Maybe<AvatarUser>>>;
  updateCart?: Maybe<Cart>;
  updateCartItem?: Maybe<CartItem>;
  updateCartItems?: Maybe<Array<Maybe<CartItem>>>;
  updateCarts?: Maybe<Array<Maybe<Cart>>>;
  updateCategories?: Maybe<Array<Maybe<Category>>>;
  updateCategory?: Maybe<Category>;
  updateClient?: Maybe<Client>;
  updateClients?: Maybe<Array<Maybe<Client>>>;
  updateCurrencies?: Maybe<Array<Maybe<Currency>>>;
  updateCurrency?: Maybe<Currency>;
  updateDirection?: Maybe<Direction>;
  updateDirectionGoal?: Maybe<DirectionGoal>;
  updateDirectionGoals?: Maybe<Array<Maybe<DirectionGoal>>>;
  updateDirectionResult?: Maybe<DirectionResult>;
  updateDirectionResults?: Maybe<Array<Maybe<DirectionResult>>>;
  updateDirections?: Maybe<Array<Maybe<Direction>>>;
  updateFaq?: Maybe<Faq>;
  updateFaqs?: Maybe<Array<Maybe<Faq>>>;
  updateImage?: Maybe<Image>;
  updateImages?: Maybe<Array<Maybe<Image>>>;
  updateLesson?: Maybe<Lesson>;
  updateLessonSchedule?: Maybe<LessonSchedule>;
  updateLessonScheduleItem?: Maybe<LessonScheduleItem>;
  updateLessonScheduleItems?: Maybe<Array<Maybe<LessonScheduleItem>>>;
  updateLessonSchedules?: Maybe<Array<Maybe<LessonSchedule>>>;
  updateLessons?: Maybe<Array<Maybe<Lesson>>>;
  updateLink?: Maybe<Link>;
  updateLinks?: Maybe<Array<Maybe<Link>>>;
  updateMailing?: Maybe<Mailing>;
  updateMailings?: Maybe<Array<Maybe<Mailing>>>;
  updateManager?: Maybe<Manager>;
  updateManagers?: Maybe<Array<Maybe<Manager>>>;
  updateMarketing?: Maybe<Marketing>;
  updateMarketings?: Maybe<Array<Maybe<Marketing>>>;
  updateOrder?: Maybe<Order>;
  updateOrders?: Maybe<Array<Maybe<Order>>>;
  updatePage?: Maybe<Page>;
  updatePages?: Maybe<Array<Maybe<Page>>>;
  updatePayment?: Maybe<Payment>;
  updatePayments?: Maybe<Array<Maybe<Payment>>>;
  updatePost?: Maybe<Post>;
  updatePosts?: Maybe<Array<Maybe<Post>>>;
  updateProduct?: Maybe<Product>;
  updateProductReview?: Maybe<ProductReview>;
  updateProductReviews?: Maybe<Array<Maybe<ProductReview>>>;
  updateProducts?: Maybe<Array<Maybe<Product>>>;
  updateService?: Maybe<Service>;
  updateServices?: Maybe<Array<Maybe<Service>>>;
  updateSourceClient?: Maybe<SourceClient>;
  updateSourceClients?: Maybe<Array<Maybe<SourceClient>>>;
  updateSubscription?: Maybe<Subscription>;
  updateSubscriptions?: Maybe<Array<Maybe<Subscription>>>;
  updateTag?: Maybe<Tag>;
  updateTags?: Maybe<Array<Maybe<Tag>>>;
  updateUser?: Maybe<User>;
  updateUserService?: Maybe<UserService>;
  updateUserServices?: Maybe<Array<Maybe<UserService>>>;
  updateUserSubscription?: Maybe<UserSubscription>;
  updateUserSubscriptions?: Maybe<Array<Maybe<UserSubscription>>>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
  updateWorkTime?: Maybe<WorkTime>;
  updateWorkTimeCutoff?: Maybe<WorkTimeCutoff>;
  updateWorkTimeCutoffs?: Maybe<Array<Maybe<WorkTimeCutoff>>>;
  updateWorkTimes?: Maybe<Array<Maybe<WorkTime>>>;
};


export type MutationAuthCartArgs = {
  data: AuthCartData;
};


export type MutationAuthWithEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCartArgs = {
  data: CartData;
};


export type MutationCheckoutArgs = {
  currency: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateAvatarUserArgs = {
  data: AvatarUserCreateInput;
};


export type MutationCreateAvatarUsersArgs = {
  data: Array<AvatarUserCreateInput>;
};


export type MutationCreateCartItemArgs = {
  data: CartItemCreateInput;
};


export type MutationCreateCartItemsArgs = {
  data: Array<CartItemCreateInput>;
};


export type MutationCreateCategoriesArgs = {
  data: Array<CategoryCreateInput>;
};


export type MutationCreateCategoryArgs = {
  data: CategoryCreateInput;
};


export type MutationCreateClientArgs = {
  data: ClientCreateInput;
};


export type MutationCreateClientsArgs = {
  data: Array<ClientCreateInput>;
};


export type MutationCreateCurrenciesArgs = {
  data: Array<CurrencyCreateInput>;
};


export type MutationCreateCurrencyArgs = {
  data: CurrencyCreateInput;
};


export type MutationCreateDirectionArgs = {
  data: DirectionCreateInput;
};


export type MutationCreateDirectionGoalArgs = {
  data: DirectionGoalCreateInput;
};


export type MutationCreateDirectionGoalsArgs = {
  data: Array<DirectionGoalCreateInput>;
};


export type MutationCreateDirectionResultArgs = {
  data: DirectionResultCreateInput;
};


export type MutationCreateDirectionResultsArgs = {
  data: Array<DirectionResultCreateInput>;
};


export type MutationCreateDirectionsArgs = {
  data: Array<DirectionCreateInput>;
};


export type MutationCreateFaqArgs = {
  data: FaqCreateInput;
};


export type MutationCreateFaqsArgs = {
  data: Array<FaqCreateInput>;
};


export type MutationCreateImageArgs = {
  data: ImageCreateInput;
};


export type MutationCreateImagesArgs = {
  data: Array<ImageCreateInput>;
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreateLessonArgs = {
  data: LessonCreateInput;
};


export type MutationCreateLessonScheduleArgs = {
  data: LessonScheduleCreateInput;
};


export type MutationCreateLessonScheduleItemArgs = {
  data: LessonScheduleItemCreateInput;
};


export type MutationCreateLessonScheduleItemsArgs = {
  data: Array<LessonScheduleItemCreateInput>;
};


export type MutationCreateLessonSchedulesArgs = {
  data: Array<LessonScheduleCreateInput>;
};


export type MutationCreateLessonsArgs = {
  data: Array<LessonCreateInput>;
};


export type MutationCreateLinkArgs = {
  data: LinkCreateInput;
};


export type MutationCreateLinksArgs = {
  data: Array<LinkCreateInput>;
};


export type MutationCreateMailingArgs = {
  data: MailingCreateInput;
};


export type MutationCreateMailingsArgs = {
  data: Array<MailingCreateInput>;
};


export type MutationCreateManagerArgs = {
  data: ManagerCreateInput;
};


export type MutationCreateManagersArgs = {
  data: Array<ManagerCreateInput>;
};


export type MutationCreateMarketingArgs = {
  data: MarketingCreateInput;
};


export type MutationCreateMarketingsArgs = {
  data: Array<MarketingCreateInput>;
};


export type MutationCreateOrderArgs = {
  data: OrderCreateInput;
};


export type MutationCreateOrdersArgs = {
  data: Array<OrderCreateInput>;
};


export type MutationCreatePageArgs = {
  data: PageCreateInput;
};


export type MutationCreatePagesArgs = {
  data: Array<PageCreateInput>;
};


export type MutationCreatePaymentArgs = {
  data: PaymentCreateInput;
};


export type MutationCreatePaymentsArgs = {
  data: Array<PaymentCreateInput>;
};


export type MutationCreatePostArgs = {
  data: PostCreateInput;
};


export type MutationCreatePostsArgs = {
  data: Array<PostCreateInput>;
};


export type MutationCreateProductArgs = {
  data: ProductCreateInput;
};


export type MutationCreateProductReviewArgs = {
  data: ProductReviewCreateInput;
};


export type MutationCreateProductReviewsArgs = {
  data: Array<ProductReviewCreateInput>;
};


export type MutationCreateProductsArgs = {
  data: Array<ProductCreateInput>;
};


export type MutationCreateServiceArgs = {
  data: ServiceCreateInput;
};


export type MutationCreateServicesArgs = {
  data: Array<ServiceCreateInput>;
};


export type MutationCreateSourceClientArgs = {
  data: SourceClientCreateInput;
};


export type MutationCreateSourceClientsArgs = {
  data: Array<SourceClientCreateInput>;
};


export type MutationCreateSubscriptionArgs = {
  data: SubscriptionCreateInput;
};


export type MutationCreateSubscriptionsArgs = {
  data: Array<SubscriptionCreateInput>;
};


export type MutationCreateTagArgs = {
  data: TagCreateInput;
};


export type MutationCreateTagsArgs = {
  data: Array<TagCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUserServiceArgs = {
  data: UserServiceCreateInput;
};


export type MutationCreateUserServicesArgs = {
  data: Array<UserServiceCreateInput>;
};


export type MutationCreateUserSubscriptionArgs = {
  data: UserSubscriptionCreateInput;
};


export type MutationCreateUserSubscriptionsArgs = {
  data: Array<UserSubscriptionCreateInput>;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationCreateWorkTimeArgs = {
  data: WorkTimeCreateInput;
};


export type MutationCreateWorkTimeCutoffArgs = {
  data: WorkTimeCutoffCreateInput;
};


export type MutationCreateWorkTimeCutoffsArgs = {
  data: Array<WorkTimeCutoffCreateInput>;
};


export type MutationCreateWorkTimesArgs = {
  data: Array<WorkTimeCreateInput>;
};


export type MutationDeleteAvatarUserArgs = {
  where: AvatarUserWhereUniqueInput;
};


export type MutationDeleteAvatarUsersArgs = {
  where: Array<AvatarUserWhereUniqueInput>;
};


export type MutationDeleteCartArgs = {
  where: CartWhereUniqueInput;
};


export type MutationDeleteCartItemArgs = {
  where: CartItemWhereUniqueInput;
};


export type MutationDeleteCartItemsArgs = {
  where: Array<CartItemWhereUniqueInput>;
};


export type MutationDeleteCartsArgs = {
  where: Array<CartWhereUniqueInput>;
};


export type MutationDeleteCategoriesArgs = {
  where: Array<CategoryWhereUniqueInput>;
};


export type MutationDeleteCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type MutationDeleteClientArgs = {
  where: ClientWhereUniqueInput;
};


export type MutationDeleteClientsArgs = {
  where: Array<ClientWhereUniqueInput>;
};


export type MutationDeleteCurrenciesArgs = {
  where: Array<CurrencyWhereUniqueInput>;
};


export type MutationDeleteCurrencyArgs = {
  where: CurrencyWhereUniqueInput;
};


export type MutationDeleteDirectionArgs = {
  where: DirectionWhereUniqueInput;
};


export type MutationDeleteDirectionGoalArgs = {
  where: DirectionGoalWhereUniqueInput;
};


export type MutationDeleteDirectionGoalsArgs = {
  where: Array<DirectionGoalWhereUniqueInput>;
};


export type MutationDeleteDirectionResultArgs = {
  where: DirectionResultWhereUniqueInput;
};


export type MutationDeleteDirectionResultsArgs = {
  where: Array<DirectionResultWhereUniqueInput>;
};


export type MutationDeleteDirectionsArgs = {
  where: Array<DirectionWhereUniqueInput>;
};


export type MutationDeleteFaqArgs = {
  where: FaqWhereUniqueInput;
};


export type MutationDeleteFaqsArgs = {
  where: Array<FaqWhereUniqueInput>;
};


export type MutationDeleteImageArgs = {
  where: ImageWhereUniqueInput;
};


export type MutationDeleteImagesArgs = {
  where: Array<ImageWhereUniqueInput>;
};


export type MutationDeleteLessonArgs = {
  where: LessonWhereUniqueInput;
};


export type MutationDeleteLessonScheduleArgs = {
  where: LessonScheduleWhereUniqueInput;
};


export type MutationDeleteLessonScheduleItemArgs = {
  where: LessonScheduleItemWhereUniqueInput;
};


export type MutationDeleteLessonScheduleItemsArgs = {
  where: Array<LessonScheduleItemWhereUniqueInput>;
};


export type MutationDeleteLessonSchedulesArgs = {
  where: Array<LessonScheduleWhereUniqueInput>;
};


export type MutationDeleteLessonsArgs = {
  where: Array<LessonWhereUniqueInput>;
};


export type MutationDeleteLinkArgs = {
  where: LinkWhereUniqueInput;
};


export type MutationDeleteLinksArgs = {
  where: Array<LinkWhereUniqueInput>;
};


export type MutationDeleteMailingArgs = {
  where: MailingWhereUniqueInput;
};


export type MutationDeleteMailingsArgs = {
  where: Array<MailingWhereUniqueInput>;
};


export type MutationDeleteManagerArgs = {
  where: ManagerWhereUniqueInput;
};


export type MutationDeleteManagersArgs = {
  where: Array<ManagerWhereUniqueInput>;
};


export type MutationDeleteMarketingArgs = {
  where: MarketingWhereUniqueInput;
};


export type MutationDeleteMarketingsArgs = {
  where: Array<MarketingWhereUniqueInput>;
};


export type MutationDeleteOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type MutationDeleteOrdersArgs = {
  where: Array<OrderWhereUniqueInput>;
};


export type MutationDeletePageArgs = {
  where: PageWhereUniqueInput;
};


export type MutationDeletePagesArgs = {
  where: Array<PageWhereUniqueInput>;
};


export type MutationDeletePaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type MutationDeletePaymentsArgs = {
  where: Array<PaymentWhereUniqueInput>;
};


export type MutationDeletePostArgs = {
  where: PostWhereUniqueInput;
};


export type MutationDeletePostsArgs = {
  where: Array<PostWhereUniqueInput>;
};


export type MutationDeleteProductArgs = {
  where: ProductWhereUniqueInput;
};


export type MutationDeleteProductReviewArgs = {
  where: ProductReviewWhereUniqueInput;
};


export type MutationDeleteProductReviewsArgs = {
  where: Array<ProductReviewWhereUniqueInput>;
};


export type MutationDeleteProductsArgs = {
  where: Array<ProductWhereUniqueInput>;
};


export type MutationDeleteServiceArgs = {
  where: ServiceWhereUniqueInput;
};


export type MutationDeleteServicesArgs = {
  where: Array<ServiceWhereUniqueInput>;
};


export type MutationDeleteSourceClientArgs = {
  where: SourceClientWhereUniqueInput;
};


export type MutationDeleteSourceClientsArgs = {
  where: Array<SourceClientWhereUniqueInput>;
};


export type MutationDeleteSubscriptionArgs = {
  where: SubscriptionWhereUniqueInput;
};


export type MutationDeleteSubscriptionsArgs = {
  where: Array<SubscriptionWhereUniqueInput>;
};


export type MutationDeleteTagArgs = {
  where: TagWhereUniqueInput;
};


export type MutationDeleteTagsArgs = {
  where: Array<TagWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUserServiceArgs = {
  where: UserServiceWhereUniqueInput;
};


export type MutationDeleteUserServicesArgs = {
  where: Array<UserServiceWhereUniqueInput>;
};


export type MutationDeleteUserSubscriptionArgs = {
  where: UserSubscriptionWhereUniqueInput;
};


export type MutationDeleteUserSubscriptionsArgs = {
  where: Array<UserSubscriptionWhereUniqueInput>;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationDeleteWorkTimeArgs = {
  where: WorkTimeWhereUniqueInput;
};


export type MutationDeleteWorkTimeCutoffArgs = {
  where: WorkTimeCutoffWhereUniqueInput;
};


export type MutationDeleteWorkTimeCutoffsArgs = {
  where: Array<WorkTimeCutoffWhereUniqueInput>;
};


export type MutationDeleteWorkTimesArgs = {
  where: Array<WorkTimeWhereUniqueInput>;
};


export type MutationPaymentArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  orderId: Scalars['String']['input'];
};


export type MutationRedeemUserMagicAuthTokenArgs = {
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSendUserMagicAuthLinkArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateAvatarUserArgs = {
  data: AvatarUserUpdateInput;
  where: AvatarUserWhereUniqueInput;
};


export type MutationUpdateAvatarUsersArgs = {
  data: Array<AvatarUserUpdateArgs>;
};


export type MutationUpdateCartArgs = {
  data: CartUpdateInput;
  where: CartWhereUniqueInput;
};


export type MutationUpdateCartItemArgs = {
  data: CartItemUpdateInput;
  where: CartItemWhereUniqueInput;
};


export type MutationUpdateCartItemsArgs = {
  data: Array<CartItemUpdateArgs>;
};


export type MutationUpdateCartsArgs = {
  data: Array<CartUpdateArgs>;
};


export type MutationUpdateCategoriesArgs = {
  data: Array<CategoryUpdateArgs>;
};


export type MutationUpdateCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};


export type MutationUpdateClientArgs = {
  data: ClientUpdateInput;
  where: ClientWhereUniqueInput;
};


export type MutationUpdateClientsArgs = {
  data: Array<ClientUpdateArgs>;
};


export type MutationUpdateCurrenciesArgs = {
  data: Array<CurrencyUpdateArgs>;
};


export type MutationUpdateCurrencyArgs = {
  data: CurrencyUpdateInput;
  where: CurrencyWhereUniqueInput;
};


export type MutationUpdateDirectionArgs = {
  data: DirectionUpdateInput;
  where: DirectionWhereUniqueInput;
};


export type MutationUpdateDirectionGoalArgs = {
  data: DirectionGoalUpdateInput;
  where: DirectionGoalWhereUniqueInput;
};


export type MutationUpdateDirectionGoalsArgs = {
  data: Array<DirectionGoalUpdateArgs>;
};


export type MutationUpdateDirectionResultArgs = {
  data: DirectionResultUpdateInput;
  where: DirectionResultWhereUniqueInput;
};


export type MutationUpdateDirectionResultsArgs = {
  data: Array<DirectionResultUpdateArgs>;
};


export type MutationUpdateDirectionsArgs = {
  data: Array<DirectionUpdateArgs>;
};


export type MutationUpdateFaqArgs = {
  data: FaqUpdateInput;
  where: FaqWhereUniqueInput;
};


export type MutationUpdateFaqsArgs = {
  data: Array<FaqUpdateArgs>;
};


export type MutationUpdateImageArgs = {
  data: ImageUpdateInput;
  where: ImageWhereUniqueInput;
};


export type MutationUpdateImagesArgs = {
  data: Array<ImageUpdateArgs>;
};


export type MutationUpdateLessonArgs = {
  data: LessonUpdateInput;
  where: LessonWhereUniqueInput;
};


export type MutationUpdateLessonScheduleArgs = {
  data: LessonScheduleUpdateInput;
  where: LessonScheduleWhereUniqueInput;
};


export type MutationUpdateLessonScheduleItemArgs = {
  data: LessonScheduleItemUpdateInput;
  where: LessonScheduleItemWhereUniqueInput;
};


export type MutationUpdateLessonScheduleItemsArgs = {
  data: Array<LessonScheduleItemUpdateArgs>;
};


export type MutationUpdateLessonSchedulesArgs = {
  data: Array<LessonScheduleUpdateArgs>;
};


export type MutationUpdateLessonsArgs = {
  data: Array<LessonUpdateArgs>;
};


export type MutationUpdateLinkArgs = {
  data: LinkUpdateInput;
  where: LinkWhereUniqueInput;
};


export type MutationUpdateLinksArgs = {
  data: Array<LinkUpdateArgs>;
};


export type MutationUpdateMailingArgs = {
  data: MailingUpdateInput;
  where: MailingWhereUniqueInput;
};


export type MutationUpdateMailingsArgs = {
  data: Array<MailingUpdateArgs>;
};


export type MutationUpdateManagerArgs = {
  data: ManagerUpdateInput;
  where: ManagerWhereUniqueInput;
};


export type MutationUpdateManagersArgs = {
  data: Array<ManagerUpdateArgs>;
};


export type MutationUpdateMarketingArgs = {
  data: MarketingUpdateInput;
  where: MarketingWhereUniqueInput;
};


export type MutationUpdateMarketingsArgs = {
  data: Array<MarketingUpdateArgs>;
};


export type MutationUpdateOrderArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};


export type MutationUpdateOrdersArgs = {
  data: Array<OrderUpdateArgs>;
};


export type MutationUpdatePageArgs = {
  data: PageUpdateInput;
  where: PageWhereUniqueInput;
};


export type MutationUpdatePagesArgs = {
  data: Array<PageUpdateArgs>;
};


export type MutationUpdatePaymentArgs = {
  data: PaymentUpdateInput;
  where: PaymentWhereUniqueInput;
};


export type MutationUpdatePaymentsArgs = {
  data: Array<PaymentUpdateArgs>;
};


export type MutationUpdatePostArgs = {
  data: PostUpdateInput;
  where: PostWhereUniqueInput;
};


export type MutationUpdatePostsArgs = {
  data: Array<PostUpdateArgs>;
};


export type MutationUpdateProductArgs = {
  data: ProductUpdateInput;
  where: ProductWhereUniqueInput;
};


export type MutationUpdateProductReviewArgs = {
  data: ProductReviewUpdateInput;
  where: ProductReviewWhereUniqueInput;
};


export type MutationUpdateProductReviewsArgs = {
  data: Array<ProductReviewUpdateArgs>;
};


export type MutationUpdateProductsArgs = {
  data: Array<ProductUpdateArgs>;
};


export type MutationUpdateServiceArgs = {
  data: ServiceUpdateInput;
  where: ServiceWhereUniqueInput;
};


export type MutationUpdateServicesArgs = {
  data: Array<ServiceUpdateArgs>;
};


export type MutationUpdateSourceClientArgs = {
  data: SourceClientUpdateInput;
  where: SourceClientWhereUniqueInput;
};


export type MutationUpdateSourceClientsArgs = {
  data: Array<SourceClientUpdateArgs>;
};


export type MutationUpdateSubscriptionArgs = {
  data: SubscriptionUpdateInput;
  where: SubscriptionWhereUniqueInput;
};


export type MutationUpdateSubscriptionsArgs = {
  data: Array<SubscriptionUpdateArgs>;
};


export type MutationUpdateTagArgs = {
  data: TagUpdateInput;
  where: TagWhereUniqueInput;
};


export type MutationUpdateTagsArgs = {
  data: Array<TagUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUserServiceArgs = {
  data: UserServiceUpdateInput;
  where: UserServiceWhereUniqueInput;
};


export type MutationUpdateUserServicesArgs = {
  data: Array<UserServiceUpdateArgs>;
};


export type MutationUpdateUserSubscriptionArgs = {
  data: UserSubscriptionUpdateInput;
  where: UserSubscriptionWhereUniqueInput;
};


export type MutationUpdateUserSubscriptionsArgs = {
  data: Array<UserSubscriptionUpdateArgs>;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};


export type MutationUpdateWorkTimeArgs = {
  data: WorkTimeUpdateInput;
  where: WorkTimeWhereUniqueInput;
};


export type MutationUpdateWorkTimeCutoffArgs = {
  data: WorkTimeCutoffUpdateInput;
  where: WorkTimeCutoffWhereUniqueInput;
};


export type MutationUpdateWorkTimeCutoffsArgs = {
  data: Array<WorkTimeCutoffUpdateArgs>;
};


export type MutationUpdateWorkTimesArgs = {
  data: Array<WorkTimeUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Order = {
  __typename?: 'Order';
  amount?: Maybe<Scalars['Int']['output']>;
  amountUSD?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  dept?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  leftPayments?: Maybe<Scalars['Int']['output']>;
  linkForUser?: Maybe<Scalars['String']['output']>;
  nextPayment?: Maybe<Scalars['Int']['output']>;
  nextPaymentUSD?: Maybe<Scalars['Int']['output']>;
  payed?: Maybe<Scalars['Int']['output']>;
  payments?: Maybe<Array<Payment>>;
  paymentsCount?: Maybe<Scalars['Int']['output']>;
  quantityPayments?: Maybe<Scalars['Int']['output']>;
  services?: Maybe<Array<UserService>>;
  servicesCount?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<OrderStatusType>;
  student?: Maybe<User>;
  subscriptions?: Maybe<Array<UserSubscription>>;
  subscriptionsCount?: Maybe<Scalars['Int']['output']>;
};


export type OrderPaymentsArgs = {
  cursor?: InputMaybe<PaymentWhereUniqueInput>;
  orderBy?: Array<PaymentOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PaymentWhereInput;
};


export type OrderPaymentsCountArgs = {
  where?: PaymentWhereInput;
};


export type OrderServicesArgs = {
  cursor?: InputMaybe<UserServiceWhereUniqueInput>;
  orderBy?: Array<UserServiceOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserServiceWhereInput;
};


export type OrderServicesCountArgs = {
  where?: UserServiceWhereInput;
};


export type OrderSubscriptionsArgs = {
  cursor?: InputMaybe<UserSubscriptionWhereUniqueInput>;
  orderBy?: Array<UserSubscriptionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserSubscriptionWhereInput;
};


export type OrderSubscriptionsCountArgs = {
  where?: UserSubscriptionWhereInput;
};

export type OrderCreateInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  payments?: InputMaybe<PaymentRelateToManyForCreateInput>;
  quantityPayments?: InputMaybe<Scalars['Int']['input']>;
  services?: InputMaybe<UserServiceRelateToManyForCreateInput>;
  status?: InputMaybe<OrderStatusType>;
  student?: InputMaybe<UserRelateToOneForCreateInput>;
  subscriptions?: InputMaybe<UserSubscriptionRelateToManyForCreateInput>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type OrderOrderByInput = {
  amount?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  currency?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  label?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  quantityPayments?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
};

export type OrderRelateToOneForCreateInput = {
  connect?: InputMaybe<OrderWhereUniqueInput>;
  create?: InputMaybe<OrderCreateInput>;
};

export type OrderRelateToOneForUpdateInput = {
  connect?: InputMaybe<OrderWhereUniqueInput>;
  create?: InputMaybe<OrderCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum OrderStatusType {
  Cancelled = 'cancelled',
  Created = 'created',
  Finished = 'finished',
  Frozen = 'frozen',
  Processing = 'processing'
}

export type OrderStatusTypeNullableFilter = {
  equals?: InputMaybe<OrderStatusType>;
  in?: InputMaybe<Array<OrderStatusType>>;
  not?: InputMaybe<OrderStatusTypeNullableFilter>;
  notIn?: InputMaybe<Array<OrderStatusType>>;
};

export type OrderUpdateArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};

export type OrderUpdateInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  payments?: InputMaybe<PaymentRelateToManyForUpdateInput>;
  quantityPayments?: InputMaybe<Scalars['Int']['input']>;
  services?: InputMaybe<UserServiceRelateToManyForUpdateInput>;
  status?: InputMaybe<OrderStatusType>;
  student?: InputMaybe<UserRelateToOneForUpdateInput>;
  subscriptions?: InputMaybe<UserSubscriptionRelateToManyForUpdateInput>;
};

export type OrderWhereInput = {
  AND?: InputMaybe<Array<OrderWhereInput>>;
  NOT?: InputMaybe<Array<OrderWhereInput>>;
  OR?: InputMaybe<Array<OrderWhereInput>>;
  amount?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  currency?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  label?: InputMaybe<StringFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  payments?: InputMaybe<PaymentManyRelationFilter>;
  quantityPayments?: InputMaybe<IntFilter>;
  services?: InputMaybe<UserServiceManyRelationFilter>;
  status?: InputMaybe<OrderStatusTypeNullableFilter>;
  student?: InputMaybe<UserWhereInput>;
  subscriptions?: InputMaybe<UserSubscriptionManyRelationFilter>;
};

export type OrderWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Page = {
  __typename?: 'Page';
  author?: Maybe<User>;
  content?: Maybe<Page_Content_Document>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  statusView?: Maybe<Scalars['String']['output']>;
  tag?: Maybe<Array<Tag>>;
  tagCount?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type PageTagArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  orderBy?: Array<TagOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TagWhereInput;
};


export type PageTagCountArgs = {
  where?: TagWhereInput;
};

export type PageCreateInput = {
  author?: InputMaybe<UserRelateToOneForCreateInput>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<TagRelateToManyForCreateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PageOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  statusView?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type PageUpdateArgs = {
  data: PageUpdateInput;
  where: PageWhereUniqueInput;
};

export type PageUpdateInput = {
  author?: InputMaybe<UserRelateToOneForUpdateInput>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<TagRelateToManyForUpdateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PageWhereInput = {
  AND?: InputMaybe<Array<PageWhereInput>>;
  NOT?: InputMaybe<Array<PageWhereInput>>;
  OR?: InputMaybe<Array<PageWhereInput>>;
  author?: InputMaybe<UserWhereInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  language?: InputMaybe<StringFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  slug?: InputMaybe<StringFilter>;
  statusView?: InputMaybe<StringFilter>;
  tag?: InputMaybe<TagManyRelationFilter>;
  title?: InputMaybe<StringFilter>;
};

export type PageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Page_Content_Document = {
  __typename?: 'Page_content_Document';
  document: Scalars['JSON']['output'];
};


export type Page_Content_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type PasswordFilter = {
  isSet: Scalars['Boolean']['input'];
};

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean']['output'];
};

export type Payment = {
  __typename?: 'Payment';
  amount?: Maybe<Scalars['Int']['output']>;
  amountUSD?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  order?: Maybe<Order>;
  receiptId?: Maybe<Scalars['String']['output']>;
  sessionId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<PaymentStatusType>;
  student?: Maybe<User>;
};

export type PaymentCreateInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  amountUSD?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  order?: InputMaybe<OrderRelateToOneForCreateInput>;
  receiptId?: InputMaybe<Scalars['String']['input']>;
  sessionId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PaymentStatusType>;
  student?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type PaymentManyRelationFilter = {
  every?: InputMaybe<PaymentWhereInput>;
  none?: InputMaybe<PaymentWhereInput>;
  some?: InputMaybe<PaymentWhereInput>;
};

export type PaymentOrderByInput = {
  amount?: InputMaybe<OrderDirection>;
  amountUSD?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  currency?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  receiptId?: InputMaybe<OrderDirection>;
  sessionId?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
};

export type PaymentRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PaymentWhereUniqueInput>>;
  create?: InputMaybe<Array<PaymentCreateInput>>;
};

export type PaymentRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PaymentWhereUniqueInput>>;
  create?: InputMaybe<Array<PaymentCreateInput>>;
  disconnect?: InputMaybe<Array<PaymentWhereUniqueInput>>;
  set?: InputMaybe<Array<PaymentWhereUniqueInput>>;
};

export type PaymentResponse = {
  __typename?: 'PaymentResponse';
  redirectUrl: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export enum PaymentStatusType {
  Cancelled = 'cancelled',
  Created = 'created',
  Error = 'error',
  Successfully = 'successfully'
}

export type PaymentStatusTypeNullableFilter = {
  equals?: InputMaybe<PaymentStatusType>;
  in?: InputMaybe<Array<PaymentStatusType>>;
  not?: InputMaybe<PaymentStatusTypeNullableFilter>;
  notIn?: InputMaybe<Array<PaymentStatusType>>;
};

export type PaymentUpdateArgs = {
  data: PaymentUpdateInput;
  where: PaymentWhereUniqueInput;
};

export type PaymentUpdateInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  amountUSD?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  order?: InputMaybe<OrderRelateToOneForUpdateInput>;
  receiptId?: InputMaybe<Scalars['String']['input']>;
  sessionId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PaymentStatusType>;
  student?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type PaymentWhereInput = {
  AND?: InputMaybe<Array<PaymentWhereInput>>;
  NOT?: InputMaybe<Array<PaymentWhereInput>>;
  OR?: InputMaybe<Array<PaymentWhereInput>>;
  amount?: InputMaybe<IntNullableFilter>;
  amountUSD?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  currency?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  order?: InputMaybe<OrderWhereInput>;
  receiptId?: InputMaybe<StringFilter>;
  sessionId?: InputMaybe<StringFilter>;
  status?: InputMaybe<PaymentStatusTypeNullableFilter>;
  student?: InputMaybe<UserWhereInput>;
};

export type PaymentWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content?: Maybe<Post_Content_Document>;
  cover?: Maybe<Image>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  statusView?: Maybe<Scalars['String']['output']>;
  tag?: Maybe<Array<Tag>>;
  tagCount?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type PostTagArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  orderBy?: Array<TagOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TagWhereInput;
};


export type PostTagCountArgs = {
  where?: TagWhereInput;
};

export type PostCreateInput = {
  author?: InputMaybe<UserRelateToOneForCreateInput>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  cover?: InputMaybe<ImageRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<TagRelateToManyForCreateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PostOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  statusView?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type PostUpdateArgs = {
  data: PostUpdateInput;
  where: PostWhereUniqueInput;
};

export type PostUpdateInput = {
  author?: InputMaybe<UserRelateToOneForUpdateInput>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  cover?: InputMaybe<ImageRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<TagRelateToManyForUpdateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PostWhereInput = {
  AND?: InputMaybe<Array<PostWhereInput>>;
  NOT?: InputMaybe<Array<PostWhereInput>>;
  OR?: InputMaybe<Array<PostWhereInput>>;
  author?: InputMaybe<UserWhereInput>;
  cover?: InputMaybe<ImageWhereInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  language?: InputMaybe<StringFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  statusView?: InputMaybe<StringFilter>;
  tag?: InputMaybe<TagManyRelationFilter>;
  title?: InputMaybe<StringFilter>;
};

export type PostWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Post_Content_Document = {
  __typename?: 'Post_content_Document';
  document: Scalars['JSON']['output'];
};


export type Post_Content_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type Product = {
  __typename?: 'Product';
  category?: Maybe<Category>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  desc?: Maybe<Product_Desc_Document>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<ImageFieldOutput>;
  language?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  statusView?: Maybe<Scalars['String']['output']>;
  subscriptions?: Maybe<Array<Subscription>>;
  subscriptionsCount?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Tag>>;
  tagsCount?: Maybe<Scalars['Int']['output']>;
};


export type ProductSubscriptionsArgs = {
  cursor?: InputMaybe<SubscriptionWhereUniqueInput>;
  orderBy?: Array<SubscriptionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: SubscriptionWhereInput;
};


export type ProductSubscriptionsCountArgs = {
  where?: SubscriptionWhereInput;
};


export type ProductTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  orderBy?: Array<TagOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TagWhereInput;
};


export type ProductTagsCountArgs = {
  where?: TagWhereInput;
};

export type ProductCreateInput = {
  category?: InputMaybe<CategoryRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  desc?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  subscriptions?: InputMaybe<SubscriptionRelateToManyForCreateInput>;
  tags?: InputMaybe<TagRelateToManyForCreateInput>;
};

export type ProductManyRelationFilter = {
  every?: InputMaybe<ProductWhereInput>;
  none?: InputMaybe<ProductWhereInput>;
  some?: InputMaybe<ProductWhereInput>;
};

export type ProductOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  statusView?: InputMaybe<OrderDirection>;
};

export type ProductRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ProductWhereUniqueInput>>;
  create?: InputMaybe<Array<ProductCreateInput>>;
};

export type ProductRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ProductWhereUniqueInput>>;
  create?: InputMaybe<Array<ProductCreateInput>>;
  disconnect?: InputMaybe<Array<ProductWhereUniqueInput>>;
  set?: InputMaybe<Array<ProductWhereUniqueInput>>;
};

export type ProductReview = {
  __typename?: 'ProductReview';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  desc?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  media?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Product>>;
  productsCount?: Maybe<Scalars['Int']['output']>;
  statusView?: Maybe<Scalars['String']['output']>;
  student?: Maybe<User>;
};


export type ProductReviewProductsArgs = {
  cursor?: InputMaybe<ProductWhereUniqueInput>;
  orderBy?: Array<ProductOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductWhereInput;
};


export type ProductReviewProductsCountArgs = {
  where?: ProductWhereInput;
};

export type ProductReviewCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  desc?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  media?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<ProductRelateToManyForCreateInput>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  student?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type ProductReviewOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  desc?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  media?: InputMaybe<OrderDirection>;
  statusView?: InputMaybe<OrderDirection>;
};

export type ProductReviewUpdateArgs = {
  data: ProductReviewUpdateInput;
  where: ProductReviewWhereUniqueInput;
};

export type ProductReviewUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  desc?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  media?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<ProductRelateToManyForUpdateInput>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  student?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type ProductReviewWhereInput = {
  AND?: InputMaybe<Array<ProductReviewWhereInput>>;
  NOT?: InputMaybe<Array<ProductReviewWhereInput>>;
  OR?: InputMaybe<Array<ProductReviewWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  desc?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  language?: InputMaybe<StringFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  media?: InputMaybe<StringFilter>;
  products?: InputMaybe<ProductManyRelationFilter>;
  statusView?: InputMaybe<StringFilter>;
  student?: InputMaybe<UserWhereInput>;
};

export type ProductReviewWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ProductUpdateArgs = {
  data: ProductUpdateInput;
  where: ProductWhereUniqueInput;
};

export type ProductUpdateInput = {
  category?: InputMaybe<CategoryRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  desc?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  subscriptions?: InputMaybe<SubscriptionRelateToManyForUpdateInput>;
  tags?: InputMaybe<TagRelateToManyForUpdateInput>;
};

export type ProductWhereInput = {
  AND?: InputMaybe<Array<ProductWhereInput>>;
  NOT?: InputMaybe<Array<ProductWhereInput>>;
  OR?: InputMaybe<Array<ProductWhereInput>>;
  category?: InputMaybe<CategoryWhereInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  language?: InputMaybe<StringFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  statusView?: InputMaybe<StringFilter>;
  subscriptions?: InputMaybe<SubscriptionManyRelationFilter>;
  tags?: InputMaybe<TagManyRelationFilter>;
};

export type ProductWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Product_Desc_Document = {
  __typename?: 'Product_desc_Document';
  document: Scalars['JSON']['output'];
};


export type Product_Desc_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type Query = {
  __typename?: 'Query';
  authenticatedItem?: Maybe<AuthenticatedItem>;
  avatarUser?: Maybe<AvatarUser>;
  avatarUsers?: Maybe<Array<AvatarUser>>;
  avatarUsersCount?: Maybe<Scalars['Int']['output']>;
  cart?: Maybe<Cart>;
  cartItem?: Maybe<CartItem>;
  cartItems?: Maybe<Array<CartItem>>;
  cartItemsCount?: Maybe<Scalars['Int']['output']>;
  carts?: Maybe<Array<Cart>>;
  cartsCount?: Maybe<Scalars['Int']['output']>;
  categories?: Maybe<Array<Category>>;
  categoriesCount?: Maybe<Scalars['Int']['output']>;
  category?: Maybe<Category>;
  checkPayment?: Maybe<Payment>;
  client?: Maybe<Client>;
  clients?: Maybe<Array<Client>>;
  clientsCount?: Maybe<Scalars['Int']['output']>;
  currencies?: Maybe<Array<Currency>>;
  currenciesCount?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Currency>;
  direction?: Maybe<Direction>;
  directionGoal?: Maybe<DirectionGoal>;
  directionGoals?: Maybe<Array<DirectionGoal>>;
  directionGoalsCount?: Maybe<Scalars['Int']['output']>;
  directionResult?: Maybe<DirectionResult>;
  directionResults?: Maybe<Array<DirectionResult>>;
  directionResultsCount?: Maybe<Scalars['Int']['output']>;
  directions?: Maybe<Array<Direction>>;
  directionsCount?: Maybe<Scalars['Int']['output']>;
  faq?: Maybe<Faq>;
  faqs?: Maybe<Array<Faq>>;
  faqsCount?: Maybe<Scalars['Int']['output']>;
  getTeacherSchedule: GetTeacherScheduleResponse;
  image?: Maybe<Image>;
  images?: Maybe<Array<Image>>;
  imagesCount?: Maybe<Scalars['Int']['output']>;
  keystone: KeystoneMeta;
  lesson?: Maybe<Lesson>;
  lessonSchedule?: Maybe<LessonSchedule>;
  lessonScheduleItem?: Maybe<LessonScheduleItem>;
  lessonScheduleItems?: Maybe<Array<LessonScheduleItem>>;
  lessonScheduleItemsCount?: Maybe<Scalars['Int']['output']>;
  lessonSchedules?: Maybe<Array<LessonSchedule>>;
  lessonSchedulesCount?: Maybe<Scalars['Int']['output']>;
  lessons?: Maybe<Array<Lesson>>;
  lessonsCount?: Maybe<Scalars['Int']['output']>;
  link?: Maybe<Link>;
  links?: Maybe<Array<Link>>;
  linksCount?: Maybe<Scalars['Int']['output']>;
  mailing?: Maybe<Mailing>;
  mailings?: Maybe<Array<Mailing>>;
  mailingsCount?: Maybe<Scalars['Int']['output']>;
  manager?: Maybe<Manager>;
  managers?: Maybe<Array<Manager>>;
  managersCount?: Maybe<Scalars['Int']['output']>;
  marketing?: Maybe<Marketing>;
  marketings?: Maybe<Array<Marketing>>;
  marketingsCount?: Maybe<Scalars['Int']['output']>;
  nextStudentLesson?: Maybe<Scalars['Object']['output']>;
  order?: Maybe<Order>;
  orders?: Maybe<Array<Order>>;
  ordersCount?: Maybe<Scalars['Int']['output']>;
  page?: Maybe<Page>;
  pages?: Maybe<Array<Page>>;
  pagesCount?: Maybe<Scalars['Int']['output']>;
  payment?: Maybe<Payment>;
  payments?: Maybe<Array<Payment>>;
  paymentsCount?: Maybe<Scalars['Int']['output']>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  postsCount?: Maybe<Scalars['Int']['output']>;
  product?: Maybe<Product>;
  productReview?: Maybe<ProductReview>;
  productReviews?: Maybe<Array<ProductReview>>;
  productReviewsCount?: Maybe<Scalars['Int']['output']>;
  products?: Maybe<Array<Product>>;
  productsCount?: Maybe<Scalars['Int']['output']>;
  service?: Maybe<Service>;
  services?: Maybe<Array<Service>>;
  servicesCount?: Maybe<Scalars['Int']['output']>;
  sourceClient?: Maybe<SourceClient>;
  sourceClients?: Maybe<Array<SourceClient>>;
  sourceClientsCount?: Maybe<Scalars['Int']['output']>;
  subscription?: Maybe<Subscription>;
  subscriptions?: Maybe<Array<Subscription>>;
  subscriptionsCount?: Maybe<Scalars['Int']['output']>;
  tag?: Maybe<Tag>;
  tags?: Maybe<Array<Tag>>;
  tagsCount?: Maybe<Scalars['Int']['output']>;
  unavailableTimesForRecordLesson?: Maybe<Array<Maybe<UnavailableTimesForRecordLessonResponse>>>;
  user?: Maybe<User>;
  userService?: Maybe<UserService>;
  userServices?: Maybe<Array<UserService>>;
  userServicesCount?: Maybe<Scalars['Int']['output']>;
  userSubscription?: Maybe<UserSubscription>;
  userSubscriptions?: Maybe<Array<UserSubscription>>;
  userSubscriptionsCount?: Maybe<Scalars['Int']['output']>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
  workTime?: Maybe<WorkTime>;
  workTimeCutoff?: Maybe<WorkTimeCutoff>;
  workTimeCutoffs?: Maybe<Array<WorkTimeCutoff>>;
  workTimeCutoffsCount?: Maybe<Scalars['Int']['output']>;
  workTimes?: Maybe<Array<WorkTime>>;
  workTimesCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryAvatarUserArgs = {
  where: AvatarUserWhereUniqueInput;
};


export type QueryAvatarUsersArgs = {
  cursor?: InputMaybe<AvatarUserWhereUniqueInput>;
  orderBy?: Array<AvatarUserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: AvatarUserWhereInput;
};


export type QueryAvatarUsersCountArgs = {
  where?: AvatarUserWhereInput;
};


export type QueryCartArgs = {
  where: CartWhereUniqueInput;
};


export type QueryCartItemArgs = {
  where: CartItemWhereUniqueInput;
};


export type QueryCartItemsArgs = {
  cursor?: InputMaybe<CartItemWhereUniqueInput>;
  orderBy?: Array<CartItemOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CartItemWhereInput;
};


export type QueryCartItemsCountArgs = {
  where?: CartItemWhereInput;
};


export type QueryCartsArgs = {
  cursor?: InputMaybe<CartWhereUniqueInput>;
  orderBy?: Array<CartOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CartWhereInput;
};


export type QueryCartsCountArgs = {
  where?: CartWhereInput;
};


export type QueryCategoriesArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  orderBy?: Array<CategoryOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CategoryWhereInput;
};


export type QueryCategoriesCountArgs = {
  where?: CategoryWhereInput;
};


export type QueryCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type QueryCheckPaymentArgs = {
  paymentId: Scalars['String']['input'];
};


export type QueryClientArgs = {
  where: ClientWhereUniqueInput;
};


export type QueryClientsArgs = {
  cursor?: InputMaybe<ClientWhereUniqueInput>;
  orderBy?: Array<ClientOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ClientWhereInput;
};


export type QueryClientsCountArgs = {
  where?: ClientWhereInput;
};


export type QueryCurrenciesArgs = {
  cursor?: InputMaybe<CurrencyWhereUniqueInput>;
  orderBy?: Array<CurrencyOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CurrencyWhereInput;
};


export type QueryCurrenciesCountArgs = {
  where?: CurrencyWhereInput;
};


export type QueryCurrencyArgs = {
  where: CurrencyWhereUniqueInput;
};


export type QueryDirectionArgs = {
  where: DirectionWhereUniqueInput;
};


export type QueryDirectionGoalArgs = {
  where: DirectionGoalWhereUniqueInput;
};


export type QueryDirectionGoalsArgs = {
  cursor?: InputMaybe<DirectionGoalWhereUniqueInput>;
  orderBy?: Array<DirectionGoalOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: DirectionGoalWhereInput;
};


export type QueryDirectionGoalsCountArgs = {
  where?: DirectionGoalWhereInput;
};


export type QueryDirectionResultArgs = {
  where: DirectionResultWhereUniqueInput;
};


export type QueryDirectionResultsArgs = {
  cursor?: InputMaybe<DirectionResultWhereUniqueInput>;
  orderBy?: Array<DirectionResultOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: DirectionResultWhereInput;
};


export type QueryDirectionResultsCountArgs = {
  where?: DirectionResultWhereInput;
};


export type QueryDirectionsArgs = {
  cursor?: InputMaybe<DirectionWhereUniqueInput>;
  orderBy?: Array<DirectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: DirectionWhereInput;
};


export type QueryDirectionsCountArgs = {
  where?: DirectionWhereInput;
};


export type QueryFaqArgs = {
  where: FaqWhereUniqueInput;
};


export type QueryFaqsArgs = {
  cursor?: InputMaybe<FaqWhereUniqueInput>;
  orderBy?: Array<FaqOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: FaqWhereInput;
};


export type QueryFaqsCountArgs = {
  where?: FaqWhereInput;
};


export type QueryGetTeacherScheduleArgs = {
  data: GetTeacherScheduleData;
};


export type QueryImageArgs = {
  where: ImageWhereUniqueInput;
};


export type QueryImagesArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  orderBy?: Array<ImageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ImageWhereInput;
};


export type QueryImagesCountArgs = {
  where?: ImageWhereInput;
};


export type QueryLessonArgs = {
  where: LessonWhereUniqueInput;
};


export type QueryLessonScheduleArgs = {
  where: LessonScheduleWhereUniqueInput;
};


export type QueryLessonScheduleItemArgs = {
  where: LessonScheduleItemWhereUniqueInput;
};


export type QueryLessonScheduleItemsArgs = {
  cursor?: InputMaybe<LessonScheduleItemWhereUniqueInput>;
  orderBy?: Array<LessonScheduleItemOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LessonScheduleItemWhereInput;
};


export type QueryLessonScheduleItemsCountArgs = {
  where?: LessonScheduleItemWhereInput;
};


export type QueryLessonSchedulesArgs = {
  cursor?: InputMaybe<LessonScheduleWhereUniqueInput>;
  orderBy?: Array<LessonScheduleOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LessonScheduleWhereInput;
};


export type QueryLessonSchedulesCountArgs = {
  where?: LessonScheduleWhereInput;
};


export type QueryLessonsArgs = {
  cursor?: InputMaybe<LessonWhereUniqueInput>;
  orderBy?: Array<LessonOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LessonWhereInput;
};


export type QueryLessonsCountArgs = {
  where?: LessonWhereInput;
};


export type QueryLinkArgs = {
  where: LinkWhereUniqueInput;
};


export type QueryLinksArgs = {
  cursor?: InputMaybe<LinkWhereUniqueInput>;
  orderBy?: Array<LinkOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LinkWhereInput;
};


export type QueryLinksCountArgs = {
  where?: LinkWhereInput;
};


export type QueryMailingArgs = {
  where: MailingWhereUniqueInput;
};


export type QueryMailingsArgs = {
  cursor?: InputMaybe<MailingWhereUniqueInput>;
  orderBy?: Array<MailingOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: MailingWhereInput;
};


export type QueryMailingsCountArgs = {
  where?: MailingWhereInput;
};


export type QueryManagerArgs = {
  where: ManagerWhereUniqueInput;
};


export type QueryManagersArgs = {
  cursor?: InputMaybe<ManagerWhereUniqueInput>;
  orderBy?: Array<ManagerOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ManagerWhereInput;
};


export type QueryManagersCountArgs = {
  where?: ManagerWhereInput;
};


export type QueryMarketingArgs = {
  where: MarketingWhereUniqueInput;
};


export type QueryMarketingsArgs = {
  cursor?: InputMaybe<MarketingWhereUniqueInput>;
  orderBy?: Array<MarketingOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: MarketingWhereInput;
};


export type QueryMarketingsCountArgs = {
  where?: MarketingWhereInput;
};


export type QueryNextStudentLessonArgs = {
  studentId: Scalars['ID']['input'];
};


export type QueryOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type QueryOrdersArgs = {
  cursor?: InputMaybe<OrderWhereUniqueInput>;
  orderBy?: Array<OrderOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: OrderWhereInput;
};


export type QueryOrdersCountArgs = {
  where?: OrderWhereInput;
};


export type QueryPageArgs = {
  where: PageWhereUniqueInput;
};


export type QueryPagesArgs = {
  cursor?: InputMaybe<PageWhereUniqueInput>;
  orderBy?: Array<PageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PageWhereInput;
};


export type QueryPagesCountArgs = {
  where?: PageWhereInput;
};


export type QueryPaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type QueryPaymentsArgs = {
  cursor?: InputMaybe<PaymentWhereUniqueInput>;
  orderBy?: Array<PaymentOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PaymentWhereInput;
};


export type QueryPaymentsCountArgs = {
  where?: PaymentWhereInput;
};


export type QueryPostArgs = {
  where: PostWhereUniqueInput;
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  orderBy?: Array<PostOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PostWhereInput;
};


export type QueryPostsCountArgs = {
  where?: PostWhereInput;
};


export type QueryProductArgs = {
  where: ProductWhereUniqueInput;
};


export type QueryProductReviewArgs = {
  where: ProductReviewWhereUniqueInput;
};


export type QueryProductReviewsArgs = {
  cursor?: InputMaybe<ProductReviewWhereUniqueInput>;
  orderBy?: Array<ProductReviewOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductReviewWhereInput;
};


export type QueryProductReviewsCountArgs = {
  where?: ProductReviewWhereInput;
};


export type QueryProductsArgs = {
  cursor?: InputMaybe<ProductWhereUniqueInput>;
  orderBy?: Array<ProductOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductWhereInput;
};


export type QueryProductsCountArgs = {
  where?: ProductWhereInput;
};


export type QueryServiceArgs = {
  where: ServiceWhereUniqueInput;
};


export type QueryServicesArgs = {
  cursor?: InputMaybe<ServiceWhereUniqueInput>;
  orderBy?: Array<ServiceOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ServiceWhereInput;
};


export type QueryServicesCountArgs = {
  where?: ServiceWhereInput;
};


export type QuerySourceClientArgs = {
  where: SourceClientWhereUniqueInput;
};


export type QuerySourceClientsArgs = {
  cursor?: InputMaybe<SourceClientWhereUniqueInput>;
  orderBy?: Array<SourceClientOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: SourceClientWhereInput;
};


export type QuerySourceClientsCountArgs = {
  where?: SourceClientWhereInput;
};


export type QuerySubscriptionArgs = {
  where: SubscriptionWhereUniqueInput;
};


export type QuerySubscriptionsArgs = {
  cursor?: InputMaybe<SubscriptionWhereUniqueInput>;
  orderBy?: Array<SubscriptionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: SubscriptionWhereInput;
};


export type QuerySubscriptionsCountArgs = {
  where?: SubscriptionWhereInput;
};


export type QueryTagArgs = {
  where: TagWhereUniqueInput;
};


export type QueryTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  orderBy?: Array<TagOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TagWhereInput;
};


export type QueryTagsCountArgs = {
  where?: TagWhereInput;
};


export type QueryUnavailableTimesForRecordLessonArgs = {
  data: UnavailableTimesForRecordLessonData;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUserServiceArgs = {
  where: UserServiceWhereUniqueInput;
};


export type QueryUserServicesArgs = {
  cursor?: InputMaybe<UserServiceWhereUniqueInput>;
  orderBy?: Array<UserServiceOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserServiceWhereInput;
};


export type QueryUserServicesCountArgs = {
  where?: UserServiceWhereInput;
};


export type QueryUserSubscriptionArgs = {
  where: UserSubscriptionWhereUniqueInput;
};


export type QueryUserSubscriptionsArgs = {
  cursor?: InputMaybe<UserSubscriptionWhereUniqueInput>;
  orderBy?: Array<UserSubscriptionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserSubscriptionWhereInput;
};


export type QueryUserSubscriptionsCountArgs = {
  where?: UserSubscriptionWhereInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};


export type QueryWorkTimeArgs = {
  where: WorkTimeWhereUniqueInput;
};


export type QueryWorkTimeCutoffArgs = {
  where: WorkTimeCutoffWhereUniqueInput;
};


export type QueryWorkTimeCutoffsArgs = {
  cursor?: InputMaybe<WorkTimeCutoffWhereUniqueInput>;
  orderBy?: Array<WorkTimeCutoffOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: WorkTimeCutoffWhereInput;
};


export type QueryWorkTimeCutoffsCountArgs = {
  where?: WorkTimeCutoffWhereInput;
};


export type QueryWorkTimesArgs = {
  cursor?: InputMaybe<WorkTimeWhereUniqueInput>;
  orderBy?: Array<WorkTimeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: WorkTimeWhereInput;
};


export type QueryWorkTimesCountArgs = {
  where?: WorkTimeWhereInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type RedeemUserMagicAuthTokenFailure = {
  __typename?: 'RedeemUserMagicAuthTokenFailure';
  code: MagicLinkRedemptionErrorCode;
  message: Scalars['String']['output'];
};

export type RedeemUserMagicAuthTokenResult = RedeemUserMagicAuthTokenFailure | RedeemUserMagicAuthTokenSuccess;

export type RedeemUserMagicAuthTokenSuccess = {
  __typename?: 'RedeemUserMagicAuthTokenSuccess';
  item: User;
  token: Scalars['String']['output'];
};

export type Service = {
  __typename?: 'Service';
  categories?: Maybe<Array<Category>>;
  categoriesCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Service_Description_Document>;
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  priceUSD?: Maybe<Scalars['Int']['output']>;
  statusView?: Maybe<Scalars['String']['output']>;
};


export type ServiceCategoriesArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  orderBy?: Array<CategoryOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CategoryWhereInput;
};


export type ServiceCategoriesCountArgs = {
  where?: CategoryWhereInput;
};

export type ServiceCreateInput = {
  categories?: InputMaybe<CategoryRelateToManyForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['JSON']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
};

export type ServiceOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
  statusView?: InputMaybe<OrderDirection>;
};

export type ServiceRelateToOneForCreateInput = {
  connect?: InputMaybe<ServiceWhereUniqueInput>;
  create?: InputMaybe<ServiceCreateInput>;
};

export type ServiceRelateToOneForUpdateInput = {
  connect?: InputMaybe<ServiceWhereUniqueInput>;
  create?: InputMaybe<ServiceCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ServiceUpdateArgs = {
  data: ServiceUpdateInput;
  where: ServiceWhereUniqueInput;
};

export type ServiceUpdateInput = {
  categories?: InputMaybe<CategoryRelateToManyForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['JSON']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
};

export type ServiceWhereInput = {
  AND?: InputMaybe<Array<ServiceWhereInput>>;
  NOT?: InputMaybe<Array<ServiceWhereInput>>;
  OR?: InputMaybe<Array<ServiceWhereInput>>;
  categories?: InputMaybe<CategoryManyRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  language?: InputMaybe<StringFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  price?: InputMaybe<IntNullableFilter>;
  statusView?: InputMaybe<StringFilter>;
};

export type ServiceWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Service_Description_Document = {
  __typename?: 'Service_description_Document';
  document: Scalars['JSON']['output'];
};


export type Service_Description_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type SourceClient = {
  __typename?: 'SourceClient';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<SourceClient>;
};

export type SourceClientCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<SourceClientRelateToOneForCreateInput>;
};

export type SourceClientManyRelationFilter = {
  every?: InputMaybe<SourceClientWhereInput>;
  none?: InputMaybe<SourceClientWhereInput>;
  some?: InputMaybe<SourceClientWhereInput>;
};

export type SourceClientOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type SourceClientRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<SourceClientWhereUniqueInput>>;
  create?: InputMaybe<Array<SourceClientCreateInput>>;
};

export type SourceClientRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<SourceClientWhereUniqueInput>>;
  create?: InputMaybe<Array<SourceClientCreateInput>>;
  disconnect?: InputMaybe<Array<SourceClientWhereUniqueInput>>;
  set?: InputMaybe<Array<SourceClientWhereUniqueInput>>;
};

export type SourceClientRelateToOneForCreateInput = {
  connect?: InputMaybe<SourceClientWhereUniqueInput>;
  create?: InputMaybe<SourceClientCreateInput>;
};

export type SourceClientRelateToOneForUpdateInput = {
  connect?: InputMaybe<SourceClientWhereUniqueInput>;
  create?: InputMaybe<SourceClientCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SourceClientUpdateArgs = {
  data: SourceClientUpdateInput;
  where: SourceClientWhereUniqueInput;
};

export type SourceClientUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<SourceClientRelateToOneForUpdateInput>;
};

export type SourceClientWhereInput = {
  AND?: InputMaybe<Array<SourceClientWhereInput>>;
  NOT?: InputMaybe<Array<SourceClientWhereInput>>;
  OR?: InputMaybe<Array<SourceClientWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  parent?: InputMaybe<SourceClientWhereInput>;
};

export type SourceClientWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  desc?: Maybe<Subscription_Desc_Document>;
  durationLessons?: Maybe<Array<Scalars['Int']['output']>>;
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  period?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  priceUSD?: Maybe<Scalars['Int']['output']>;
  statusView?: Maybe<Scalars['String']['output']>;
  trial?: Maybe<Scalars['Boolean']['output']>;
  unlimited?: Maybe<Scalars['Boolean']['output']>;
  visitCount?: Maybe<Scalars['Int']['output']>;
};

export type SubscriptionCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  desc?: InputMaybe<Scalars['JSON']['input']>;
  durationLessons?: InputMaybe<Array<Scalars['Int']['input']>>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  trial?: InputMaybe<Scalars['Boolean']['input']>;
  unlimited?: InputMaybe<Scalars['Boolean']['input']>;
  visitCount?: InputMaybe<Scalars['Int']['input']>;
};

export type SubscriptionManyRelationFilter = {
  every?: InputMaybe<SubscriptionWhereInput>;
  none?: InputMaybe<SubscriptionWhereInput>;
  some?: InputMaybe<SubscriptionWhereInput>;
};

export type SubscriptionOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  period?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
  statusView?: InputMaybe<OrderDirection>;
  trial?: InputMaybe<OrderDirection>;
  unlimited?: InputMaybe<OrderDirection>;
  visitCount?: InputMaybe<OrderDirection>;
};

export type SubscriptionRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<SubscriptionWhereUniqueInput>>;
  create?: InputMaybe<Array<SubscriptionCreateInput>>;
};

export type SubscriptionRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<SubscriptionWhereUniqueInput>>;
  create?: InputMaybe<Array<SubscriptionCreateInput>>;
  disconnect?: InputMaybe<Array<SubscriptionWhereUniqueInput>>;
  set?: InputMaybe<Array<SubscriptionWhereUniqueInput>>;
};

export type SubscriptionRelateToOneForCreateInput = {
  connect?: InputMaybe<SubscriptionWhereUniqueInput>;
  create?: InputMaybe<SubscriptionCreateInput>;
};

export type SubscriptionRelateToOneForUpdateInput = {
  connect?: InputMaybe<SubscriptionWhereUniqueInput>;
  create?: InputMaybe<SubscriptionCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SubscriptionUpdateArgs = {
  data: SubscriptionUpdateInput;
  where: SubscriptionWhereUniqueInput;
};

export type SubscriptionUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  desc?: InputMaybe<Scalars['JSON']['input']>;
  durationLessons?: InputMaybe<Array<Scalars['Int']['input']>>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  trial?: InputMaybe<Scalars['Boolean']['input']>;
  unlimited?: InputMaybe<Scalars['Boolean']['input']>;
  visitCount?: InputMaybe<Scalars['Int']['input']>;
};

export type SubscriptionWhereInput = {
  AND?: InputMaybe<Array<SubscriptionWhereInput>>;
  NOT?: InputMaybe<Array<SubscriptionWhereInput>>;
  OR?: InputMaybe<Array<SubscriptionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  language?: InputMaybe<StringFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  period?: InputMaybe<IntNullableFilter>;
  price?: InputMaybe<IntFilter>;
  statusView?: InputMaybe<StringFilter>;
  trial?: InputMaybe<BooleanFilter>;
  unlimited?: InputMaybe<BooleanFilter>;
  visitCount?: InputMaybe<IntNullableFilter>;
};

export type SubscriptionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Subscription_Desc_Document = {
  __typename?: 'Subscription_desc_Document';
  document: Scalars['JSON']['output'];
};


export type Subscription_Desc_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type TagCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type TagManyRelationFilter = {
  every?: InputMaybe<TagWhereInput>;
  none?: InputMaybe<TagWhereInput>;
  some?: InputMaybe<TagWhereInput>;
};

export type TagOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type TagRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  create?: InputMaybe<Array<TagCreateInput>>;
};

export type TagRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  create?: InputMaybe<Array<TagCreateInput>>;
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>;
  set?: InputMaybe<Array<TagWhereUniqueInput>>;
};

export type TagUpdateArgs = {
  data: TagUpdateInput;
  where: TagWhereUniqueInput;
};

export type TagUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type TagWhereInput = {
  AND?: InputMaybe<Array<TagWhereInput>>;
  NOT?: InputMaybe<Array<TagWhereInput>>;
  OR?: InputMaybe<Array<TagWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  language?: InputMaybe<StringFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
};

export type TagWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type UnavailableTimesForRecordLessonData = {
  date: Scalars['String']['input'];
  duration?: InputMaybe<Scalars['Int']['input']>;
  teacherId: Scalars['ID']['input'];
};

export type UnavailableTimesForRecordLessonResponse = {
  __typename?: 'UnavailableTimesForRecordLessonResponse';
  end: Scalars['DateTime']['output'];
  start: Scalars['DateTime']['output'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<AvatarUser>;
  cart?: Maybe<Cart>;
  client?: Maybe<Client>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  linkForUser?: Maybe<Scalars['String']['output']>;
  magicAuthIssuedAt?: Maybe<Scalars['DateTime']['output']>;
  magicAuthRedeemedAt?: Maybe<Scalars['DateTime']['output']>;
  magicAuthToken?: Maybe<PasswordState>;
  magicLinkToken?: Maybe<Scalars['String']['output']>;
  manager?: Maybe<Manager>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<PasswordState>;
  role?: Maybe<UserRoleType>;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String']['output'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String']['output'];
};

export type UserCreateInput = {
  avatar?: InputMaybe<AvatarUserRelateToOneForCreateInput>;
  cart?: InputMaybe<CartRelateToOneForCreateInput>;
  client?: InputMaybe<ClientRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  magicAuthIssuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  magicAuthRedeemedAt?: InputMaybe<Scalars['DateTime']['input']>;
  magicAuthToken?: InputMaybe<Scalars['String']['input']>;
  magicLinkToken?: InputMaybe<Scalars['String']['input']>;
  manager?: InputMaybe<ManagerRelateToOneForCreateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRoleType>;
};

export type UserManyRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  magicAuthIssuedAt?: InputMaybe<OrderDirection>;
  magicAuthRedeemedAt?: InputMaybe<OrderDirection>;
  magicLinkToken?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  role?: InputMaybe<OrderDirection>;
};

export type UserRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
};

export type UserRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum UserRoleType {
  Admin = 'admin',
  Manager = 'manager',
  Student = 'student',
  Teacher = 'teacher'
}

export type UserRoleTypeNullableFilter = {
  equals?: InputMaybe<UserRoleType>;
  in?: InputMaybe<Array<UserRoleType>>;
  not?: InputMaybe<UserRoleTypeNullableFilter>;
  notIn?: InputMaybe<Array<UserRoleType>>;
};

export type UserService = {
  __typename?: 'UserService';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  manager?: Maybe<User>;
  name?: Maybe<Scalars['String']['output']>;
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  student?: Maybe<User>;
};

export type UserServiceCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  manager?: InputMaybe<UserRelateToOneForCreateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  originalPrice?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  student?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type UserServiceManyRelationFilter = {
  every?: InputMaybe<UserServiceWhereInput>;
  none?: InputMaybe<UserServiceWhereInput>;
  some?: InputMaybe<UserServiceWhereInput>;
};

export type UserServiceOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  originalPrice?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
};

export type UserServiceRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UserServiceWhereUniqueInput>>;
  create?: InputMaybe<Array<UserServiceCreateInput>>;
};

export type UserServiceRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UserServiceWhereUniqueInput>>;
  create?: InputMaybe<Array<UserServiceCreateInput>>;
  disconnect?: InputMaybe<Array<UserServiceWhereUniqueInput>>;
  set?: InputMaybe<Array<UserServiceWhereUniqueInput>>;
};

export type UserServiceUpdateArgs = {
  data: UserServiceUpdateInput;
  where: UserServiceWhereUniqueInput;
};

export type UserServiceUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  manager?: InputMaybe<UserRelateToOneForUpdateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  originalPrice?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  student?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type UserServiceWhereInput = {
  AND?: InputMaybe<Array<UserServiceWhereInput>>;
  NOT?: InputMaybe<Array<UserServiceWhereInput>>;
  OR?: InputMaybe<Array<UserServiceWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  manager?: InputMaybe<UserWhereInput>;
  name?: InputMaybe<StringFilter>;
  originalPrice?: InputMaybe<IntNullableFilter>;
  price?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<StringFilter>;
  student?: InputMaybe<UserWhereInput>;
};

export type UserServiceWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type UserSubscription = {
  __typename?: 'UserSubscription';
  beginDate?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  customVisited?: Maybe<Scalars['Int']['output']>;
  durationLessons?: Maybe<Array<Scalars['Int']['output']>>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  lastCount?: Maybe<Scalars['Int']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  lessons?: Maybe<Array<Lesson>>;
  lessonsCount?: Maybe<Scalars['Int']['output']>;
  linkForUser?: Maybe<Scalars['String']['output']>;
  manager?: Maybe<User>;
  name?: Maybe<Scalars['String']['output']>;
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  student?: Maybe<User>;
  totalVisited?: Maybe<Scalars['Int']['output']>;
  trial?: Maybe<Scalars['Boolean']['output']>;
  unlimited?: Maybe<Scalars['Boolean']['output']>;
  visitCount?: Maybe<Scalars['Int']['output']>;
};


export type UserSubscriptionLessonsArgs = {
  cursor?: InputMaybe<LessonWhereUniqueInput>;
  orderBy?: Array<LessonOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LessonWhereInput;
};


export type UserSubscriptionLessonsCountArgs = {
  where?: LessonWhereInput;
};

export type UserSubscriptionCreateInput = {
  beginDate?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customVisited?: InputMaybe<Scalars['Int']['input']>;
  durationLessons?: InputMaybe<Array<Scalars['Int']['input']>>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  lessons?: InputMaybe<LessonRelateToManyForCreateInput>;
  manager?: InputMaybe<UserRelateToOneForCreateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  originalPrice?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  student?: InputMaybe<UserRelateToOneForCreateInput>;
  trial?: InputMaybe<Scalars['Boolean']['input']>;
  unlimited?: InputMaybe<Scalars['Boolean']['input']>;
  visitCount?: InputMaybe<Scalars['Int']['input']>;
};

export type UserSubscriptionManyRelationFilter = {
  every?: InputMaybe<UserSubscriptionWhereInput>;
  none?: InputMaybe<UserSubscriptionWhereInput>;
  some?: InputMaybe<UserSubscriptionWhereInput>;
};

export type UserSubscriptionOrderByInput = {
  beginDate?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  customVisited?: InputMaybe<OrderDirection>;
  endDate?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  originalPrice?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  trial?: InputMaybe<OrderDirection>;
  unlimited?: InputMaybe<OrderDirection>;
  visitCount?: InputMaybe<OrderDirection>;
};

export type UserSubscriptionRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UserSubscriptionWhereUniqueInput>>;
  create?: InputMaybe<Array<UserSubscriptionCreateInput>>;
};

export type UserSubscriptionRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UserSubscriptionWhereUniqueInput>>;
  create?: InputMaybe<Array<UserSubscriptionCreateInput>>;
  disconnect?: InputMaybe<Array<UserSubscriptionWhereUniqueInput>>;
  set?: InputMaybe<Array<UserSubscriptionWhereUniqueInput>>;
};

export type UserSubscriptionUpdateArgs = {
  data: UserSubscriptionUpdateInput;
  where: UserSubscriptionWhereUniqueInput;
};

export type UserSubscriptionUpdateInput = {
  beginDate?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customVisited?: InputMaybe<Scalars['Int']['input']>;
  durationLessons?: InputMaybe<Array<Scalars['Int']['input']>>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  lessons?: InputMaybe<LessonRelateToManyForUpdateInput>;
  manager?: InputMaybe<UserRelateToOneForUpdateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  originalPrice?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  student?: InputMaybe<UserRelateToOneForUpdateInput>;
  trial?: InputMaybe<Scalars['Boolean']['input']>;
  unlimited?: InputMaybe<Scalars['Boolean']['input']>;
  visitCount?: InputMaybe<Scalars['Int']['input']>;
};

export type UserSubscriptionWhereInput = {
  AND?: InputMaybe<Array<UserSubscriptionWhereInput>>;
  NOT?: InputMaybe<Array<UserSubscriptionWhereInput>>;
  OR?: InputMaybe<Array<UserSubscriptionWhereInput>>;
  beginDate?: InputMaybe<DateTimeNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  customVisited?: InputMaybe<IntNullableFilter>;
  endDate?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  lessons?: InputMaybe<LessonManyRelationFilter>;
  manager?: InputMaybe<UserWhereInput>;
  name?: InputMaybe<StringFilter>;
  originalPrice?: InputMaybe<IntNullableFilter>;
  price?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<StringFilter>;
  student?: InputMaybe<UserWhereInput>;
  trial?: InputMaybe<BooleanFilter>;
  unlimited?: InputMaybe<BooleanFilter>;
  visitCount?: InputMaybe<IntNullableFilter>;
};

export type UserSubscriptionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  avatar?: InputMaybe<AvatarUserRelateToOneForUpdateInput>;
  cart?: InputMaybe<CartRelateToOneForUpdateInput>;
  client?: InputMaybe<ClientRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  magicAuthIssuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  magicAuthRedeemedAt?: InputMaybe<Scalars['DateTime']['input']>;
  magicAuthToken?: InputMaybe<Scalars['String']['input']>;
  magicLinkToken?: InputMaybe<Scalars['String']['input']>;
  manager?: InputMaybe<ManagerRelateToOneForUpdateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRoleType>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  avatar?: InputMaybe<AvatarUserWhereInput>;
  cart?: InputMaybe<CartWhereInput>;
  client?: InputMaybe<ClientWhereInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  language?: InputMaybe<StringFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  magicAuthIssuedAt?: InputMaybe<DateTimeNullableFilter>;
  magicAuthRedeemedAt?: InputMaybe<DateTimeNullableFilter>;
  magicAuthToken?: InputMaybe<PasswordFilter>;
  magicLinkToken?: InputMaybe<StringFilter>;
  manager?: InputMaybe<ManagerWhereInput>;
  name?: InputMaybe<StringFilter>;
  password?: InputMaybe<PasswordFilter>;
  role?: InputMaybe<UserRoleTypeNullableFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type WorkTime = {
  __typename?: 'WorkTime';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dayOfWeek?: Maybe<Scalars['Int']['output']>;
  endTime?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isDayOff?: Maybe<Scalars['Boolean']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  manager?: Maybe<Manager>;
  startTime?: Maybe<Scalars['String']['output']>;
};

export type WorkTimeCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  isDayOff?: InputMaybe<Scalars['Boolean']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  manager?: InputMaybe<ManagerRelateToOneForCreateInput>;
  startTime?: InputMaybe<Scalars['String']['input']>;
};

export type WorkTimeCutoff = {
  __typename?: 'WorkTimeCutoff';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  lastModification?: Maybe<Scalars['DateTime']['output']>;
  manager?: Maybe<Manager>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  statusView?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  uid?: Maybe<Scalars['String']['output']>;
};

export type WorkTimeCutoffCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  manager?: InputMaybe<ManagerRelateToOneForCreateInput>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type WorkTimeCutoffManyRelationFilter = {
  every?: InputMaybe<WorkTimeCutoffWhereInput>;
  none?: InputMaybe<WorkTimeCutoffWhereInput>;
  some?: InputMaybe<WorkTimeCutoffWhereInput>;
};

export type WorkTimeCutoffOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  endTime?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  startTime?: InputMaybe<OrderDirection>;
  statusView?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
  uid?: InputMaybe<OrderDirection>;
};

export type WorkTimeCutoffRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<WorkTimeCutoffWhereUniqueInput>>;
  create?: InputMaybe<Array<WorkTimeCutoffCreateInput>>;
};

export type WorkTimeCutoffRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<WorkTimeCutoffWhereUniqueInput>>;
  create?: InputMaybe<Array<WorkTimeCutoffCreateInput>>;
  disconnect?: InputMaybe<Array<WorkTimeCutoffWhereUniqueInput>>;
  set?: InputMaybe<Array<WorkTimeCutoffWhereUniqueInput>>;
};

export type WorkTimeCutoffUpdateArgs = {
  data: WorkTimeCutoffUpdateInput;
  where: WorkTimeCutoffWhereUniqueInput;
};

export type WorkTimeCutoffUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  manager?: InputMaybe<ManagerRelateToOneForUpdateInput>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  statusView?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type WorkTimeCutoffWhereInput = {
  AND?: InputMaybe<Array<WorkTimeCutoffWhereInput>>;
  NOT?: InputMaybe<Array<WorkTimeCutoffWhereInput>>;
  OR?: InputMaybe<Array<WorkTimeCutoffWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  endTime?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  manager?: InputMaybe<ManagerWhereInput>;
  startTime?: InputMaybe<DateTimeFilter>;
  statusView?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  uid?: InputMaybe<StringFilter>;
};

export type WorkTimeCutoffWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type WorkTimeManyRelationFilter = {
  every?: InputMaybe<WorkTimeWhereInput>;
  none?: InputMaybe<WorkTimeWhereInput>;
  some?: InputMaybe<WorkTimeWhereInput>;
};

export type WorkTimeOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  dayOfWeek?: InputMaybe<OrderDirection>;
  endTime?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isDayOff?: InputMaybe<OrderDirection>;
  lastModification?: InputMaybe<OrderDirection>;
  startTime?: InputMaybe<OrderDirection>;
};

export type WorkTimeRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<WorkTimeWhereUniqueInput>>;
  create?: InputMaybe<Array<WorkTimeCreateInput>>;
};

export type WorkTimeRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<WorkTimeWhereUniqueInput>>;
  create?: InputMaybe<Array<WorkTimeCreateInput>>;
  disconnect?: InputMaybe<Array<WorkTimeWhereUniqueInput>>;
  set?: InputMaybe<Array<WorkTimeWhereUniqueInput>>;
};

export type WorkTimeUpdateArgs = {
  data: WorkTimeUpdateInput;
  where: WorkTimeWhereUniqueInput;
};

export type WorkTimeUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  isDayOff?: InputMaybe<Scalars['Boolean']['input']>;
  lastModification?: InputMaybe<Scalars['DateTime']['input']>;
  manager?: InputMaybe<ManagerRelateToOneForUpdateInput>;
  startTime?: InputMaybe<Scalars['String']['input']>;
};

export type WorkTimeWhereInput = {
  AND?: InputMaybe<Array<WorkTimeWhereInput>>;
  NOT?: InputMaybe<Array<WorkTimeWhereInput>>;
  OR?: InputMaybe<Array<WorkTimeWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  dayOfWeek?: InputMaybe<IntFilter>;
  endTime?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  isDayOff?: InputMaybe<BooleanFilter>;
  lastModification?: InputMaybe<DateTimeFilter>;
  manager?: InputMaybe<ManagerWhereInput>;
  startTime?: InputMaybe<StringFilter>;
};

export type WorkTimeWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};
