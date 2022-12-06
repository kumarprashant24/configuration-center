const cfgService = require("../services/cfg.service.js");
const MenuModel = require("../models/menu.model");

const fs = require("fs");
var path = require("path");

module.exports.getJurisdictions = async (req, res) => {
  let fileName = "jurisdiction.json";
  fs.readFile(`${path.resolve()}/mock_data/${fileName}`, (err, json) => {
    let obj = JSON.parse(json);
    res.json(obj);
  });
};
module.exports.getMarkets = async (req, res, next) => {
  try {
    const data = await cfgService.getMarkets();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};
module.exports.getMenu = async (req, res, next) => {
  try {
    const data = await cfgService.getMenu();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

module.exports.getAll = async (req, res, next) => {
  try {
    const data = await cfgService.getAll();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

module.exports.getByServiceName = async (req, res, next) => {
  try {
    const { serviceName } = req.params;
    const isKeyExists = await MenuModel.findOne({ key: serviceName });

    if (!isKeyExists) {
      const err = JSON.stringify({
        status: 408,
        message: "Service Key Not Found",
      });
      throw err;
    }
    const data = await cfgService.getByServiceName(serviceName);
    const configTypes = Array.from(
      new Set(data.map((item) => item.configType))
    );

    const config = configTypes.reduce((previous, configType) => {
      previous[configType] = cfgService[
        `get_${configType.replaceAll("-", "_")}_data`
      ](data, configType);
      return previous;
    }, {});

    res.status(200).json({
      serviceName,
      config,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getByServiceNameAndConfigType = async (req, res, next) => {
  try {
    const { serviceName, configType } = req.params;
    const isKeyExists = await MenuModel.findOne({ key: serviceName });
    const isSubKeyExists = await MenuModel.findOne({
      submenu: { $elemMatch: { key: configType } },
    });

    if (!isKeyExists || !isSubKeyExists) {
      const err = JSON.stringify({
        status: 408,
        message: "Service Key Not Found",
      });
      throw err;
    }

    const data = await cfgService.getByServiceNameAndConfigType(
      serviceName,
      configType
    );
    const configData = cfgService[
      `get_${configType.replaceAll("-", "_")}_data`
    ](data, configType);
    res.status(200).json({
      serviceName,
      config: {
        [configType]: configData,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.addServiceNameandConfig = async (req, res, next) => {
  try {
    const { serviceName, configType } = req.params;
    const isKeyExists = await MenuModel.findOne({ key: serviceName });
    const isSubKeyExists = await MenuModel.findOne({
      submenu: { $elemMatch: { key: configType } },
    });
    // console.log('ddkdflsfld',isSubKeyExists);

    if (!isKeyExists || !isSubKeyExists) {
      const err = JSON.stringify({
        status: 408,
        message: "Service Key Not Found",
      });
      throw err;
    }

    const configList = req.body;
    const result = await cfgService.addServiceNameandConfig(
      serviceName,
      configType,
      configList
    );
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

module.exports.editOne = async (req, res, next) => {
  try {
    let cfg = await cfgService.editOne(req.params.id, req.body);
    res.send(cfg);
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    let result = await cfgService.delete(req.params.id);
    if (!result)
      throw {
        status: 400,
        message: "invalid id check if id exists with the record",
      };
    res.send(result);
  } catch (error) {
    next(error);
  }
};
