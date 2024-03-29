import { gql } from '@apollo/client';

export const QUERY_TRIAL_LESSON = gql`
    query {
        subscriptions(where: { trial: { equals: true }, statusView: { equals: "show" } }) {
            id
            name
            desc {
                document(hydrateRelationships: true)
            }
            price
            priceUSD
            trial
        }
    }
`;
