import { Request, Response } from 'express';
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales

import dotenv from 'dotenv';
dotenv.config();
const MERCADOPAGO_TOKEN: string = process.env.MERCADOPAGO_TOKEN || '';
const FRONT_URL: string = process.env.FRONT_URL || '';
const client = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_TOKEN
});

export const paymentOrder = async (req: Request, res: Response) => {
  const body = {
    items: [
      {
        id: req.body.sellerId,
        title: req.body.title,
        unit_price: Number(req.body.unit_price),
        currency_id: req.body.currency_id,
        quantity: Number(req.body.quantity)
      }
    ],
    back_urls: {
      success: `${FRONT_URL}/${req.body.sellerId}/?service=${req.body.title}&price=${req.body.unit_price}`,
      failure: `${FRONT_URL}/${req.body.sellerId}`,
      pending: ''
    },
    auto_return: 'approved'
  };
  try {
    const preference = await new Preference(client).create({ body });
    return res.status(200).json({ preference });
    // const result = apreference.create({
    //   items: [
    //     {
    //       title: req.body.title,
    //       unit_price: Number(req.body.unit_price),
    //       currency_id: req.body.currency_id,
    //       quantity: Number(req.body.quantity)
    //     }
    //   ],

    //   back_urls: {
    //     success: `${FRONT_URL}/${req.body.sellerId}/?service=${req.body.title}&price=${req.body.unit_price}`,
    //     failure: `${FRONT_URL}/${req.body.sellerId}`,
    //     pending: ''
    //   },
    //   auto_return: 'approved'
    // });
    // return res.status(200).json(result.body);
  } catch (error) {
    return res.status(500).json({ error: 'Hubo un error' });
  }
};
