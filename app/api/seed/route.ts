import { db, products } from 'lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    message: 'Uncomment to seed data after DB is set up.'
  });

  // await db.insert(products).values([
  //   {
  //     id: 1,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/smartphone-gaPvyZW6aww0IhD3dOpaU6gBGILtcJ.webp',
  //     name: 'Bike Pro Max',
  //     description: 'The ultimate mountain bike for the most demanding trails.',
  //     rating: '4.5',
  //     price: '999.00',
  //     type: 'mountain bike',
  //     status: 'active',
  //     quantity: 150,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 2,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/earbuds-3rew4JGdIK81KNlR8Edr8NBBhFTOtX.webp',
  //     name: 'Cycling Helmet Pro',
  //     description: 'Stay safe and stylish with the latest in cycling helmets.',
  //     rating: '4.8',
  //     price: '199.00',
  //     status: 'active',
  //     type: 'road bike',
  //     quantity: 300,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 3,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/home-iTeNnmKSMnrykOS9IYyJvnLFgap7Vw.webp',
  //     name: 'Smart Bike Lock',
  //     description: 'Secure your bike with the latest in smart lock technology.',
  //     status: 'active',
  //     type: 'racing bike',
  //     rating: '4.2',
  //     price: '149.00',
  //     quantity: 200,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 4,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/tv-H4l26crxtm9EQHLWc0ddrsXZ0V0Ofw.webp',
  //     name: '4K Bike Camera',
  //     description: 'Capture your rides in stunning 4K with the latest in bike camera technology.',
  //     status: 'active',
  //     type: 'mountain bike',
  //     rating: '4.6',
  //     price: '799.00',
  //     quantity: 50,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 5,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/laptop-9bgUhjY491hkxiMDeSgqb9R5I3lHNL.webp',
  //     name: 'Game Bike Pro',
  //     description: 'The ultimate gaming bike for the most demanding trails.',
  //     status: 'active',
  //     type: 'mountain bike',
  //     rating: '4.5',
  //     price: '1299.00',
  //     quantity: 75,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 6,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/headset-lYnRnpjDbZkB78lS7nnqEJFYFAUDg6.webp',
  //     name: 'VR Pro Bike',
  //     description: 'Experience the future of cycling with the latest in VR technology.',
  //     status: 'active',
  //     type: 'mountain bike',
  //     rating: '4.7',
  //     price: '349.00',
  //     quantity: 120,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 7,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/watch-S2VeARK6sEM9QFg4yNQNjHFaHc3sXv.webp',
  //     name: 'Bike Smartwatch',
  //     description: 'Stay connected and track your rides with the latest in smartwatch technology.',
  //     status: 'active',
  //     type: 'road bike',
  //     rating: '4.4',
  //     price: '249.00',
  //     quantity: 250,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 8,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/speaker-4Zk0Ctx5AvxnwNNTFWVK4Gtpru4YEf.webp',
  //     name: 'Bluetooth Bike Speaker',
  //     description: 'Rock out on your rides with the latest in Bluetooth speaker technology.',
  //     status: 'active',
  //     type: 'racing bike',
  //     rating: '4.3',
  //     price: '99.00',
  //     quantity: 400,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 9,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/charger-GzRr0NSkCj0ZYWkTMvxXGZQu47w9r5.webp',
  //     name: 'Portable Charger Bike Mount',
  //     description: 'Keep your devices charged on the go with the latest in portable charger technology.',
  //     status: 'active',
  //     type: 'road bike',
  //     rating: '4.1',
  //     price: '59.00',
  //     quantity: 500,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 10,
  //     imageUrl:
  //       'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/thermostat-8GnK2LDE3lZAjUVtiBk61RrSuqSTF7.webp',
  //     name: 'Smart Thermostat Bike Mount',
  //     description: 'Stay comfortable on your rides with the latest in smart thermostat technology.',
  //     status: 'active',
  //     type: 'racing bike',
  //     rating: '4.0',
  //     price: '199.00',
  //     quantity: 175,
  //     availableAt: new Date()
  //   }
  // ]);
}
