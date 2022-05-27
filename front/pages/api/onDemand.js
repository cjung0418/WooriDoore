// export default async function handler(req, res) {
//   console.log('Product detail page Revalidating...');
//   let revalidated = false;
//   try {
//     await res.unstable_revalidate(`/products/${id}`);
//     revalidated = true;
//   } catch (error) {
//     console.error(error);
//   }
//   res.json({
//     revalidated,
//   });
// }