import { ServerConfig } from '@keystone-6/core/dist/declarations/src/types/config';
import fetch from 'node-fetch';

const convert = require('xml-js');

export const updateCurrency: ServerConfig<any>['extendExpressApp'] = (app, createContext) => {
    app.get('/api/update-currency', async (req, res) => {
        console.info(new Date(), 'update currency');
        const context = await createContext(req, res);

        const response = await fetch('https://www.cbr.ru/scripts/XML_daily.asp');

        const result1 = convert.xml2json(await response.text(), { compact: true, spaces: 4 });
        const currencies = JSON.parse(result1).ValCurs.Valute;

        for (const currency of currencies) {
            const value = Math.round(+currency.Value._text.replace(/,/g, '.'));
            const charCode = currency.CharCode._text;
            const nominal = +currency.Nominal._text;

            const check = await context.query.Currency.findOne({
                where: { charCode }
            });

            if (check) {
                await context.query.Currency.updateOne({
                    where: { charCode },
                    data: {
                        value,
                        charCode,
                        nominal
                    }
                });
            } else {
                await context.query.Currency.createOne({
                    data: {
                        value,
                        charCode,
                        nominal
                    }
                });
            }
        }

        res.send(currencies);
    });
};
