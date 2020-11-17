import React from 'react'
import {Formik, Form} from 'formik';
import {  Box, Button } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router";
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';

interface registerProps {

}




export const Register: React.FC<registerProps> = ({}) => {
        const router= useRouter();
        const [,register] = useRegisterMutation();
        return (

            <Wrapper variant='small'>
            <Formik 
            initialValues={{email: '' ,username: "", password: ""}} 
            onSubmit={async (values, {setErrors}) => {
                //console.log(values);
                const response = await register({options: values});
                //debug
                console.log(response);
                if (response.data?.register.errors) {
                  setErrors( 
                      toErrorMap(response.data.register.errors ));
                  } else if (response.data?.register.user ) {
                      //works 
                      //go back to home page
                      router.push('/')
                  }

            }}
            >
                {({ isSubmitting}) => (
                <Form>
                   <InputField 
                    name='username' 
                    placeholder='username' 
                    label='Username'
                />
                <Box mt={4}>
                    <InputField name="email" placeholder="email" label="Email" />
                </Box>
                <Box mt={4}>
                <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type='password'
                />
                </Box>
                <Button mt={4} type="submit" isLoading={isSubmitting} variantColor='teal'>register</Button>


                </Form>
                )}

                
            </Formik>
            </Wrapper>

        );
};

export default withUrqlClient(createUrqlClient)(Register);