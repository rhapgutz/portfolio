import EntityController from './entityController.js';
/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
class UserStoryController extends EntityController {
   /**
    * @param {Model} model The default model object
    * for the controller. Will be required to create
    * an instance of the controller
    */
  constructor(model) {
    super(model, ['user']);
  }
}

export default UserStoryController;