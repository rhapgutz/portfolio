import { StatusCodes } from "http-status-codes";

class EntityController {
  /**
    * @param {Model} model The default model object
    * for the controller. Will be required to create
    * an instance of the controller
    * @param {Array} populateEntities
    */
  constructor(model, populateEntities = []) {
    this._model = model;
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    if (populateEntities.length) {
      this.populateEntities = populateEntities;
    }
  }

  /**
    * @param {Object} req The request object
    * @param {Object} res The response object
    * @return {Object} res The response object
    */
  create = async (req, res) => {
    const entity = await this._model.create(req.body).populate(this.populateEntities).exec();
    res.status(StatusCodes.CREATED).json(entity);
  }

  /**
    * @param {Object} req The request object
    * @param {Object} res The response object
    * @return {Object} res The response object
    */
  update = async (req, res) => {
    const entity = await this._model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate(this.populateEntities).exec();
    res.status(StatusCodes.OK).json(entity);
  };
  
  /**
    * @param {Object} req The request object
    * @param {Object} res The response object
    * @return {Object} res The response object
    */
  delete = async (req, res) => {
    await this._model.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json(true);
  };

  /**
    * @param {Object} req The request object
    * @param {Object} res The response object
    * @return {Object} res The response object
    */
  getAll = async (req, res) => {
    const entities = await this._model.find({}).populate(this.populateEntities).exec();
    res.status(StatusCodes.OK).json(entities);
  };

  /**
    * @param {Object} req The request object
    * @param {Object} res The response object
    * @return {Object} res The response object
    */
  getOne = async (req, res) => {
    const entity = await this._model.findById(req.params.id);
    res.status(StatusCodes.OK).json(entity);
  };
}

export default EntityController;