import User from "./user";
import PhoneNumber from "./data";

// Set up associations
User.hasMany(PhoneNumber, {
  foreignKey: "userID",
  as: "phoneNumbers",
});

PhoneNumber.belongsTo(User, {
  foreignKey: "userID",
  as: "user",
});

(async () => {
  await PhoneNumber.sync({ alter: true, force: true });
  await User.sync({ alter: true, force: true });
  console.log("Models synchronized successfully.");
})();

export { User, PhoneNumber };
