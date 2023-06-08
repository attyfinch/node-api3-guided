const Hubs = require('./hubs-model.js');

async function checkHubId(req, res, next) {
    const { id } = req.params;

    try {
        const hub = await Hubs.findById(id)
        if (hub) {
            req.hub = hub;
            next();
        } else {
            next({ status: 404, message: `Hub ${id} not found`})
        }
    }
    catch (err) {
        next(err)
    }
};

function checkNewHub(req, res, next) {
    const { name } = req.body;
    if (
        name !== undefined &&
        typeof name === 'string' &&
        name.length > 2
    ) {
        next();
    } else {
        next({status: 422, message: "Hubs need a proper name!" });
    }
}

module.exports = { checkHubId, checkNewHub }