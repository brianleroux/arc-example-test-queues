module.exports = function (arc, cfn) {
  let resources = Object.keys(cfn.Resources)
  for (let resource of resources) {
    if (cfn.Resources[resource].Type === "AWS::SQS::Queue") {
      delete cfn.Resources[resource].Properties.FifoQueue
      delete cfn.Resources[resource].Properties.ContentBasedDeduplication
    }
  } 
  return cfn
}
