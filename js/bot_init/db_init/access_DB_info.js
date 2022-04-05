export default async function (localBase, model, ...fields) {
  const modelObjects = await model.findAll();

  modelObjects.map((obj) => {
    const arrayFields = fields.map((field) => obj[field]);
    const dbObject = fields.reduce(
      (res, field, index) => ((res[field] = arrayFields[index]), res),
      {}
    );

    localBase.push(dbObject);
  });
}
