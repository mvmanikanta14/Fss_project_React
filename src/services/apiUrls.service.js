class ApiUrlService {
  // TypeofLocation  API URLs
  getAllTypeofLocation = "/anyfin/v1/location";
  getTypeofLocationById = "/locations/update/";
  addTypeofLocation = "/anyfin/v1/location";
  getAllPincode ="/anyfin/v1/pin"
  getPincodeById ="/anyfin/v1/pin/" 
  getAllTypeofArea = "/anyfin/v1/locationtype/"
  updateTypeofLocation = "/anyfin/v1/location/";
 
//Location list
  getLocationlist = "/anyfin/v1/locationtype"
  addLocationList = "/anyfin/v1/locationtype/"
  // getLocationbyId = "/anyfin/v1/locationtype/"
  updateLocationlist =  "/anyfin/v1/locationtype/"

  //Produts Api list

  getAllProducts = "/anyfin/v1/product"
  addProducts = "/anyfin/v1/product/"

  //UoM List

  getAllUomList = "/anyfin/v1/unitsofmeasurements"

  addUoMList = "/anyfin/v1/unitsofmeasurements"
  patchUoMList ="/anyfin/v1/unitsofmeasurements/"
 

  //UoM Types

  getAllUoMType = "/anyfin/v1/uomtype/"


  // hsc url

  getAllhsnSac ="/anyfin/v1/hns"

  //BoM Details

  getAllBomDetails="/anyfin/v1/bom"

  getUomfieldData="/anyfin/v1/uomtype"// Uom table (getting Uom Field data from Uom table to (Bom Table-->Add-->Product Field))

  getProductfieldData="/anyfin/v1/product"// Product table (getting product Field data from product table to (Bom Table-->Add-->Product Field))

  addBoMDetails="/anyfin/v1/bom"

 

  //Costing Methods

  getAllCostingTypes="/anyfin/v1/costingmethods"

  addCostingMethods="/anyfin/v1/costingmethods"

  getCostingMethodsById="/anyfin/v1/costingmethods/"

  updateCostingmethods="/anyfin/v1/costingmethods/"

  deleteCostingMethods="/anyfin/v1/costingmethods/"

 

  //Type Of Products

  getAllProductTypes="/anyfin/v1/producttype"

  addTypeOfProducts="/anyfin/v1/producttype"

  updateTypeofproducts="/anyfin/v1/producttype/"

 
 

}




export default new ApiUrlService();
