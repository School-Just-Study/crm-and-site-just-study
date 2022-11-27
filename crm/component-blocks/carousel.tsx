/** @jsxRuntime classic */
/** @jsx jsx */

import { Box, jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';
import { imageForDocument } from './image/imageForDocument';
import React from 'react';
import { gql, useQuery } from '@keystone-6/core/admin-ui/apollo';

const findImage = gql`
    query ($id: ID!) {
        image(where: { id: $id }) {
            id
            image {
                url
            }
        }
    }
`;

export const carousel = component({
    label: 'Carousel',
    preview: function Preview(props) {
        return (
            <NotEditable>
                <div
                    css={{
                        overflowY: 'scroll',
                        display: 'flex',
                        scrollSnapType: 'y mandatory'
                    }}>
                    {props.fields.items.elements.map((item) => {
                        const { data } = useQuery(findImage, { variables: { id: item?.fields?.image?.value?.id } });
                        return (
                            <Box
                                key={item.key}
                                margin="xsmall"
                                css={{
                                    minWidth: '61.8%',
                                    scrollSnapAlign: 'center',
                                    scrollSnapStop: 'always',
                                    margin: 4,
                                    padding: 8,
                                    boxSizing: 'border-box',
                                    borderRadius: 6,
                                    background: '#eff3f6'
                                }}>
                                {data && (
                                    <img
                                        role="presentation"
                                        src={data?.image.image.url}
                                        css={{
                                            objectFit: 'cover',
                                            objectPosition: 'center center',
                                            height: 240,
                                            width: '100%',
                                            borderRadius: 4
                                        }}
                                    />
                                )}
                                <h1
                                    css={{
                                        '&&': {
                                            fontSize: '1.25rem',
                                            lineHeight: 'unset',
                                            marginTop: 8
                                        }
                                    }}>
                                    {item.fields.title.value}
                                </h1>
                            </Box>
                        );
                    })}
                </div>
            </NotEditable>
        );
    },
    schema: {
        items: fields.array(
            fields.object({
                title: fields.text({ label: 'Title' }),
                image: imageForDocument({
                    listKey: 'Image'
                })
            })
        )
    }
});
