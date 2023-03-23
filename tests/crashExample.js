const lib = require("../index")
lib.enable();
lib.enableDomain();

throw new Error("Some uncaught error in this node script")


