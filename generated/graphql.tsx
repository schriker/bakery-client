import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
  icon: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type ProductIngredient = {
  __typename?: 'ProductIngredient';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  count: Scalars['Int'];
  user: User;
  product: Product;
  ingredient: Ingredient;
};

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Float'];
  unit: Scalars['String'];
  user: User;
  productIngredients?: Maybe<Array<ProductIngredient>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Photo = {
  __typename?: 'Photo';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  isVerified: Scalars['Boolean'];
  isSeller: Scalars['Boolean'];
  city?: Maybe<City>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  text: Scalars['String'];
  readed: Scalars['Boolean'];
  user: User;
  conversation: Conversation;
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  messages: Array<Message>;
  product: Product;
  participants: Array<User>;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  price: Scalars['Float'];
  count: Scalars['Int'];
  isPublished: Scalars['Boolean'];
  delivery: Scalars['Boolean'];
  shipping: Scalars['Boolean'];
  pickup: Scalars['Boolean'];
  user: User;
  category: Category;
  city: City;
  productIngredients?: Maybe<Array<ProductIngredient>>;
  conversations?: Maybe<Array<Conversation>>;
  photos?: Maybe<Array<Photo>>;
};

export type City = {
  __typename?: 'City';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  district: Scalars['String'];
  voivodeship: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  searchCity: Array<City>;
  ingredients: Array<Ingredient>;
  products: Array<Product>;
  getUserProducts: Array<Product>;
  getUserMessages: Array<Message>;
  getConversation: Conversation;
  categories: Array<Category>;
};


export type QuerySearchCityArgs = {
  query: Scalars['String'];
};


export type QueryProductsArgs = {
  limit: Scalars['Int'];
  currentPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<ProductsFilterType>;
  order?: Maybe<ProductsOrderType>;
};


export type QueryGetUserProductsArgs = {
  limit: Scalars['Int'];
  currentPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<ProductsFilterType>;
  order?: Maybe<ProductsOrderType>;
};


export type QueryGetConversationArgs = {
  id: Scalars['Int'];
};

export type ProductsFilterType = {
  city?: Maybe<Scalars['Int']>;
  user?: Maybe<Scalars['Int']>;
};

export type ProductsOrderType = {
  createdAt?: Maybe<OrderEnum>;
  price?: Maybe<OrderEnum>;
  isPublished?: Maybe<OrderEnum>;
};

export enum OrderEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  createSeller: User;
  login: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  emailVerification: Scalars['Boolean'];
  createIngredient: Ingredient;
  updateIngredient: Ingredient;
  deleteIngredient: Scalars['Boolean'];
  createProduct: Product;
  updateProduct: Product;
  deleteProduct: Scalars['Boolean'];
  deletePhoto: Scalars['Boolean'];
  createProductIngredient: ProductIngredient;
  updateProductIngredient: ProductIngredient;
  deleteProductIngredient: Scalars['Boolean'];
  createConversation: Scalars['Boolean'];
  createMessage: Scalars['Boolean'];
  readMessage: Scalars['Boolean'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
};


export type MutationCreateSellerArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  city: Scalars['Float'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationEmailVerificationArgs = {
  token: Scalars['String'];
};


export type MutationCreateIngredientArgs = {
  name: Scalars['String'];
  price: Scalars['Float'];
  unit: Scalars['String'];
};


export type MutationUpdateIngredientArgs = {
  name: Scalars['String'];
  price: Scalars['Float'];
  unit: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteIngredientArgs = {
  id: Array<Scalars['Int']>;
};


export type MutationCreateProductArgs = {
  name: Scalars['String'];
  price: Scalars['Float'];
  count: Scalars['Float'];
  isPublished?: Maybe<Scalars['Boolean']>;
  delivery?: Maybe<Scalars['Boolean']>;
  shipping?: Maybe<Scalars['Boolean']>;
  pickup?: Maybe<Scalars['Boolean']>;
  photos?: Maybe<Array<Scalars['Int']>>;
};


export type MutationUpdateProductArgs = {
  name: Scalars['String'];
  price: Scalars['Float'];
  count: Scalars['Float'];
  isPublished?: Maybe<Scalars['Boolean']>;
  delivery?: Maybe<Scalars['Boolean']>;
  shipping?: Maybe<Scalars['Boolean']>;
  pickup?: Maybe<Scalars['Boolean']>;
  photos?: Maybe<Array<Scalars['Int']>>;
  id: Scalars['Int'];
};


export type MutationDeleteProductArgs = {
  id: Array<Scalars['Int']>;
};


export type MutationDeletePhotoArgs = {
  id: Array<Scalars['Int']>;
};


export type MutationCreateProductIngredientArgs = {
  count: Scalars['Float'];
  product: Scalars['Float'];
  ingredient: Scalars['Float'];
};


export type MutationUpdateProductIngredientArgs = {
  count: Scalars['Float'];
  product: Scalars['Float'];
  ingredient: Scalars['Float'];
  id: Scalars['Int'];
};


export type MutationDeleteProductIngredientArgs = {
  id: Array<Scalars['Int']>;
};


export type MutationCreateConversationArgs = {
  text: Scalars['String'];
  productId: Scalars['Int'];
};


export type MutationCreateMessageArgs = {
  text: Scalars['String'];
  conversation: Scalars['Int'];
};


export type MutationReadMessageArgs = {
  id: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded: Message;
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'name' | 'icon'>
  )> }
);


export const CategoriesDocument = gql`
    query Categories {
  categories {
    name
    icon
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;