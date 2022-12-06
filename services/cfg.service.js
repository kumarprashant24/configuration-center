let CFG = require("../models/cfg.model");
const marketType = require("../models/market_types.model");
const menu = require("../models/menu.model");
module.exports.getAll = async () => {
  return await CFG.find();
};

module.exports.getMarkets = async () => {
  return await marketType.find();
};
module.exports.getMenu = async () => {
  return await menu.find();
};
module.exports.getByServiceName = async (serviceName) => {
  return await CFG.find({ serviceName });
};

module.exports.getByServiceNameAndConfigType = async (
  serviceName,
  configType
) => {
  return await CFG.find({ serviceName, configType });
};

module.exports.addServiceNameandConfig = async (
  serviceName,
  configType,
  configList
) => {
  let mkt = await marketType.findOne({ bet_option: configList.marketName });
  if (!mkt) {
    const mt = new marketType({
      bet_option: configList.marketName.trim(),
      sport_id: "-1",
      enabled: true,
    });
    await mt.save();
  }

  const newData = {
    serviceName: serviceName,
    configType: configType,
    config: configList,
  };
  const cfg = new CFG(newData);
  return await cfg.save();
};

module.exports.editOne = async (id, configData) => {
  let mkt = await marketType.findOne({ bet_option: configData.marketName });
  if (!mkt) {
    const mt = new marketType({
      bet_option: configData.marketName.trim(),
      sport_id: "-1",
      enabled: true,
    });
    await mt.save();
  }
  return await CFG.findByIdAndUpdate(id, { config: configData });
};

module.exports.delete = async (id) => {
  return await CFG.findByIdAndDelete(id);
};

module.exports.get_sgm_market_data = (data, configType) => {
  const configs = data.reduce((p, cfg) => {
    if (cfg.configType === configType) {
      return [
        ...p,
        { id: cfg._id.toString(), updatedAt: cfg.updatedAt, ...cfg.config },
      ];
    } else {
      return [...p];
    }
  }, []);
  return configs;
};
