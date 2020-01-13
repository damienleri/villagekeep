const { sendInvitation } = require("./invitations");

(async () => {
  const phone = "+12678086023";
  const text =
    "Damien Leri added you as a contact on the free mobile app called Village Keep: http://villagekeep.com";
  const { error } = await sendInvitation({ phone, text });
  if (error) {
    console.log("aborted due to error", error);
    return;
  }
  console.log("done.");
})();
