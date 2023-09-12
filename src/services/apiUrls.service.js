class ApiUrlService {
  // Client API URLs
  getAllClients = "/locations/list";
  getClientById = "/locations/update/";
  addClient = "/locations/save";
  getAllFramework ="/framework/list"
  updateClient = "/locations/update/";
  deleteClient = "/locations/";
  


  // Assignment API URLs
  getAllAssignments = "/assignment/list";
  getAssignById="assignment/names";
  getAssignmentById = "/assignment/";
  getAllTypeofassignment ="/assignmentype/list"
  // getAllYear ="/year/list"
  getAllTypeofassignment ="/typeofAssign/list"
  getAllTerm ="/terms/list"
  getAllPeriod ="/year/list"
  addAssignment = "/assignment/save";
  getAllEngagementPartner = "/auth/names"
  updateAssignment = "/assignment/update/";
  deleteAssignment = "/assignment/";
  getAssignmentsByClientId = "/assignment/findByClientId/";

  // Milestone API URLs
  getAllMilestones = "/milestone/list";
  getMilestoneById = "/milestone/";
  addMilestone = "/milestone/save";
  updateMilestone = "/milestone/";
  deleteMilestone = "/milestone/delete/";
  getMilestonesByClientId = "/milestone/findByClientId/";

  // Plan API URLs
  getAllPlans = "/plan/list";
  getPlanById = "/plan/";
  addPlan = "/plan/save";
  updatePlan = "/plan/";
  deletePlan = "/plan/";


  // Users API URLs

getAllUser = "/auth/list";
getUserById = "/auth/";
addUser = "/auth/signup";
getUser = "/auth/names";


// Checklist Api URLs
getAllChecklist = "/CLQF/list";
// getClientById = "/CLQF/";


getChecklistById = "/CLQF/";

//Process Audit Tools api URLs
getAllProcess = "/processaudit/list";

//Classifier Api URLs

getAllClassifier ="/classifier/list";

//Audit Variable Api URLs

getAllAuditVariable = "/auditvariables/list";


//Decisition Api URLs

getAllDecisition ="/decision/list";

// Conditions Api URLs

getAllConditions="/conditions/list";

// TemplateRisks Api URLs

getAllTemplateRisks="/templateforrisks/list";


// TemplateControls Api URLs

getAllTemplateControls="/Templateforcontrols/list";

}




export default new ApiUrlService();
