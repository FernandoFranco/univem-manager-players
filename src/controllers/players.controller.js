const path = require('path');

const FileWR = require('../utils/file-wr');
const Validator = require("../utils/validator")

const database = new FileWR(path.resolve(__dirname, '..', 'database', 'players.json'));
module.exports = class PlayersController {
  create(request, response) {
    const validator = new Validator();

    if (!request.body?.age) {
      validator.add('age', 'is required');
    }

    const age = Number(request.body?.age ?? 0);
    if (age > 40) {
      validator.add('age', 'cannot be greater than 40');
    }

    if (String(request.body?.foot) !== process.env.PLAYER_FOOT) {
      validator.add('foot', 'foot is not valid');
    }

    if (validator.haveAnError()) {
      return response.status(422).json(validator.errors);
    }

    database.readItems((error, players) => {
      if (error) {
        return response.status(400).json({ message: error.message ?? String(error) });
      }

      const player = {
        id: players.length + 1,
        name: request.body.name,
        age: request.body.age,
        foot: request.body.foot,
        displayName: `${request.body.name} (${request.body.age})`,
      };

      database.additem(player, (error) => {
        if (error) {
          return response.status(400).json({ message: error.message ?? String(error) });
        }

        response.status(201).json(player);
      });
    });
  }

  findMany(request, response) {
    database.readItems((error, players) => {
      if (error) {
        return response.status(400).json({ message: error.message ?? String(error) });
      }

      return response.status(200).json(
        Object.entries(request.query ?? {}).reduce((filtered, [key, value]) => {
          return filtered.filter((player) => String(player[key]) === value);
        }, players)
      );
    });
  }
}
