const router = require("express").Router();
const db = require("../dbConfig.js");

// Gets an array of all accounts
router.get("/", (req, res) => {
  db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Could not get all accounts from the DB" })
    );
});

// Get single account by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where("id", id)
    .then(account => {
      if (account) {
        res.json(account);
      } else {
        res.status(404).json({
          message: "Could not find a accounts with that ID in the db"
        });
      }
    })
    .catch(err =>
      res.status(500).json({ message: "Could not get accounts from the DB" })
    );
});

router.post("/", (req, res) => {
  const account = req.body;
  db("accounts")
    .insert(account)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not add account to the db" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db("accounts")
    .get(id)
    .then(account => {
      const delAccount = account;
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error finding that account by ID" });
    });

  db("accounts")
    .where("id", id)
    .del()
    .then(account => {
      if (account) {
        res.status(200).json(delAccount);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Could not delete a account with that ID" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db("accounts")
    .where("id", id)
    .update(changes)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not update the user" });
    });
});

// Export router
module.exports = router;
