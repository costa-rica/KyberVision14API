const Player = require("./Player");
const PlayerContract = require("./PlayerContract");
const Team = require("./Team");
const Match = require("./Match");
const Script = require("./Script");
const SyncContract = require("./SyncContract");
const Video = require("./Video");

// Define associations **after** models are imported

// 🔹 Player & Team Associations
Player.hasMany(PlayerContract, { foreignKey: "playerId", onDelete: "CASCADE" });
Team.hasMany(PlayerContract, { foreignKey: "teamId", onDelete: "CASCADE" });
PlayerContract.belongsTo(Player, { foreignKey: "playerId" });
PlayerContract.belongsTo(Team, { foreignKey: "teamId" });

// 🔹 Match & Team Associations
Match.belongsTo(Team, { foreignKey: "teamIdAnalyzed", as: "teamOne" }); // Team analyzed
Match.belongsTo(Team, { foreignKey: "teamIdOpponent", as: "teamTwo" }); // Team opponent

// 🔹 Script & SyncContract Associations (1-N)
Script.hasMany(SyncContract, { foreignKey: "scriptId", onDelete: "CASCADE" });
SyncContract.belongsTo(Script, { foreignKey: "scriptId" });

// 🔹 Video & SyncContract Associations (0-N)
Video.hasMany(SyncContract, { foreignKey: "videoId", onDelete: "CASCADE" });
SyncContract.belongsTo(Video, { foreignKey: "videoId" });

// 🔹 Video & Match Association (moved from Video.js)
Video.belongsTo(Match, { foreignKey: "matchId", as: "match" });

console.log("✅ Associations have been set up");

// const Player = require("./Player");
// const PlayerContract = require("./PlayerContract");
// const Team = require("./Team");
// const Match = require("./Match");

// // Define associations **after** models are imported
// Player.hasMany(PlayerContract, { foreignKey: "playerId", onDelete: "CASCADE" });
// Team.hasMany(PlayerContract, { foreignKey: "teamId", onDelete: "CASCADE" });
// PlayerContract.belongsTo(Player, { foreignKey: "playerId" });
// PlayerContract.belongsTo(Team, { foreignKey: "teamId" });

// // 🔹 Match & Team Associations
// Match.belongsTo(Team, { foreignKey: "teamIdAnalyzed", as: "teamOne" }); // Team analyzed
// Match.belongsTo(Team, { foreignKey: "teamIdOpponent", as: "teamTwo" }); // Team opponent

// console.log("✅ Associations have been set up");
