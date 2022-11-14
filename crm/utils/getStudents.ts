import { ServerConfig } from '@keystone-6/core/dist/declarations/src/types/config';
import { Roles } from '../enums/roles.enum';

export const getStudents: ServerConfig<any>['extendExpressApp'] = (
    app,
    createContext
) => {
    app.get('/api/students', async (req, res) => {
        console.info(new Date(), 'get students');

        const context = await createContext(req, res);

        const users = await context.query.User.findMany({
            where: { role: { equals: Roles.Student } },
            query: `id name email language client { statusClient } avatar { image { url } }`
        });

        res.send(users);
        res.end();
    });
};
