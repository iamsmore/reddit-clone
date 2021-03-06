import { Box, Button, Flex, Link } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import NextLink from 'next/link';



export const ChangePassword: NextPage<{token: string}>= () => {
    const router = useRouter();
    const [,changePassword]  = useChangePasswordMutation();
    const [tokenError,setTokenError]  = useState('');

        return (
        <Wrapper variant='small'>
        <Formik 
        initialValues={{ newPassword: ''}}
        onSubmit={async (values, {setErrors}) => {

            const response = await changePassword({
                newPassword: values.newPassword,
                token: typeof router.query.token === 'string' ? router.query.token : "",
            });
            if (response.data?.changePassword.errors) {

                const errorMap = toErrorMap(response.data.changePassword.errors );
                // check for token error
                if ('token' in errorMap) {
                    setTokenError(errorMap.token);
                }
                setErrors(errorMap);

              } else if (response.data?.changePassword.user ) {
                  //works 
                  //go back to home page
                  router.push('/')
              }

        }}
        >
            {({ isSubmitting}) => (
            <Form>
               <InputField 
                name='newPassword' 
                placeholder='new password' 
                label="New Password"
                type='password'
            />
            
            {tokenError  ? (
                <Flex>
            <Box mr={4} color='red'>{tokenError}</Box>
            <NextLink href='/forgot-password'>
            <Link>click here to get a new token</Link>
            </NextLink>
            </Flex>
            ) : null}
           
            <Button mt={4} type="submit" isLoading={isSubmitting} variantColor='teal'>Change Password</Button>
            </Form>
            )}

            
        </Formik>
        </Wrapper>
        );
            };


export default withUrqlClient(createUrqlClient, {ssr:false})(ChangePassword);