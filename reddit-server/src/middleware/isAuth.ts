import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";


//runs before resolver, gives access to args, context, info, and root
export const isAuth: MiddlewareFn<MyContext> = ({context}, next) => {
    if (!context.req.session.userId) {
        throw new Error('not authenticated');
    }

    return next();

};