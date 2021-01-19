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

export type CityPartsFragment = (
  { __typename?: 'City' }
  & Pick<City, 'id' | 'name' | 'district' | 'voivodeship' | 'latitude' | 'longitude'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'icon'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'isVerified' | 'isSeller'>
    & { city?: Maybe<(
      { __typename?: 'City' }
      & CityPartsFragment
    )> }
  ) }
);

export type SearchCityQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchCityQuery = (
  { __typename?: 'Query' }
  & { searchCity: Array<(
    { __typename?: 'City' }
    & CityPartsFragment
  )> }
);

export const CityPartsFragmentDoc = gql`
    fragment CityParts on City {
  id
  name
  district
  voivodeship
  latitude
  longitude
}
    `;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CategoriesDocument = gql`
    query Categories {
  categories {
    id
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
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    firstName
    isVerified
    isSeller
    city {
      ...CityParts
    }
  }
}
    ${CityPartsFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SearchCityDocument = gql`
    query SearchCity($query: String!) {
  searchCity(query: $query) {
    ...CityParts
  }
}
    ${CityPartsFragmentDoc}`;

/**
 * __useSearchCityQuery__
 *
 * To run a query within a React component, call `useSearchCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCityQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchCityQuery(baseOptions: Apollo.QueryHookOptions<SearchCityQuery, SearchCityQueryVariables>) {
        return Apollo.useQuery<SearchCityQuery, SearchCityQueryVariables>(SearchCityDocument, baseOptions);
      }
export function useSearchCityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCityQuery, SearchCityQueryVariables>) {
          return Apollo.useLazyQuery<SearchCityQuery, SearchCityQueryVariables>(SearchCityDocument, baseOptions);
        }
export type SearchCityQueryHookResult = ReturnType<typeof useSearchCityQuery>;
export type SearchCityLazyQueryHookResult = ReturnType<typeof useSearchCityLazyQuery>;
export type SearchCityQueryResult = Apollo.QueryResult<SearchCityQuery, SearchCityQueryVariables>;