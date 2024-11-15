import { StatusCodes } from 'http-status-codes';
import EntityController from './entityController.js';
/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
class UserMessageController extends EntityController {
   /**
    * @param {Model} model The default model object
    * for the controller. Will be required to create
    * an instance of the controller
    */
  constructor(model) {
    super(model, ['user']);
  }

  create = async (req, res) => {
    const newReqBody = { ...req.body, user: req.user.userId };
    const newEntity = await this._model.create(newReqBody);
    const userMessage = await this._model.findById(newEntity._id).populate(this.populateEntities).exec();
    res.status(StatusCodes.CREATED).json(userMessage);
  }
}

export default UserMessageController;