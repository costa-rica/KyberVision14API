const User = require("../models/User");
const GroupContract = require("../models/GroupContract");
const bcrypt = require("bcrypt");

async function onStartUpCreateEnvUsers() {
  if (!process.env.ADMIN_EMAIL_KV_MANAGER_WEBSITE) {
    console.warn("⚠️ No admin emails found in env variables.");
    return;
  }

  let adminEmails;
  try {
    adminEmails = JSON.parse(process.env.ADMIN_EMAIL_KV_MANAGER_WEBSITE);
    if (!Array.isArray(adminEmails)) throw new Error();
  } catch (error) {
    console.error(
      "❌ Error parsing ADMIN_EMAIL_KV_MANAGER_WEBSITE. Ensure it's a valid JSON array."
    );
    return;
  }

  for (const email of adminEmails) {
    try {
      const existingUser = await User.findOne({ where: { email } });

      if (!existingUser) {
        console.log(`🔹 Creating admin user: ${email}`);

        const hashedPassword = await bcrypt.hash("test", 10); // Default password, should be changed later.

        const newUser = await User.create({
          username: email.split("@")[0],
          email,
          password: hashedPassword,
          isAdminForKvManagerWebsite: true, // Set admin flag
        });

        await GroupContract.create({
          userId: newUser.id,
          teamId: 1, // Assign to a default team if needed
        });

        console.log(`✅ Admin user created: ${email}`);
      } else {
        console.log(`🔸 User already exists: ${email}`);
      }
    } catch (err) {
      console.error(`❌ Error creating admin user (${email}):`, err);
    }
  }
}

module.exports = { onStartUpCreateEnvUsers };
